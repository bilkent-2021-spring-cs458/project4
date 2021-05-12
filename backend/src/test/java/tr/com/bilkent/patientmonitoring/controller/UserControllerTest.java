package tr.com.bilkent.patientmonitoring.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import tr.com.bilkent.patientmonitoring.config.BeanConfig;
import tr.com.bilkent.patientmonitoring.config.WebSecurityConfig;
import tr.com.bilkent.patientmonitoring.dto.rest.CustomHTTPResponse;
import tr.com.bilkent.patientmonitoring.dto.symptom.SymptomDataDTO;
import tr.com.bilkent.patientmonitoring.dto.user.EditUserDTO;
import tr.com.bilkent.patientmonitoring.dto.user.UserRegisterDTO;
import tr.com.bilkent.patientmonitoring.dto.user.UserWithoutPasswordDTO;
import tr.com.bilkent.patientmonitoring.entity.SymptomDataType;
import tr.com.bilkent.patientmonitoring.service.SymptomService;
import tr.com.bilkent.patientmonitoring.service.UserService;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
@Import(UserController.class)
@ContextConfiguration(classes = {BeanConfig.class, WebSecurityConfig.class})
class UserControllerTest {
    private static final String EMAIL = "email@email.com";
    private static final String PASSWORD = "test123";
    private static final SymptomDataType SYMPTOM_TYPE = SymptomDataType.SPO2;
    private static final double VALUE = 7.0;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @MockBean
    private SymptomService symptomService;

    @Test
    void registerNoBody() throws Exception {
        mockMvc.perform(post("/user/register")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void registerNoEmail() throws Exception {
        UserRegisterDTO userRegisterDTO = new UserRegisterDTO(null, PASSWORD);
        mockMvc.perform(post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userRegisterDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void registerNoPassword() throws Exception {
        UserRegisterDTO userRegisterDTO = new UserRegisterDTO(EMAIL, null);
        mockMvc.perform(post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userRegisterDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void registerInvalidEmail() throws Exception {
        UserRegisterDTO userRegisterDTO = new UserRegisterDTO("invalid", PASSWORD);
        mockMvc.perform(post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userRegisterDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void registerValid() throws Exception {
        UserRegisterDTO userRegisterDTO = new UserRegisterDTO(EMAIL, PASSWORD);
        mockMvc.perform(post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userRegisterDTO)))
                .andExpect(status().isOk());

        ArgumentCaptor<UserRegisterDTO> userCaptor = ArgumentCaptor.forClass(UserRegisterDTO.class);
        verify(userService).register(userCaptor.capture());
        assertEquals(EMAIL, userCaptor.getValue().getEmail());
        assertEquals(PASSWORD, userCaptor.getValue().getPassword());
    }

    @Test
    void getAccountUnauthorized() throws Exception {
        mockMvc.perform(get("/user/account"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = EMAIL)
    void getAccount() throws Exception {
        UserWithoutPasswordDTO user = new UserWithoutPasswordDTO();
        user.setEmail(EMAIL);

        when(userService.getUserWithoutPassword(EMAIL)).thenReturn(user);
        mockMvc.perform(get("/user/account"))
                .andExpect(status().isOk())
                .andExpect(mvcResult -> {
                    String json = mvcResult.getResponse().getContentAsString();
                    CustomHTTPResponse<UserWithoutPasswordDTO> response = objectMapper
                            .readValue(json, new TypeReference<CustomHTTPResponse<UserWithoutPasswordDTO>>() {
                            });
                    assertThat(response.getData()).usingRecursiveComparison().isEqualTo(user);
                });
    }

    @Test
    void editAccountUnauthorized() throws Exception {
        mockMvc.perform(patch("/user/account"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = EMAIL)
    void editAccount() throws Exception {
        EditUserDTO editUser = new EditUserDTO();
        editUser.setFullName("Test");

        mockMvc.perform(patch("/user/account")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(editUser)))
                .andExpect(status().isOk());

        ArgumentCaptor<EditUserDTO> userCaptor = ArgumentCaptor.forClass(EditUserDTO.class);
        verify(userService).edit(eq(EMAIL), userCaptor.capture());
        assertEquals(editUser, userCaptor.getValue());
    }

    @Test
    @WithMockUser(username = EMAIL)
    void getSymptomData() throws Exception {
        mockMvc.perform(get("/user/symptom"))
                .andExpect(status().isOk());

        LocalDate from = LocalDate.of(2000, 1, 1);
        LocalDate to = LocalDate.of(2030, 12, 31);
        verify(symptomService).getSymptomDataInRange(EMAIL, null, from, to);
    }

    @Test
    @WithMockUser(username = EMAIL)
    void enterSymptomData() throws Exception {
        LocalDate now = LocalDate.now();
        SymptomDataDTO symptomData = new SymptomDataDTO(now, SYMPTOM_TYPE, VALUE);

        mockMvc.perform(put("/user/symptom")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(symptomData)))
                .andExpect(status().isOk());

        verify(symptomService).upsert(EMAIL, symptomData);
    }
}
