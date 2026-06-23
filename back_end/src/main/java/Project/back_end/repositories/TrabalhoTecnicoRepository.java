package Project.back_end.repositories;

import Project.back_end.entities.TrabalhoTecnico;
import Project.back_end.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface TrabalhoTecnicoRepository extends JpaRepository<TrabalhoTecnico, Long> {
    List<TrabalhoTecnico> findByAuthorOrderByCreatedAtDesc(User author);

    List<TrabalhoTecnico> findByAuthorInOrderByCreatedAtDesc(Collection<User> authors);
}
