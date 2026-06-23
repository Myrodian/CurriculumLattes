package Project.back_end.repositories;

import Project.back_end.entities.Apresentacao;
import Project.back_end.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ApresentacaoRepository extends JpaRepository<Apresentacao, Long> {
    List<Apresentacao> findByAuthorOrderByCreatedAtDesc(User author);

    List<Apresentacao> findByAuthorInOrderByCreatedAtDesc(Collection<User> authors);
}
