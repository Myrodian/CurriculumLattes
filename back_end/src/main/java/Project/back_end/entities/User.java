package Project.back_end.entities;

import Project.back_end.dto.UserDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.*;

@Entity
@Table(name = "tb_user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome não pode ser vazio")
    private String name;

    private String phone;

    @NotBlank(message = "O e-mail não pode estar vazio")
    @Email(message = "Email inválido")
    private String email;

    @Size(min = 6, max = 32, message = "A senha deve conter entre 6 e 32 caracteres")
    private String password;

    @NotBlank(message = "O cpf não pode estar vazio")
    @CPF(message = "Cpf inválido")
    @Column(unique = true, length = 14)
    private String cpf;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant created_at;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant updated_at;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tb_user_perfil",
            joinColumns = @JoinColumn(name = "id_user"),
            inverseJoinColumns = @JoinColumn(name = "id_perfil")
    )
    private Set<Perfil> perfils = new HashSet<Perfil>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tb_user",
            joinColumns = @JoinColumn(name = "id_user"),
            inverseJoinColumns = @JoinColumn(name = "id_user")
    )
    private Set<UserDTO> connections = new HashSet<UserDTO>();

    public User(Long id, String name, String phone, String email, String password) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return perfils;
    }

    public Set<UserDTO> getconnections() { return connections; }

    public void setconnections(Set<UserDTO> connections) { this.connections = connections; }

    public void addFriend(UserDTO newFriend) { this.connections.add(newFriend); }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getCpf() { return cpf; }

    public void setCpf(String cpf) { this.cpf = cpf; }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Perfil> getPerfils() {
        return perfils;
    }

    public void setPerfils(Set<Perfil> perfils) {
        this.perfils = perfils;
    }

    public Instant getUpdated_at() { return updated_at; }

    public Instant getCreated_at() { return created_at; }

    public void addRole(Perfil perfil) {
        this.perfils.add(perfil);
    }

    public void hasRole(Perfil perfil) {
        this.perfils.contains(perfil);
    }

    @PrePersist
    public void prePersist() {
        this.created_at = Instant.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updated_at = Instant.now();
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", cpf='" + cpf + '\'' +
                ", created_at=" + created_at +
                ", updated_at=" + updated_at +
                '}';
    }
}
