package Project.back_end.services;

import Project.back_end.dto.PerfilDTO;
import Project.back_end.dto.UserDTO;
import Project.back_end.dto.UserInsertDTO;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
        user.getPerfils().clear();
        for(PerfilDTO perfilDTO : dto.getPerfils()){
            Perfil perfil = perfilRepository.getReferenceById(perfilDTO.getId());
            user.getPerfils().add(perfil);
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        List<UserDetailsProjection> dbData =
                userRepository.loadUserByUsername(username);

        if(dbData.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }
        User user = new User();
        user.setPassword(dbData.getFirst().getPassword());
        user.setEmail(dbData.getFirst().getUsername());

        for(UserDetailsProjection data : dbData){
            user.addRole(
                    new Perfil(data.getRoleId(), data.getAuthority())
            );
        }
        return user;
    }
}
