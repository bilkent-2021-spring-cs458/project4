package tr.com.bilkent.patientmonitoring.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import tr.com.bilkent.patientmonitoring.dto.symptom.SymptomDataDTO;
import tr.com.bilkent.patientmonitoring.entity.SymptomData;
import tr.com.bilkent.patientmonitoring.entity.SymptomDataKey;
import tr.com.bilkent.patientmonitoring.entity.SymptomDataType;
import tr.com.bilkent.patientmonitoring.mapper.SymptomDataMapper;
import tr.com.bilkent.patientmonitoring.repository.SymptomDataRepository;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SymptomServiceTest {
    private static final String EMAIL = "email@email.com";
    private static final SymptomDataType SYMPTOM_TYPE = SymptomDataType.SPO2;
    private static final double VALUE = 7.0;

    @InjectMocks
    private SymptomService symptomService;

    @Mock
    private SymptomDataRepository symptomDataRepository;

    @Captor
    private ArgumentCaptor<SymptomData> symptomDataCaptor;

    @Test
    void upsert() {
        LocalDate now = LocalDate.now();
        SymptomDataDTO symptomData = new SymptomDataDTO(now, SYMPTOM_TYPE, VALUE);
        symptomService.upsert(EMAIL, symptomData);

        verify(symptomDataRepository).save(symptomDataCaptor.capture());
        assertEquals(EMAIL, symptomDataCaptor.getValue().getKey().getUserEmail());
        assertEquals(now, symptomDataCaptor.getValue().getKey().getDate());
        assertEquals(SYMPTOM_TYPE, symptomDataCaptor.getValue().getKey().getType());
        assertEquals(VALUE, symptomDataCaptor.getValue().getValue());
    }

    @Test
    void getSymptomDataInRange() {
        LocalDate from = LocalDate.of(2020, 12, 31);
        LocalDate to = LocalDate.of(2021, 12, 31);

        SymptomData data1 = new SymptomData(
                new SymptomDataKey(EMAIL, LocalDate.of(2021, 5, 6), SymptomDataType.COUGH_SEVERITY),
                1.0);
        SymptomData data2 = new SymptomData(
                new SymptomDataKey(EMAIL, LocalDate.of(2021, 7, 1), SymptomDataType.SPO2),
                2.0);
        SymptomData data3 = new SymptomData(
                new SymptomDataKey(EMAIL, LocalDate.of(2021, 10, 17), SymptomDataType.COUGH_SEVERITY),
                3.0);
        List<SymptomData> symptomData = Arrays.asList(data1, data2, data3);

        when(symptomDataRepository.findByKeyUserEmailAndKeyDateBetween(EMAIL, from, to)).thenReturn(symptomData);

        List<SymptomDataDTO> returnedSymptomDataDto = symptomService.getSymptomDataInRange(EMAIL, null, from, to);
        List<SymptomDataDTO> expectedSymptomDataDto = SymptomDataMapper.INSTANCE.symptomsToDtos(symptomData);
        assertThat(returnedSymptomDataDto).usingRecursiveComparison().isEqualTo(expectedSymptomDataDto);
    }

    @Test
    void getSymptomDataInRangeWithType() {
        LocalDate from = LocalDate.of(2020, 12, 31);
        LocalDate to = LocalDate.of(2021, 12, 31);

        SymptomData data1 = new SymptomData(
                new SymptomDataKey(EMAIL, LocalDate.of(2021, 5, 6), SYMPTOM_TYPE),
                1.0);
        SymptomData data2 = new SymptomData(
                new SymptomDataKey(EMAIL, LocalDate.of(2021, 10, 17), SYMPTOM_TYPE),
                3.0);
        List<SymptomData> symptomData = Arrays.asList(data1, data2);

        when(symptomDataRepository.findByKeyTypeAndKeyUserEmailAndKeyDateBetween(SYMPTOM_TYPE, EMAIL, from, to))
                .thenReturn(symptomData);

        List<SymptomDataDTO> returnedSymptomDataDto = symptomService
                .getSymptomDataInRange(EMAIL, SYMPTOM_TYPE, from, to);
        List<SymptomDataDTO> expectedSymptomDataDto = SymptomDataMapper.INSTANCE.symptomsToDtos(symptomData);
        assertThat(returnedSymptomDataDto).usingRecursiveComparison().isEqualTo(expectedSymptomDataDto);
    }
}
