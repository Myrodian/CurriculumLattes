package Project.back_end.dto;

import Project.back_end.entities.Apresentacao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.Objects;

public class ApresentacaoDTO {

    private Long id;

    @NotBlank(message = "O título não pode estar vazio")
    private String titulo;

    @NotNull(message = "O ano não pode estar vazio")
    private Integer ano;

    @NotBlank(message = "Os autores não podem estar vazios")
    private String autores;

    @NotBlank(message = "A descrição não pode estar vazia")
    private String descricao;

    @NotBlank(message = "O tipo de evento não pode estar vazio")
    private String tipoEvento;

    @NotBlank(message = "O nome do evento não pode estar vazio")
    private String nomeEvento;

    private String localEvento;

    @NotBlank(message = "A natureza não pode estar vazia")
    private String natureza;

    private Long authorId;
    private String authorName;
    private Instant createdAt;

    public ApresentacaoDTO() {
    }

    public ApresentacaoDTO(Apresentacao e) {
        this.id = e.getId();
        this.titulo = e.getTitulo();
        this.ano = e.getAno();
        this.autores = e.getAutores();
        this.descricao = e.getDescricao();
        this.tipoEvento = e.getTipoEvento();
        this.nomeEvento = e.getNomeEvento();
        this.localEvento = e.getLocalEvento();
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

    public String getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(String tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public String getNomeEvento() {
        return nomeEvento;
    }

    public void setNomeEvento(String nomeEvento) {
        this.nomeEvento = nomeEvento;
    }

    public String getLocalEvento() {
        return localEvento;
    }

    public void setLocalEvento(String localEvento) {
        this.localEvento = localEvento;
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
        ApresentacaoDTO that = (ApresentacaoDTO) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
