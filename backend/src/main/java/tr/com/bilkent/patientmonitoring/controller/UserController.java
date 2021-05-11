package tr.com.bilkent.patientmonitoring.controller;

import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;
import tr.com.bilkent.patientmonitoring.dto.rest.CustomHTTPResponse;
import tr.com.bilkent.patientmonitoring.dto.user.EditUserDTO;
import tr.com.bilkent.patientmonitoring.dto.user.UserRegisterDTO;
import tr.com.bilkent.patientmonitoring.dto.user.UserWithoutPasswordDTO;
import tr.com.bilkent.patientmonitoring.service.UserService;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public CustomHTTPResponse<Void> register(@RequestBody @Valid UserRegisterDTO user) {
        log.info("User register request: {}", user);
        userService.register(user);
        return new CustomHTTPResponse<>("Registration succeeded.");
    }

    @ApiOperation("Get the account details of the logged-in user.")
    @GetMapping("/account")
    public CustomHTTPResponse<UserWithoutPasswordDTO> getAccount(@ApiIgnore Authentication authentication) {
        log.info("User get account details request");

        String username = authentication.getName();
        UserWithoutPasswordDTO user = userService.getUserWithoutPassword(username);

        return new CustomHTTPResponse<>(user);
    }

    @ApiOperation("Edit the account of the logged-in user.")
    @PatchMapping("/account")
    public CustomHTTPResponse<Void> editAccount(@RequestBody @Valid EditUserDTO user,
                                                @ApiIgnore Authentication authentication) {
        log.info("User edit account request");

        String username = authentication.getName();
        userService.edit(username, user);

        return new CustomHTTPResponse<>("Account successfully modified.");
    }
}
