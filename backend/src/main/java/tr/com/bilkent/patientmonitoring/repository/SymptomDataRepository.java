package tr.com.bilkent.patientmonitoring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tr.com.bilkent.patientmonitoring.entity.SymptomData;
import tr.com.bilkent.patientmonitoring.entity.SymptomDataKey;
import tr.com.bilkent.patientmonitoring.entity.SymptomDataType;

import java.time.LocalDate;
import java.util.List;

public interface SymptomDataRepository extends JpaRepository<SymptomData, SymptomDataKey> {
    List<SymptomData> findByKeyUserEmailAndKeyDateBetween(String userEmail, LocalDate dateFrom, LocalDate dateTo);

    List<SymptomData> findByKeyTypeAndKeyUserEmailAndKeyDateBetween(SymptomDataType type, String userEmail,
                                                                    LocalDate dateFrom, LocalDate dateTo);
}
