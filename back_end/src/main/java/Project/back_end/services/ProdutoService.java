package Project.back_end.services;

import Project.back_end.dto.ProdutoDTO;
import Project.back_end.entities.Produto;
import Project.back_end.entities.User;
import Project.back_end.repositories.ProdutoRepository;
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
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<ProdutoDTO> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(ProdutoDTO::new);
    }

    @Transactional(readOnly = true)
    public ProdutoDTO findById(Long id) {
        Produto entity = repository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFound("Produto não encontrado"));
        return new ProdutoDTO(entity);
    }

    @Transactional(readOnly = true)
    public List<ProdutoDTO> findMine() {
        User author = getAuthenticatedUser();
        return repository.findByAuthorOrderByCreatedAtDesc(author)
                .stream().map(ProdutoDTO::new).toList();
    }

    @Transactional
    public ProdutoDTO insert(ProdutoDTO dto) {
        Produto entity = new Produto();
        copyDtoToEntity(dto, entity);
        entity.setAuthor(getAuthenticatedUser());
        entity = repository.save(entity);
        return new ProdutoDTO(entity);
    }

    @Transactional
    public ProdutoDTO update(Long id, ProdutoDTO dto) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFound("Registro não encontrado");
        }
        Produto entity = repository.getReferenceById(id);
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new ProdutoDTO(entity);
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

    private void copyDtoToEntity(ProdutoDTO dto, Produto entity) {
        entity.setTitulo(dto.getTitulo());
        entity.setAno(dto.getAno());
        entity.setAutores(dto.getAutores());
        entity.setDescricao(dto.getDescricao());
        entity.setTipoProduto(dto.getTipoProduto());
        entity.setNumeroRegistro(dto.getNumeroRegistro());
        entity.setInstituicaoFinanciadora(dto.getInstituicaoFinanciadora());
        entity.setSituacao(dto.getSituacao());
    }

    private User getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email);
    }
}
