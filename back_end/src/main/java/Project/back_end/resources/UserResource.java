package Project.back_end.resources;

import Project.back_end.dto.UserDTO;
import Project.back_end.dto.UserInsertDTO;
import Project.back_end.dto.UserSummaryDTO;
import Project.back_end.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserResource {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Page<UserDTO>> findAll(Pageable pageable) {
        Page<UserDTO> users =  userService.findAll(pageable);

        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id) {

        UserDTO dto = userService.findById(id);

        return ResponseEntity.ok().body(dto);
    }

    @PostMapping
    public ResponseEntity<UserDTO> insert(@RequestBody @Valid UserInsertDTO dto) {
        UserDTO returnDTO =  userService.insert(dto);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(returnDTO.getId())
                .toUri();

        return ResponseEntity.created(location).body(returnDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody @Valid UserDTO dto) {
        UserDTO returnDTO =  userService.update(id, dto);
        return ResponseEntity.ok().body(returnDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserSummaryDTO>> search(@RequestParam(name = "q", required = false) String q) {
        return ResponseEntity.ok().body(userService.search(q));
    }

    @GetMapping("/suggestions")
    public ResponseEntity<List<UserSummaryDTO>> suggestions() {
        return ResponseEntity.ok().body(userService.suggestions());
    }

    @GetMapping("/me/following")
    public ResponseEntity<List<UserSummaryDTO>> following() {
        return ResponseEntity.ok().body(userService.getFollowing());
    }

    @PostMapping("/{id}/follow")
    public ResponseEntity<Void> follow(@PathVariable Long id) {
        userService.follow(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/follow")
    public ResponseEntity<Void> unfollow(@PathVariable Long id) {
        userService.unfollow(id);
        return ResponseEntity.noContent().build();
    }
}