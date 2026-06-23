package Project.back_end.dto;

import Project.back_end.entities.ProjetoEnsino;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.Objects;

public class ProjetoEnsinoDTO {

    private Long id;

    @NotBlank(message = "O título não pode estar vazio")
    private String titulo;

    @NotNull(message = "O ano não pode estar vazio")
    private Integer ano;

    @NotBlank(message = "Os autores não podem estar vazios")
    private String autores;

    @NotBlank(message = "A descrição não pode estar vazia")
    private String descricao;

    @NotBlank(message = "A situação do projeto não pode estar vazia")
    private String situacaoProjeto;

    private String instituicaoFinanciadora;

    private Integer numeroBolsistas;

    private String vinculoInstitucional;

    private Long authorId;
    private String authorName;
    private Instant createdAt;

    public ProjetoEnsinoDTO() {
    }

    public ProjetoEnsinoDTO(ProjetoEnsino e) {
        this.id = e.getId();
        this.titulo = e.getTitulo();
        this.ano = e.getAno();
        this.autores = e.getAutores();
        this.descricao = e.getDescricao();
        this.situacaoProjeto = e.getSituacaoProjeto();
        this.instituicaoFinanciadora = e.getInstituicaoFinanciadora();
        this.numeroBolsistas = e.getNumeroBolsistas();
        this.vinculoInstitucional = e.getVinculoInstitucional();
        this.createdAt = e.getCreatedAt();
        if (e.getAuthor() != null) {
            this.authorId = e.getAuthor().getId();
            this.authorName = e.getAuthor().getName();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getAutores() {
        return autores;
    }

    public void setAutores(String autores) {
        this.autores = autores;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getSituacaoProjeto() {
        return situacaoProjeto;
    }

    public void setSituacaoProjeto(String situacaoProjeto) {
        this.situacaoProjeto = situacaoProjeto;
    }

    public String getInstituicaoFinanciadora() {
        return instituicaoFinanciadora;
    }

    public void setInstituicaoFinanciadora(String instituicaoFinanciadora) {
        this.instituicaoFinanciadora = instituicaoFinanciadora;
    }

    public Integer getNumeroBolsistas() {
        return numeroBolsistas;
    }

    public void setNumeroBolsistas(Integer numeroBolsistas) {
        this.numeroBolsistas = numeroBolsistas;
    }

    public String getVinculoInstitucional() {
        return vinculoInstitucional;
    }

    public void setVinculoInstitucional(String vinculoInstitucional) {
        this.vinculoInstitucional = vinculoInstitucional;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ProjetoEnsinoDTO that = (ProjetoEnsinoDTO) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
