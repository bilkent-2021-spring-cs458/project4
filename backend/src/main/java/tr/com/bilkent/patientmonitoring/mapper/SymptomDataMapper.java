package tr.com.bilkent.patientmonitoring.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import tr.com.bilkent.patientmonitoring.config.MapperConfig;
import tr.com.bilkent.patientmonitoring.dto.symptom.SymptomDataDTO;
import tr.com.bilkent.patientmonitoring.entity.SymptomData;

import java.util.List;

@Mapper(config = MapperConfig.class)
public interface SymptomDataMapper {
    SymptomDataMapper INSTANCE = Mappers.getMapper(SymptomDataMapper.class);

    @Mapping(target = "key", source = ".")
    SymptomData symptomFromDto(SymptomDataDTO symptomData);

    @InheritInverseConfiguration
    SymptomDataDTO dtoFromSymptom(SymptomData symptomData);

    List<SymptomDataDTO> symptomsToDtos(List<SymptomData> districts);
}
