package Project.back_end.resources;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Project.back_end.config.JwtUtil;
import Project.back_end.dto.LoginRequestDTO;
import Project.back_end.dto.LoginResponseDTO;
import Project.back_end.entities.User;
import Project.back_end.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthResource {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthResource(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO dto) {

        User user = authService.authenticate(dto);

        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
}