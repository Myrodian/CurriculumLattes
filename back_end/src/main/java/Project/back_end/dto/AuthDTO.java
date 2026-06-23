package Project.back_end.dto;

public class AuthDTO {

    public record LoginResponse(Long id, String email, String name) {}
}
