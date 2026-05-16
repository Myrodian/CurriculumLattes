package Project.back_end.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Project.back_end.dto.LoginRequestDTO;
import Project.back_end.entities.User;
import Project.back_end.repositories.UserRepository;

@Service
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public User authenticate(LoginRequestDTO dto) {
        User user = repository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean passwordMatch = passwordEncoder.matches(dto.getPassword(), user.getPassword());

        if (!passwordMatch) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}