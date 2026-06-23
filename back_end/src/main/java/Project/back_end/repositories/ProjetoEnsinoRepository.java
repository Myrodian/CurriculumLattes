package Project.back_end.repositories;

import Project.back_end.entities.ProjetoEnsino;
import Project.back_end.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ProjetoEnsinoRepository extends JpaRepository<ProjetoEnsino, Long> {
    List<ProjetoEnsino> findByAuthorOrderByCreatedAtDesc(User author);

    List<ProjetoEnsino> findByAuthorInOrderByCreatedAtDesc(Collection<User> authors);
}
