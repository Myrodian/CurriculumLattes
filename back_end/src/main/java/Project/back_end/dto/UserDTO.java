package Project.back_end.dto;

import Project.back_end.entities.Address;
import Project.back_end.entities.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CPF;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

public class UserDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome não pode ser vazio")
    private String name;

    private String phone;

    @NotBlank(message = "O e-mail não pode estar vazio")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "O cpf não pode estar vazio")
    @CPF(message = "Cpf inválido")
    @Column(unique = true, length = 14) // Pendente execption handler para chave repetida e numero de caracteres errados
    private String cpf;

    private Address address;

    private List<PerfilDTO> perfils;

    private Set<UserDTO> connections;

    public UserDTO(Long id, String name, String phone, String email, String cpf, Set<UserDTO>connections, Address address) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.cpf = cpf;
        this.connections = connections;
        this.address = address;
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.cpf = user.getCpf();
        this.perfils = new ArrayList<>();
        user.getPerfils().forEach(perfil -> this.perfils.add(new PerfilDTO(perfil)));
        this.address = user.getAddress();
    }

    public UserDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() { return cpf; }

    public void setCpf(String cpf) { this.cpf = cpf; }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Set<UserDTO> getConnections() {
        return connections;
    }

    public void setConnections(Set<UserDTO> connections) {
        this.connections = connections;
    }

    public List<PerfilDTO> getPerfils() {
        return perfils;
    }

    public void setPerfils(List<PerfilDTO> perfils) {
        this.perfils = perfils;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        UserDTO user = (UserDTO) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", cpf='" + cpf + '\'' +
                ", address=" + address +
                ", perfils=" + perfils +
                ", connections=" + connections +
                '}';
    }
}
