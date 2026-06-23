package Project.back_end.dto;

import java.time.Instant;

public class ActivityDTO {

    private String type;
    private Long id;
    private String titulo;
    private Integer ano;
    private Long authorId;
    private String authorName;
    private Instant createdAt;

    public ActivityDTO() {
    }

    public ActivityDTO(String type, Long id, String titulo, Integer ano,
                       Long authorId, String authorName, Instant createdAt) {
        this.type = type;
        this.id = id;
        this.titulo = titulo;
        this.ano = ano;
        this.authorId = authorId;
        this.authorName = authorName;
        this.createdAt = createdAt;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
}
