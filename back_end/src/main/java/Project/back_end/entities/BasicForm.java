package Project.back_end.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_basic_form")
public class BasicForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User author;

    public BasicForm() {
    }

    public BasicForm(Long id, User author) {
        this.id = id;
        this.author = author;
    }

    public Long getId() {
        return id;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

}
