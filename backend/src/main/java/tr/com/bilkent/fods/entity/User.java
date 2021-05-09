package tr.com.bilkent.fods.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class User {
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
