package tr.com.bilkent.patientmonitoring.exception;

public class UsernameExistsException extends RuntimeException {
    public UsernameExistsException(final String message) {
        super(message);
    }
}