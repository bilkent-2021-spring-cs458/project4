package tr.com.bilkent.fods.dto.rest;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;
import java.time.Instant;

@Getter
@Setter
@ToString
public class CustomHTTPResponse<T> {
    private T data;
    private String message;
    private Timestamp timestamp;

    public CustomHTTPResponse() {
        this.timestamp = Timestamp.from(Instant.now());
    }

    public CustomHTTPResponse(T data) {
        this();
        this.data = data;
    }

    public CustomHTTPResponse(String message) {
        this();
        this.message = message;
    }

    public CustomHTTPResponse(T data, String message) {
        this(data);
        this.message = message;
    }
}
