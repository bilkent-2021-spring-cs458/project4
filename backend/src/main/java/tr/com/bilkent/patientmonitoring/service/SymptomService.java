package tr.com.bilkent.patientmonitoring.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.bilkent.patientmonitoring.dto.symptom.SymptomDataDTO;
import tr.com.bilkent.patientmonitoring.entity.SymptomData;
import tr.com.bilkent.patientmonitoring.entity.SymptomDataType;
import tr.com.bilkent.patientmonitoring.mapper.SymptomDataMapper;
import tr.com.bilkent.patientmonitoring.repository.SymptomDataRepository;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
public class SymptomService {
    private final SymptomDataRepository symptomDataRepository;

    @Autowired
    public SymptomService(SymptomDataRepository symptomDataRepository) {
        this.symptomDataRepository = symptomDataRepository;
    }

    public void upsert(String email, SymptomDataDTO symptomData) {
        SymptomData symptom = SymptomDataMapper.INSTANCE.symptomFromDto(symptomData);
        symptom.getKey().setUserEmail(email);
        symptomDataRepository.save(symptom);
    }

    public List<SymptomDataDTO> getSymptomDataInRange(String email, SymptomDataType type, LocalDate from, LocalDate to) {
        log.info("Retrieving {} symptom data from {} to {} for user {}", type, from, to, email);

        List<SymptomData> symptomData;
        if (type == null) {
            symptomData = symptomDataRepository.findByKeyUserEmailAndKeyDateBetween(email, from, to);
        } else {
            symptomData = symptomDataRepository.findByKeyTypeAndKeyUserEmailAndKeyDateBetween(type, email, from, to);
        }

        return SymptomDataMapper.INSTANCE.symptomsToDtos(symptomData);
    }
}
