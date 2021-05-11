package tr.com.bilkent.patientmonitoring.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import tr.com.bilkent.patientmonitoring.config.MapperConfig;
import tr.com.bilkent.patientmonitoring.dto.user.EditUserDTO;
import tr.com.bilkent.patientmonitoring.dto.user.UserRegisterDTO;
import tr.com.bilkent.patientmonitoring.dto.user.UserWithoutPasswordDTO;
import tr.com.bilkent.patientmonitoring.entity.User;

@Mapper(config = MapperConfig.class)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "maritalStatus", ignore = true)
    @Mapping(target = "gender", ignore = true)
    @Mapping(target = "fullName", ignore = true)
    @Mapping(target = "district", ignore = true)
    @Mapping(target = "city", ignore = true)
    @Mapping(target = "age", ignore = true)
    User userFromDto(UserRegisterDTO user);

    UserWithoutPasswordDTO userWithoutPasswordDTOFromUser(User user);

    @Mapping(target = "email", ignore = true)
    void updateUserFromDto(EditUserDTO newData, @MappingTarget User user);
}
