package Project.back_end.services;

import Project.back_end.dto.ApresentacaoDTO;
import Project.back_end.entities.Apresentacao;
import Project.back_end.entities.User;
import Project.back_end.repositories.ApresentacaoRepository;
import Project.back_end.repositories.UserRepository;
import Project.back_end.resources.exception.databaseException;
import Project.back_end.services.exception.ResourceNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApresentacaoService {

    @Autowired
    private ApresentacaoRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<ApresentacaoDTO> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(ApresentacaoDTO::new);
    }

    @Transactional(readOnly = true)
    public ApresentacaoDTO findById(Long id) {
        Apresentacao entity = repository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFound("Apresentação não encontrada"));
        return new ApresentacaoDTO(entity);
    }

    @Transactional(readOnly = true)
    public List<ApresentacaoDTO> findMine() {
        User author = getAuthenticatedUser();
        return repository.findByAuthorOrderByCreatedAtDesc(author)
                .stream().map(ApresentacaoDTO::new).toList();
    }

    @Transactional
    public ApresentacaoDTO insert(ApresentacaoDTO dto) {
        Apresentacao entity = new Apresentacao();
        copyDtoToEntity(dto, entity);
        entity.setAuthor(getAuthenticatedUser());
        entity = repository.save(entity);
        return new ApresentacaoDTO(entity);
    }

    @Transactional
    public ApresentacaoDTO update(Long id, ApresentacaoDTO dto) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFound("Registro não encontrado");
        }
        Apresentacao entity = repository.getReferenceById(id);
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new ApresentacaoDTO(entity);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFound("Registro não encontrado");
        }
        try {
            repository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new databaseException(e.getMessage());
        }
    }

    private void copyDtoToEntity(ApresentacaoDTO dto, Apresentacao entity) {
        entity.setTitulo(dto.getTitulo());
        entity.setAno(dto.getAno());
        entity.setAutores(dto.getAutores());
        entity.setDescricao(dto.getDescricao());
        entity.setTipoEvento(dto.getTipoEvento());
        entity.setNomeEvento(dto.getNomeEvento());
        entity.setLocalEvento(dto.getLocalEvento());
        entity.setNatureza(dto.getNatureza());
    }

    private User getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email);
    }
}
