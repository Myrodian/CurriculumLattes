package Project.back_end.resources;

import Project.back_end.dto.ApresentacaoDTO;
import Project.back_end.services.ApresentacaoService;
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
@RequestMapping("/apresentacoes")
public class ApresentacaoResource {

    @Autowired
    private ApresentacaoService service;

    @GetMapping
    public ResponseEntity<Page<ApresentacaoDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok().body(service.findAll(pageable));
    }

    @GetMapping("/me")
    public ResponseEntity<List<ApresentacaoDTO>> findMine() {
        return ResponseEntity.ok().body(service.findMine());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApresentacaoDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<ApresentacaoDTO> insert(@RequestBody @Valid ApresentacaoDTO dto) {
        ApresentacaoDTO returnDTO = service.insert(dto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(returnDTO.getId())
                .toUri();
        return ResponseEntity.created(location).body(returnDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApresentacaoDTO> update(@PathVariable Long id, @RequestBody @Valid ApresentacaoDTO dto) {
        return ResponseEntity.ok().body(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
