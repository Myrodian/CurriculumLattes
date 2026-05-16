package Project.back_end.services.exception;

public class ResourceNotFound extends RuntimeException{
    public ResourceNotFound(String message) {
        super(message);
    }
    public ResourceNotFound() {}
}
