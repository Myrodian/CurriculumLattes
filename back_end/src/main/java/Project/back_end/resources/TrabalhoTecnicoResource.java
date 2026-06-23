package Project.back_end.resources;

import Project.back_end.dto.TrabalhoTecnicoDTO;
import Project.back_end.services.TrabalhoTecnicoService;
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
@RequestMapping("/trabalhos-tecnicos")
public class TrabalhoTecnicoResource {

    @Autowired
    private TrabalhoTecnicoService service;

    @GetMapping
    public ResponseEntity<Page<TrabalhoTecnicoDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok().body(service.findAll(pageable));
    }

    @GetMapping("/me")
    public ResponseEntity<List<TrabalhoTecnicoDTO>> findMine() {
        return ResponseEntity.ok().body(service.findMine());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrabalhoTecnicoDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<TrabalhoTecnicoDTO> insert(@RequestBody @Valid TrabalhoTecnicoDTO dto) {
        TrabalhoTecnicoDTO returnDTO = service.insert(dto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(returnDTO.getId())
                .toUri();
        return ResponseEntity.created(location).body(returnDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrabalhoTecnicoDTO> update(@PathVariable Long id, @RequestBody @Valid TrabalhoTecnicoDTO dto) {
        return ResponseEntity.ok().body(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
