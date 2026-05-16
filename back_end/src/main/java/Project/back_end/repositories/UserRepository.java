package Project.back_end.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Project.back_end.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}