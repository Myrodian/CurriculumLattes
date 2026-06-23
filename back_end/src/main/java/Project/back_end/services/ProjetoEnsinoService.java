package Project.back_end.services;

import Project.back_end.dto.ProjetoEnsinoDTO;
import Project.back_end.entities.ProjetoEnsino;
import Project.back_end.entities.User;
import Project.back_end.repositories.ProjetoEnsinoRepository;
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
public class ProjetoEnsinoService {

    @Autowired
    private ProjetoEnsinoRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<ProjetoEnsinoDTO> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(ProjetoEnsinoDTO::new);
    }

    @Transactional(readOnly = true)
    public ProjetoEnsinoDTO findById(Long id) {
        ProjetoEnsino entity = repository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFound("Projeto de ensino não encontrado"));
        return new ProjetoEnsinoDTO(entity);
    }

    @Transactional(readOnly = true)
    public List<ProjetoEnsinoDTO> findMine() {
        User author = getAuthenticatedUser();
        return repository.findByAuthorOrderByCreatedAtDesc(author)
                .stream().map(ProjetoEnsinoDTO::new).toList();
    }

    @Transactional
    public ProjetoEnsinoDTO insert(ProjetoEnsinoDTO dto) {
        ProjetoEnsino entity = new ProjetoEnsino();
        copyDtoToEntity(dto, entity);
        entity.setAuthor(getAuthenticatedUser());
        entity = repository.save(entity);
        return new ProjetoEnsinoDTO(entity);
    }

    @Transactional
    public ProjetoEnsinoDTO update(Long id, ProjetoEnsinoDTO dto) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFound("Registro não encontrado");
        }
        ProjetoEnsino entity = repository.getReferenceById(id);
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new ProjetoEnsinoDTO(entity);
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

    private void copyDtoToEntity(ProjetoEnsinoDTO dto, ProjetoEnsino entity) {
        entity.setTitulo(dto.getTitulo());
        entity.setAno(dto.getAno());
        entity.setAutores(dto.getAutores());
        entity.setDescricao(dto.getDescricao());
        entity.setSituacaoProjeto(dto.getSituacaoProjeto());
        entity.setInstituicaoFinanciadora(dto.getInstituicaoFinanciadora());
        entity.setNumeroBolsistas(dto.getNumeroBolsistas());
        entity.setVinculoInstitucional(dto.getVinculoInstitucional());
    }

    private User getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email);
    }
}
