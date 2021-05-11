package tr.com.bilkent.patientmonitoring.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import tr.com.bilkent.patientmonitoring.dto.rest.CustomHTTPResponse;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.List;

import static javax.servlet.http.HttpServletResponse.*;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleBindException(BindException ex,
                                                         HttpHeaders headers,
                                                         HttpStatus status,
                                                         WebRequest request) {
        BindingResult result = ex.getBindingResult();
        log.warn("Validation failed: {}", result.getAllErrors());
        CustomHTTPResponse<List<ObjectError>> bodyOfResponse = new CustomHTTPResponse<>(result.getAllErrors(),
                "Invalid " + result.getObjectName());
        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {
        BindingResult result = ex.getBindingResult();
        log.warn("Method argument invalid: {}", result.getAllErrors());
        CustomHTTPResponse<List<ObjectError>> bodyOfResponse = new CustomHTTPResponse<>(result.getAllErrors(),
                "Invalid " + result.getObjectName());
        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    protected ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException ex) {
        log.info("Constraint violation: {}", ex.getMessage());
        ConstraintViolation<?> violation = ex.getConstraintViolations().iterator().next();
        CustomHTTPResponse<Void> bodyOfResponse = new CustomHTTPResponse<>(
                "Constraint violation: " + violation.getPropertyPath() + " " + violation.getMessage());
        return new ResponseEntity<>(bodyOfResponse, new HttpHeaders(), SC_BAD_REQUEST);
    }

    @ExceptionHandler(UsernameExistsException.class)
    public ResponseEntity<Object> handleUsernameExistsException(UsernameExistsException ex) {
        log.info("Existing username registration request: {}", ex.getMessage());
        CustomHTTPResponse<Void> bodyOfResponse = new CustomHTTPResponse<>("Username already exists");
        return new ResponseEntity<>(bodyOfResponse, new HttpHeaders(), SC_CONFLICT);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        log.info("Database integrity violation: {}", ex.getMessage());
        CustomHTTPResponse<Void> bodyOfResponse = new CustomHTTPResponse<>("Database integrity violation");
        return new ResponseEntity<>(bodyOfResponse, new HttpHeaders(), SC_BAD_REQUEST);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<Object> handleInternal(Exception ex) {
        logger.error("Server exception", ex);
        CustomHTTPResponse<Void> bodyOfResponse = new CustomHTTPResponse<>("Internal Error");
        return new ResponseEntity<>(bodyOfResponse, new HttpHeaders(), SC_INTERNAL_SERVER_ERROR);
    }
}
