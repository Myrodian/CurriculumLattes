package Project.back_end.services;

import Project.back_end.dto.PerfilDTO;
import Project.back_end.dto.UserDTO;
import Project.back_end.dto.UserInsertDTO;
import Project.back_end.dto.UserSummaryDTO;
import Project.back_end.entities.Perfil;
import Project.back_end.entities.User;
import Project.back_end.repositories.PerfilRepository;
import Project.back_end.repositories.UserRepository;
import Project.back_end.projections.UserDetailsProjection;
import Project.back_end.resources.exception.databaseException;
import Project.back_end.services.exception.ResourceNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PerfilRepository perfilRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Transactional(readOnly = true)
    public Page<UserDTO> findAll(Pageable pageable) {

        Page<User> users = userRepository.findAll(pageable);

        return users.map(UserDTO::new);

    }

    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {

        User p = userRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFound("Produto não encotrado "));

        return new UserDTO(p);
    }

    @Transactional
    public UserDTO insert(UserInsertDTO dto) {

        User user = new User();
        copyDtoToUser(dto, user);
        user.setPassword(encoder.encode(dto.getPassword()));

        userRepository.save(user);

        return new UserDTO(user);
    }

    private void copyDtoToUser(UserDTO dto, User user) {
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setCpf(dto.getCpf());

        user.getPerfils().clear();
        if (dto.getPerfils() != null) {
            for (PerfilDTO perfilDTO : dto.getPerfils()) {
                Perfil perfil = perfilRepository.getReferenceById(perfilDTO.getId());
                user.getPerfils().add(perfil);
            }
        }
    }

    @Transactional
    public void delete(Long id) {

        if(!userRepository.existsById(id)) {
            throw new ResourceNotFound("Registro não encontrado" );
        }
        try {
            userRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new databaseException(e.getMessage());
        }
    }

    @Transactional
    public UserDTO update(Long id, UserDTO dto) {

        if(!userRepository.existsById(id)) {
            throw new ResourceNotFound("Registro não encontrado" );
        }

        User user = userRepository.getReferenceById(id);

        copyDtoToUser(dto, user);

        userRepository.save(user);
        return new UserDTO(user);
    }

    // ===== Seguir / busca de currículos =====

    @Transactional
    public void follow(Long targetId) {
        User me = getAuthenticatedUser();
        if (me.getId().equals(targetId)) {
            return; // não é possível seguir a si mesmo
        }
        User target = userRepository.findById(targetId)
                .orElseThrow(() -> new ResourceNotFound("Usuário não encontrado"));
        me.getFollowing().add(target);
        userRepository.save(me);
    }

    @Transactional
    public void unfollow(Long targetId) {
        User me = getAuthenticatedUser();
        User target = userRepository.findById(targetId)
                .orElseThrow(() -> new ResourceNotFound("Usuário não encontrado"));
        me.getFollowing().remove(target);
        userRepository.save(me);
    }

    @Transactional(readOnly = true)
    public List<UserSummaryDTO> getFollowing() {
        User me = getAuthenticatedUser();
        return me.getFollowing().stream()
                .map(u -> new UserSummaryDTO(u, true))
                .sorted(Comparator.comparing(UserSummaryDTO::getName,
                        Comparator.nullsLast(String::compareToIgnoreCase)))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<UserSummaryDTO> search(String q) {
        String term = (q == null) ? "" : q.trim();
        Set<Long> followingIds = followingIdsOfCurrentUser();
        return userRepository.findByNameContainingIgnoreCase(term).stream()
                .map(u -> new UserSummaryDTO(u, followingIds.contains(u.getId())))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<UserSummaryDTO> suggestions() {
        User me = getAuthenticatedUser();
        Set<Long> exclude = new HashSet<>();
        exclude.add(me.getId());
        me.getFollowing().forEach(u -> exclude.add(u.getId()));
        return userRepository.findAll().stream()
                .filter(u -> !exclude.contains(u.getId()))
                .limit(5)
                .map(u -> new UserSummaryDTO(u, false))
                .toList();
    }

    private Set<Long> followingIdsOfCurrentUser() {
        User me = getAuthenticatedUserOrNull();
        Set<Long> ids = new HashSet<>();
        if (me != null && me.getFollowing() != null) {
            me.getFollowing().forEach(u -> ids.add(u.getId()));
        }
        return ids;
    }

    private User getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email);
    }

    private User getAuthenticatedUserOrNull() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return null;
        }
        Object principal = auth.getPrincipal();
        if (principal == null || "anonymousUser".equals(principal)) {
            return null;
        }
        return userRepository.findByEmail(auth.getName());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        System.out.println(">>> Buscando usuário: " + username); // ← adicione

        List<UserDetailsProjection> dbData = userRepository.loadUserByUsername(username);

        System.out.println(">>> Resultado da query: " + dbData.size() + " linha(s)"); // ← adicione

        if(dbData.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }
        User user = new User();
        user.setPassword(dbData.getFirst().getPassword());
        user.setEmail(dbData.getFirst().getUsername());
        user.setName(dbData.getFirst().getName());

        for(UserDetailsProjection data : dbData){
            user.addRole(
                    new Perfil(data.getRoleId(), data.getAuthority())
            );
        }
        return user;
    }
}
