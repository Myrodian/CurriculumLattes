package Project.back_end.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_publication")
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User author;

    public Publication() {
    }

    public Publication(Long id, User author) {
        this.id = id;
        this.author = author;
    }

    public Long getId() {
        return id;
    }

    public void setAuthor(User author) {
        this.author = author;
    }
}
