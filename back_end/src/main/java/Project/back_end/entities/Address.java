package Project.back_end.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Objects;

@Entity
@Table(name = "tb_address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "A instituição deve ser nomeada")
    @Size(max = 150, message = "O nome da instituição deve ter no máximo 150 caracteres.")
    private String institutionName;

    @NotBlank(message = "O logradouro é obrigatório.")
    @Size(max = 200, message = "O logradouro deve ter no máximo 200 caracteres.")
    @Column(nullable = false, length = 200)
    private String street;

    @NotBlank(message = "O número é obrigatório.")
    @Size(max = 20, message = "O número deve ter no máximo 20 caracteres.")
    @Column(nullable = false, length = 20)
    private String number;

    @NotBlank(message = "O bairro é obrigatório.")
    @Size(max = 100, message = "O bairro deve ter no máximo 100 caracteres.")
    @Column(nullable = false, length = 100)
    private String neighborhood;

    @NotBlank(message = "A cidade é obrigatória.")
    @Size(max = 100, message = "A cidade deve ter no máximo 100 caracteres.")
    @Column(nullable = false, length = 100)
    private String city;

    @NotBlank(message = "O estado (UF) é obrigatório.")
    @Size(min = 2, max = 2, message = "O estado deve conter exatamente 2 caracteres (UF).")
    @Column(nullable = false, length = 2)
    private String state;

    @NotBlank(message = "O CEP é obrigatório.")
    @Pattern(regexp = "\\d{8}|\\d{5}-\\d{3}", message = "O CEP deve estar no formato 12345678 ou 12345-678.")
    @Column(nullable = false, length = 9)
    private String zipCode;

    public Address() {}

    public Address(Long id, String institutionName, String street, String number, String neighborhood, String city, String state, String zipCode) {
        this.id = id;
        this.institutionName = institutionName;
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return Objects.equals(id, address.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", institutionName='" + institutionName + '\'' +
                ", street='" + street + '\'' +
                ", number='" + number + '\'' +
                ", neighborhood='" + neighborhood + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zipCode='" + zipCode + '\'' +
                '}';
    }
}
