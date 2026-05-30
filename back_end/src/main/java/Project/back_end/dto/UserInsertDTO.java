package Project.back_end.dto;

import Project.back_end.entities.User;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class UserInsertDTO extends UserDTO {

    @Size(min = 6, max = 32, message = "A senha deve conter entre 6 e 32 caracteres")
    private String password;

    public UserInsertDTO(String password) {
        this.password = password;
    }

    public UserInsertDTO(User user) {
        this.password = user.getPassword();
    }

    public UserInsertDTO() {
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }
}
