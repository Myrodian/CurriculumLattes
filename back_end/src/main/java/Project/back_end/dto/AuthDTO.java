package Project.back_end.dto;

public class AuthDTO {

    // Request
    public record LoginRequest(String email, String password) {}

    // Response
    public record LoginResponse(String token, String email, String name) {}
}