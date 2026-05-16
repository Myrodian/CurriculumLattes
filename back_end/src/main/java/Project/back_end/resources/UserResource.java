package Project.back_end.resources;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Project.back_end.entities.User;
import Project.back_end.services.UserService;

@RestController
@RequestMapping("/users")
public class UserResource {

    private final UserService service;

    public UserResource(UserService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestParam String email,
                                       @RequestParam String password) {

        User user = service.createUser(email, password);
        return ResponseEntity.ok(user);
    }
}