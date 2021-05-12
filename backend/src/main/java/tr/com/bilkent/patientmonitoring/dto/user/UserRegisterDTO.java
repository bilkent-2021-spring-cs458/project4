package tr.com.bilkent.patientmonitoring.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
public class UserRegisterDTO {
    @NotNull
    @NotEmpty
    @Email
    private String email;

    @NotNull
    @Size(min = 4, max = 64)
    private String password;
}
