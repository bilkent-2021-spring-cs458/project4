package tr.com.bilkent.patientmonitoring.entity;

import lombok.*;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class SymptomData {
    @EmbeddedId
    private SymptomDataKey key;

    @NotNull
    private Double value;
}
