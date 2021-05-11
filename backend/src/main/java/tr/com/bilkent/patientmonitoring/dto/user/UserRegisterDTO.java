package tr.com.bilkent.patientmonitoring.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class UserRegisterDTO {
    @Email
    @NotNull
    private String email;

    @NotNull
    private String password;
}
