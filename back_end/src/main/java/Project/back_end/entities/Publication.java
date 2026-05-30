package Project.back_end.entities;

import Project.back_end.dto.UserDTO;
import jakarta.persistence.*;

@Entity
@Table(name = "tb_publication")
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private Long author_id;

    public Publication() {
    }

    public Publication(Long id, User author) {
        this.id = id;
        this.author_id = author.getId();
    }

    public Long getId() {
        return id;
    }

    public void setAuthor(User author) {
        this.author_id = author.getId();
    }
}
