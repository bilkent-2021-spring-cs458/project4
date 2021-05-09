package tr.com.bilkent.fods.exception;

public class UsernameExistsException extends RuntimeException {
    public UsernameExistsException(final String message) {
        super(message);
    }
}