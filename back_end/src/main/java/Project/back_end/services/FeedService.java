package Project.back_end.services;

import Project.back_end.dto.ActivityDTO;
import Project.back_end.entities.User;
import Project.back_end.repositories.ApresentacaoRepository;
import Project.back_end.repositories.ProdutoRepository;
import Project.back_end.repositories.ProjetoEnsinoRepository;
import Project.back_end.repositories.TrabalhoTecnicoRepository;
import Project.back_end.repositories.UserRepository;
import Project.back_end.services.exception.ResourceNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

@Service
public class FeedService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ApresentacaoRepository apresentacaoRepository;
    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private ProjetoEnsinoRepository projetoEnsinoRepository;
    @Autowired
    private TrabalhoTecnicoRepository trabalhoTecnicoRepository;

    // Feed do usuário logado: produções das pessoas que ele segue, mais recentes primeiro.
    @Transactional(readOnly = true)
    public List<ActivityDTO> getMyFeed() {
        User me = getAuthenticatedUser();
        Set<User> authors = me.getFollowing();
        if (authors == null || authors.isEmpty()) {
            return List.of();
        }
        return aggregate(authors);
    }

    // Produções de um único usuário (usado no perfil; público).
    @Transactional(readOnly = true)
    public List<ActivityDTO> getUserActivities(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFound("Usuário não encontrado"));
        return aggregate(List.of(user));
    }

    private List<ActivityDTO> aggregate(Collection<User> authors) {
        List<ActivityDTO> all = new ArrayList<>();
        apresentacaoRepository.findByAuthorInOrderByCreatedAtDesc(authors).forEach(a ->
                all.add(new ActivityDTO("APRESENTACAO", a.getId(), a.getTitulo(), a.getAno(),
                        authorId(a.getAuthor()), authorName(a.getAuthor()), a.getCreatedAt())));
        produtoRepository.findByAuthorInOrderByCreatedAtDesc(authors).forEach(p ->
                all.add(new ActivityDTO("PRODUTO", p.getId(), p.getTitulo(), p.getAno(),
                        authorId(p.getAuthor()), authorName(p.getAuthor()), p.getCreatedAt())));
        projetoEnsinoRepository.findByAuthorInOrderByCreatedAtDesc(authors).forEach(pe ->
                all.add(new ActivityDTO("PROJETO_ENSINO", pe.getId(), pe.getTitulo(), pe.getAno(),
                        authorId(pe.getAuthor()), authorName(pe.getAuthor()), pe.getCreatedAt())));
        trabalhoTecnicoRepository.findByAuthorInOrderByCreatedAtDesc(authors).forEach(t ->
                all.add(new ActivityDTO("TRABALHO_TECNICO", t.getId(), t.getTitulo(), t.getAno(),
                        authorId(t.getAuthor()), authorName(t.getAuthor()), t.getCreatedAt())));
        all.sort(Comparator.comparing(ActivityDTO::getCreatedAt,
                Comparator.nullsLast(Comparator.reverseOrder())));
        return all;
    }

    private Long authorId(User u) {
        return u != null ? u.getId() : null;
    }

    private String authorName(User u) {
        return u != null ? u.getName() : null;
    }

    private User getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email);
    }
}
