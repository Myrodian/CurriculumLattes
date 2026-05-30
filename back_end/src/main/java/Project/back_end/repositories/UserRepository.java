package Project.back_end.repositories;

import Project.back_end.entities.User;
import Project.back_end.projections.UserDetailsProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);

    @Query(
            nativeQuery = true,
            value = """
                    
                    SELECT u.email as username,
                           u.password as password,
                           u.name as name,
                           p.id as roleId,
                           p.name as authority
                            FROM tb_user u
                           INNER JOIN tb_user_perfil up ON up.id_user = u.id
                           INNER JOIN tb_perfil p On p.id = up.id_perfil
                           WHERE u.email = :username
                    """
    )
    List<UserDetailsProjection> loadUserByUsername(String username);
}