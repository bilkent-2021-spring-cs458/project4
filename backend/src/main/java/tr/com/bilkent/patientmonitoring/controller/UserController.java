package tr.com.bilkent.patientmonitoring.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;
import tr.com.bilkent.patientmonitoring.dto.rest.CustomHTTPResponse;
import tr.com.bilkent.patientmonitoring.dto.symptom.SymptomDataDTO;
import tr.com.bilkent.patientmonitoring.dto.user.EditUserDTO;
import tr.com.bilkent.patientmonitoring.dto.user.UserRegisterDTO;
import tr.com.bilkent.patientmonitoring.dto.user.UserWithoutPasswordDTO;
import tr.com.bilkent.patientmonitoring.entity.SymptomDataType;
import tr.com.bilkent.patientmonitoring.service.SymptomService;
import tr.com.bilkent.patientmonitoring.service.UserService;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final SymptomService symptomService;

    @Autowired
    public UserController(UserService userService, SymptomService symptomService) {
        this.userService = userService;
        this.symptomService = symptomService;
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
        String username = authentication.getName();
        log.info("User get account details request: {}", username);
        UserWithoutPasswordDTO user = userService.getUserWithoutPassword(username);

        return new CustomHTTPResponse<>(user);
    }

    @ApiOperation("Edit the account of the logged-in user.")
    @PatchMapping("/account")
    public CustomHTTPResponse<Void> editAccount(@RequestBody @Valid EditUserDTO user,
                                                @ApiIgnore Authentication authentication) {
        String username = authentication.getName();
        log.info("User edit account request: username = {} data = {}", username, user);
        userService.edit(username, user);

        return new CustomHTTPResponse<>("Account successfully modified.");
    }

    @ApiOperation("Get all symptom data in-between the given dates.")
    @GetMapping("/symptom")
    public CustomHTTPResponse<List<SymptomDataDTO>> getSymptomData(@RequestParam(defaultValue = "2000-01-01") LocalDate from,
                                                                   @RequestParam(defaultValue = "2030-12-31") LocalDate to,
                                                                   @ApiParam("Type of symptom to retrieve. Will return all data if skipped.")
                                                                   @RequestParam(required = false) SymptomDataType type,
                                                                   @ApiIgnore Authentication authentication) {
        String username = authentication.getName();
        log.info("Get symptom data request: {} {} {} {}", username, type, from, to);

        List<SymptomDataDTO> symptomData = symptomService.getSymptomDataInRange(username, type, from, to);
        return new CustomHTTPResponse<>(symptomData);
    }

    @ApiOperation("Create a new symptom data or update an existing one.")
    @PutMapping("/symptom")
    public CustomHTTPResponse<Void> enterSymptomData(@RequestBody @Valid SymptomDataDTO symptomData,
                                                     @ApiIgnore Authentication authentication) {
        String username = authentication.getName();
        log.info("Upsert symptom data request: {}", username);
        symptomService.upsert(username, symptomData);

        return new CustomHTTPResponse<>("Symptom data stored.");
    }
}
