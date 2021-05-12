package tr.com.bilkent.patientmonitoring.dto.symptom;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.com.bilkent.patientmonitoring.entity.SymptomDataType;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SymptomDataDTO {
    @NotNull
    private LocalDate date;

    @NotNull
    private SymptomDataType type;

    @NotNull
    private Double value;
}
