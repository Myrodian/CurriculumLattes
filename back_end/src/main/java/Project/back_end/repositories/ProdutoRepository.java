package Project.back_end.repositories;

import Project.back_end.entities.Produto;
import Project.back_end.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByAuthorOrderByCreatedAtDesc(User author);

    List<Produto> findByAuthorInOrderByCreatedAtDesc(Collection<User> authors);
}
