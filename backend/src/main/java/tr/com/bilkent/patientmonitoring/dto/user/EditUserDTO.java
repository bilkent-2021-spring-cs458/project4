package tr.com.bilkent.patientmonitoring.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditUserDTO {
    private String password;

    private String fullName;

    private Integer age;

    private String gender;

    private String maritalStatus;

    private String city;

    private String district;
}
