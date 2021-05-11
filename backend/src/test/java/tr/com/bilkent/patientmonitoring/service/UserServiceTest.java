package tr.com.bilkent.patientmonitoring.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import tr.com.bilkent.patientmonitoring.dto.user.EditUserDTO;
import tr.com.bilkent.patientmonitoring.dto.user.UserRegisterDTO;
import tr.com.bilkent.patientmonitoring.dto.user.UserWithoutPasswordDTO;
import tr.com.bilkent.patientmonitoring.entity.User;
import tr.com.bilkent.patientmonitoring.exception.UsernameExistsException;
import tr.com.bilkent.patientmonitoring.mapper.UserMapper;
import tr.com.bilkent.patientmonitoring.repository.UserRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    private static final String EMAIL = "email@email.com";
    private static final String PASSWORD = "test123";
    private static final String FULL_NAME = "Test";
    private static final int AGE = 20;
    private static final String GENDER = "Male";
    private static final String MARITAL_STATUS = "Single";
    private static final String CITY = "Ankara";
    private static final String DISTRICT = "Cankaya";

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Spy
    private final PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    @Captor
    private ArgumentCaptor<User> userCaptor;

    @Test
    void getUserExisting() {
        User user = new User();
        user.setEmail(EMAIL);
        when(userRepository.findById(EMAIL)).thenReturn(Optional.of(user));

        User returnedUser = userService.getUser(EMAIL);
        assertEquals(EMAIL, returnedUser.getEmail());
    }

    @Test
    void getUserNonExisting() {
        User returnedUser = userService.getUser(EMAIL);
        assertNull(returnedUser);
    }

    @Test
    void loadUserByUsernameExisting() {
        User user = new User();
        user.setEmail(EMAIL);
        user.setPassword(PASSWORD);
        when(userRepository.findById(EMAIL)).thenReturn(Optional.of(user));

        UserDetails userDetails = userService.loadUserByUsername(EMAIL);
        assertEquals(EMAIL, userDetails.getUsername());
    }

    @Test
    void loadUserByUsernameNonExisting() {
        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername(EMAIL));
    }

    @Test
    void register() {
        UserRegisterDTO userRegisterDTO = new UserRegisterDTO(EMAIL, PASSWORD);
        User user = UserMapper.INSTANCE.userFromDto(userRegisterDTO);

        when(userRepository.findById(EMAIL)).thenReturn(Optional.empty()).thenReturn(Optional.of(user));
        userService.register(userRegisterDTO);

        verify(userRepository).save(any(User.class));
        assertThrows(UsernameExistsException.class, () -> userService.register(userRegisterDTO));
    }

    @Test
    void getUserWithoutPassword() {
        User user = new User();
        user.setEmail(EMAIL);
        when(userRepository.findById(EMAIL)).thenReturn(Optional.of(user));

        UserWithoutPasswordDTO userWithoutPasswordDTO = userService.getUserWithoutPassword(EMAIL);
        assertEquals(EMAIL, userWithoutPasswordDTO.getEmail());
    }

    @Test
    void editNone() {
        User user = new User();
        user.setEmail(EMAIL);
        when(userRepository.findById(EMAIL)).thenReturn(Optional.of(user));

        EditUserDTO editUserDTO = new EditUserDTO();
        userService.edit(EMAIL, editUserDTO);

        verify(userRepository).save(userCaptor.capture());
        assertEquals(user, userCaptor.getValue());
    }

    @Test
    void editPassword() {
        User user = new User();
        user.setEmail(EMAIL);
        when(userRepository.findById(EMAIL)).thenReturn(Optional.of(user));

        EditUserDTO editUserDTO = new EditUserDTO();
        editUserDTO.setPassword(PASSWORD);
        userService.edit(EMAIL, editUserDTO);

        verify(userRepository).save(userCaptor.capture());
        assertEquals(user.getEmail(), userCaptor.getValue().getEmail());
        assertTrue(passwordEncoder.matches(PASSWORD, userCaptor.getValue().getPassword()));
    }

    @Test
    void editFull() {
        User user = new User();
        user.setEmail(EMAIL);
        when(userRepository.findById(EMAIL)).thenReturn(Optional.of(user));

        EditUserDTO editUserDTO = new EditUserDTO(PASSWORD, FULL_NAME, AGE, GENDER, MARITAL_STATUS, CITY, DISTRICT);
        userService.edit(EMAIL, editUserDTO);

        verify(userRepository).save(userCaptor.capture());
        assertEquals(user.getEmail(), userCaptor.getValue().getEmail());
        assertTrue(passwordEncoder.matches(PASSWORD, userCaptor.getValue().getPassword()));
        assertEquals(FULL_NAME, userCaptor.getValue().getFullName());
        assertEquals(AGE, userCaptor.getValue().getAge());
        assertEquals(GENDER, userCaptor.getValue().getGender());
        assertEquals(MARITAL_STATUS, userCaptor.getValue().getMaritalStatus());
        assertEquals(CITY, userCaptor.getValue().getCity());
        assertEquals(DISTRICT, userCaptor.getValue().getDistrict());
    }
}
