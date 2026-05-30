package Project.back_end.resources;

import Project.back_end.dto.AuthDTO;
import Project.back_end.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthResource {

    @PostMapping("/login")
    public ResponseEntity<AuthDTO.LoginResponse> login(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(new AuthDTO.LoginResponse(user.getEmail(), user.getName()));
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("ok");
    }
}
