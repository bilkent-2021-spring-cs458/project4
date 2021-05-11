package tr.com.bilkent.patientmonitoring.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class User {
    @EqualsAndHashCode.Include
    @Id
    private String email;

    @NotNull
    private String password;

    private String fullName;

    private Integer age;

    private String gender;

    private String maritalStatus;

    private String city;

    private String district;
}
