package Project.back_end.resources.exception;

public class databaseException extends RuntimeException{
    public databaseException(String mensage){
        super(mensage);
    }
    public databaseException(){}
}
