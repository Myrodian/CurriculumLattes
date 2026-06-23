package Project.back_end.services;

import Project.back_end.dto.TrabalhoTecnicoDTO;
import Project.back_end.entities.TrabalhoTecnico;
import Project.back_end.entities.User;
import Project.back_end.repositories.TrabalhoTecnicoRepository;
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
public class TrabalhoTecnicoService {

    @Autowired
    private TrabalhoTecnicoRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<TrabalhoTecnicoDTO> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(TrabalhoTecnicoDTO::new);
    }

    @Transactional(readOnly = true)
    public TrabalhoTecnicoDTO findById(Long id) {
        TrabalhoTecnico entity = repository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFound("Trabalho técnico não encontrado"));
        return new TrabalhoTecnicoDTO(entity);
    }

    @Transactional(readOnly = true)
    public List<TrabalhoTecnicoDTO> findMine() {
        User author = getAuthenticatedUser();
        return repository.findByAuthorOrderByCreatedAtDesc(author)
                .stream().map(TrabalhoTecnicoDTO::new).toList();
    }

    @Transactional
    public TrabalhoTecnicoDTO insert(TrabalhoTecnicoDTO dto) {
        TrabalhoTecnico entity = new TrabalhoTecnico();
        copyDtoToEntity(dto, entity);
        entity.setAuthor(getAuthenticatedUser());
        entity = repository.save(entity);
        return new TrabalhoTecnicoDTO(entity);
    }

    @Transactional
    public TrabalhoTecnicoDTO update(Long id, TrabalhoTecnicoDTO dto) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFound("Registro não encontrado");
        }
        TrabalhoTecnico entity = repository.getReferenceById(id);
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new TrabalhoTecnicoDTO(entity);
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

    private void copyDtoToEntity(TrabalhoTecnicoDTO dto, TrabalhoTecnico entity) {
        entity.setTitulo(dto.getTitulo());
        entity.setAno(dto.getAno());
        entity.setAutores(dto.getAutores());
        entity.setDescricao(dto.getDescricao());
        entity.setTipoTrabalho(dto.getTipoTrabalho());
        entity.setInstituicaoContratante(dto.getInstituicaoContratante());
        entity.setNumeroContrato(dto.getNumeroContrato());
        entity.setNatureza(dto.getNatureza());
    }

    private User getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email);
    }
}
