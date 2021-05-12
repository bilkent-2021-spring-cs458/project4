package tr.com.bilkent.patientmonitoring.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tr.com.bilkent.patientmonitoring.dto.user.EditUserDTO;
import tr.com.bilkent.patientmonitoring.dto.user.UserRegisterDTO;
import tr.com.bilkent.patientmonitoring.dto.user.UserWithoutPasswordDTO;
import tr.com.bilkent.patientmonitoring.entity.User;
import tr.com.bilkent.patientmonitoring.exception.UsernameExistsException;
import tr.com.bilkent.patientmonitoring.mapper.UserMapper;
import tr.com.bilkent.patientmonitoring.repository.UserRepository;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Returns the user with the given username, or null if it does not exist.
     */
    protected User getUser(String username) {
        return userRepository.findById(username).orElse(null);
    }

    public void register(UserRegisterDTO dto) {
        if (getUser(dto.getEmail()) != null) {
            throw new UsernameExistsException("Username " + dto.getEmail() + " is already registered");
        }

        User user = UserMapper.INSTANCE.userFromDto(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        userRepository.save(user);
    }

    public UserWithoutPasswordDTO getUserWithoutPassword(String username) {
        User user = getUser(username);
        return UserMapper.INSTANCE.userWithoutPasswordDTOFromUser(user);
    }

    public void edit(String username, EditUserDTO newData) {
        String password = newData.getPassword();
        if (password != null) {
            newData.setPassword(passwordEncoder.encode(password));
        }

        User user = getUser(username);
        UserMapper.INSTANCE.updateUserFromDto(newData, user);
        userRepository.save(user);
    }
}
