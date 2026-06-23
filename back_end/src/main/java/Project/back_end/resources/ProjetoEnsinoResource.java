package Project.back_end.resources;

import Project.back_end.dto.ProjetoEnsinoDTO;
import Project.back_end.services.ProjetoEnsinoService;
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
@RequestMapping("/projetos-ensino")
public class ProjetoEnsinoResource {

    @Autowired
    private ProjetoEnsinoService service;

    @GetMapping
    public ResponseEntity<Page<ProjetoEnsinoDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok().body(service.findAll(pageable));
    }

    @GetMapping("/me")
    public ResponseEntity<List<ProjetoEnsinoDTO>> findMine() {
        return ResponseEntity.ok().body(service.findMine());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjetoEnsinoDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProjetoEnsinoDTO> insert(@RequestBody @Valid ProjetoEnsinoDTO dto) {
        ProjetoEnsinoDTO returnDTO = service.insert(dto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(returnDTO.getId())
                .toUri();
        return ResponseEntity.created(location).body(returnDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjetoEnsinoDTO> update(@PathVariable Long id, @RequestBody @Valid ProjetoEnsinoDTO dto) {
        return ResponseEntity.ok().body(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
