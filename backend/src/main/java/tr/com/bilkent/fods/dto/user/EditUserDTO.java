package tr.com.bilkent.fods.dto.user;

import lombok.Data;

@Data
public class EditUserDTO {
    private String password;

    private String fullName;

    private Integer age;

    private String gender;

    private String maritalStatus;

    private String city;

    private String district;
}
