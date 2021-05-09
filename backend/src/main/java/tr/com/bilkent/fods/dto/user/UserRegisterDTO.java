package tr.com.bilkent.fods.dto.user;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
public class UserRegisterDTO {
    @Email
    @NotNull
    private String email;

    @NotNull
    private String password;
}
