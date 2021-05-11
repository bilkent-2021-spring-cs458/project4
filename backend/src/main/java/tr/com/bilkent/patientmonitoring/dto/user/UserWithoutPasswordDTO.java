package tr.com.bilkent.patientmonitoring.dto.user;

import lombok.Data;

import javax.validation.constraints.Email;

@Data
public class UserWithoutPasswordDTO {
    @Email
    private String email;

    private String fullName;

    private Integer age;

    private String gender;

    private String maritalStatus;

    private String city;

    private String district;
}
