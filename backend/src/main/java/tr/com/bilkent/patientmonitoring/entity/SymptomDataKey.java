package tr.com.bilkent.patientmonitoring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class SymptomDataKey implements Serializable {
    @Column(name = "user_email")
    private String userEmail;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private SymptomDataType type;
}
