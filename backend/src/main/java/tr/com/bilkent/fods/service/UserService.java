package tr.com.bilkent.fods.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tr.com.bilkent.fods.dto.user.EditUserDTO;
import tr.com.bilkent.fods.dto.user.UserRegisterDTO;
import tr.com.bilkent.fods.dto.user.UserWithoutPasswordDTO;
import tr.com.bilkent.fods.entity.User;
import tr.com.bilkent.fods.exception.UsernameExistsException;
import tr.com.bilkent.fods.mapper.UserMapper;
import tr.com.bilkent.fods.repository.UserRepository;

import java.util.Collections;

@Slf4j
@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUser(username);
        if (user == null) {
            log.info("Username {} not found.", username);
            throw new UsernameNotFoundException("No user found with username: " + username);
        }

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), true,
                true, true, true, Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
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
