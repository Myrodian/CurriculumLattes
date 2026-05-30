package Project.back_end.dto;

import Project.back_end.entities.Perfil;
import jakarta.persistence.*;

import java.util.Objects;

public class PerfilDTO {

    private Long id;
    private String nome;

    public PerfilDTO() {}

    public PerfilDTO(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public PerfilDTO(Perfil perfil) {
        this.id = perfil.getId();
        this.nome = perfil.getNome();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        PerfilDTO perfilDTO = (PerfilDTO) o;
        return Objects.equals(id, perfilDTO.id) && Objects.equals(nome, perfilDTO.nome);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "PerfilDTO{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                '}';
    }
}
