package Project.back_end.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "tb_trabalho_tecnico")
public class TrabalhoTecnico {

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

    @NotBlank(message = "O tipo de trabalho não pode estar vazio")
    private String tipoTrabalho;

    private String instituicaoContratante;

    private String numeroContrato;

    @NotBlank(message = "A natureza não pode estar vazia")
    private String natureza;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User author;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant createdAt;

    public TrabalhoTecnico() {
    }

    public TrabalhoTecnico(Long id, String titulo, Integer ano, String autores, String descricao,
                           String tipoTrabalho, String instituicaoContratante, String numeroContrato, String natureza) {
        this.id = id;
        this.titulo = titulo;
        this.ano = ano;
        this.autores = autores;
        this.descricao = descricao;
        this.tipoTrabalho = tipoTrabalho;
        this.instituicaoContratante = instituicaoContratante;
        this.numeroContrato = numeroContrato;
        this.natureza = natureza;
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
        TrabalhoTecnico that = (TrabalhoTecnico) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
