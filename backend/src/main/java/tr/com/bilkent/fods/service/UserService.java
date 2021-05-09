package tr.com.bilkent.fods.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.bilkent.fods.entity.User;
import tr.com.bilkent.fods.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Returns the user with the given username, or null if it does not exist.
     */
    protected User getUser(String username) {
        return userRepository.findById(username).orElse(null);
    }
}
