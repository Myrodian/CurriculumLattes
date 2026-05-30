package Project.back_end.dto;

public class AuthDTO {

    public record LoginResponse(String email, String name) {}
}
