package tr.com.bilkent.patientmonitoring.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tr.com.bilkent.patientmonitoring.entity.User;

import java.util.Collections;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserService userService;

    @Autowired
    public CustomUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.getUser(username);
        if (user == null) {
            log.info("Username {} not found.", username);
            throw new UsernameNotFoundException("No user found with username: " + username);
        }

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), true,
                true, true, true, Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
