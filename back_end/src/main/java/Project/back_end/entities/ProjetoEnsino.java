package Project.back_end.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "tb_projeto_ensino")
public class ProjetoEnsino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O título não pode estar vazio")
    private String titulo;

    @NotNull(message = "O ano não pode estar vazio")
    private Integer ano;

    @NotBlank(message = "Os autores não podem estar vazios")
    private String autores;

    @NotBlank(message = "A descrição não pode estar vazia")
    @Column(columnDefinition = "TEXT")
    private String descricao;

    @NotBlank(message = "A situação do projeto não pode estar vazia")
    private String situacaoProjeto;

    private String instituicaoFinanciadora;

    private Integer numeroBolsistas;

    private String vinculoInstitucional;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User author;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant createdAt;

    public ProjetoEnsino() {
    }

    public ProjetoEnsino(Long id, String titulo, Integer ano, String autores, String descricao,
                         String situacaoProjeto, String instituicaoFinanciadora, Integer numeroBolsistas,
                         String vinculoInstitucional) {
        this.id = id;
        this.titulo = titulo;
        this.ano = ano;
        this.autores = autores;
        this.descricao = descricao;
        this.situacaoProjeto = situacaoProjeto;
        this.instituicaoFinanciadora = instituicaoFinanciadora;
        this.numeroBolsistas = numeroBolsistas;
        this.vinculoInstitucional = vinculoInstitucional;
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = Instant.now();
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

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ProjetoEnsino that = (ProjetoEnsino) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
