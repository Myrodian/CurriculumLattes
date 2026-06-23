package Project.back_end.dto;

import Project.back_end.entities.TrabalhoTecnico;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.Objects;

public class TrabalhoTecnicoDTO {

    private Long id;

    @NotBlank(message = "O título não pode estar vazio")
    private String titulo;

    @NotNull(message = "O ano não pode estar vazio")
    private Integer ano;

    @NotBlank(message = "Os autores não podem estar vazios")
    private String autores;

    @NotBlank(message = "A descrição não pode estar vazia")
    private String descricao;

    @NotBlank(message = "O tipo de trabalho não pode estar vazio")
    private String tipoTrabalho;

    private String instituicaoContratante;

    private String numeroContrato;

    @NotBlank(message = "A natureza não pode estar vazia")
    private String natureza;

    private Long authorId;
    private String authorName;
    private Instant createdAt;

    public TrabalhoTecnicoDTO() {
    }

    public TrabalhoTecnicoDTO(TrabalhoTecnico e) {
        this.id = e.getId();
        this.titulo = e.getTitulo();
        this.ano = e.getAno();
        this.autores = e.getAutores();
        this.descricao = e.getDescricao();
        this.tipoTrabalho = e.getTipoTrabalho();
        this.instituicaoContratante = e.getInstituicaoContratante();
        this.numeroContrato = e.getNumeroContrato();
        this.natureza = e.getNatureza();
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

    public String getTipoTrabalho() {
        return tipoTrabalho;
    }

    public void setTipoTrabalho(String tipoTrabalho) {
        this.tipoTrabalho = tipoTrabalho;
    }

    public String getInstituicaoContratante() {
        return instituicaoContratante;
    }

    public void setInstituicaoContratante(String instituicaoContratante) {
        this.instituicaoContratante = instituicaoContratante;
    }

    public String getNumeroContrato() {
        return numeroContrato;
    }

    public void setNumeroContrato(String numeroContrato) {
        this.numeroContrato = numeroContrato;
    }

    public String getNatureza() {
        return natureza;
    }

    public void setNatureza(String natureza) {
        this.natureza = natureza;
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
        TrabalhoTecnicoDTO that = (TrabalhoTecnicoDTO) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
