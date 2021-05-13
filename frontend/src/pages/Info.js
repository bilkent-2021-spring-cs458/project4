import {
    Box,
    Container,
    makeStyles,
    withStyles,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
} from "@material-ui/core";
import React from "react";
import NfRedButton from "~/components/NfRedButton";
import { editInfo } from "~/service/Service";

const useStyles = makeStyles({
    paper: {
        height: 750,
    },
    centerForm: {
        marginTop: "90px",
        padding: "60px 68px 123px",
        background: "rgba(0, 153, 153, 0.91)",
    },
    uiMessage: {
        backgroundColor: "#FFFFFF",
        borderRadius: "4px",
        color: "white",
        fontSize: "14px",
        padding: "10px 20px",
        marginBottom: "16px",
    },
    textField: {
        paddingBottom: "16px",
        "& .MuiFormHelperText-root": {
            color: "#004C99",
            fontSize: "13px",
        },
        "& .MuiInputBase-root": {
            backgroundColor: "rgb(255, 255, 255)",
            borderRadius: "4px",
            borderColor: "rgb(255, 255, 255)",
        },
        "& .MuiInputBase-input": {
            color: "black",
        },
        "& .MuiInputBase-root.Mui-focused": {
            backgroundColor: "rgb(255, 255, 255)",
            borderColor: "rgb(255, 255, 255)",
        },
        "& .MuiInputBase-root.Mui-focused:not(.Mui-error)": {
            borderBottomColor: "rgb(255, 255, 255)",
        },
    },
    formControl: {
        borderRadius: 4,
        backgroundColor: "rgb(255, 255, 255)",
    },
});

const WhiteTypography = withStyles({
    root: {
        color: "white",
    },
})(Typography);

export default function Info() {
    const submit = (e) => {
        e.preventDefault();

        const fullName = e.target.fullname.value;
        const age = e.target.age.value;
        const gender = e.target.gender.value;
        const city = e.target.city.value;
        const maritalStatus = e.target.status.value;
        const password = e.target.password.value;

        let user = {
            fullName,
            age,
            gender,
            city,
            maritalStatus,
            password,
        };
        Object.keys(user).forEach((key) => !user[key] && delete user[key]);
        console.log(user);
        editInfo(user)
            .then(() => {
                window.location.href = "/";
            })
            .catch((response) => {
                if (response.status == 401) {
                    alert("Error occured! You have been signed out!");
                    window.location.href = "/signin";
                } else {
                    alert("Unknown error occured!");
                }
            });
    };

    const [state, setState] = React.useState({
        gender: "",
        city: "",
        status: "",
    });
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <Container maxWidth="xs" className={classes.centerForm}>
                <form onSubmit={submit}>
                    <WhiteTypography paragraph variant="h5">
                        <Box fontWeight="Bold" component="span">
                            Account Information
                        </Box>
                    </WhiteTypography>

                    <WhiteTypography paragraph variant="h4"></WhiteTypography>

                    <TextField
                        type="fullname"
                        name="fullname"
                        variant="filled"
                        noValidate
                        autoComplete="off"
                        fullWidth
                        label="Full Name"
                        className={classes.textField}
                    />
                    <TextField
                        type="age"
                        name="age"
                        variant="filled"
                        noValidate
                        autoComplete="off"
                        style={{ maxWidth: "60px" }}
                        label="Age"
                        className={classes.textField}
                    />
                    <FormControl
                        variant="filled"
                        className={classes.formControl}
                        style={{
                            marginLeft: 20,
                        }}
                    >
                        <InputLabel htmlFor="filled-gender-native-simple">
                            Gender
                        </InputLabel>
                        <Select
                            native
                            value={state.gender}
                            onChange={handleChange}
                            inputProps={{
                                name: "gender",
                                id: "filled-gender-native-simple",
                            }}
                        >
                            <option aria-label="" value="" />
                            <option>Male</option>
                            <option>Female</option>
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="filled"
                        className={classes.formControl}
                        style={{
                            marginLeft: 20,
                        }}
                    >
                        <InputLabel htmlFor="filled-city-native-simple">
                            City
                        </InputLabel>
                        <Select
                            native
                            value={state.city}
                            onChange={handleChange}
                            inputProps={{
                                name: "city",
                                id: "filled-city-native-simple",
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option>Ankara</option>
                            <option>Istanbul</option>
                            <option>Izmir</option>
                            <option>Konya</option>
                            <option>Trabzon</option>
                            <option>Bodrum</option>
                            <option>Antalya</option>
                            <option>Bursa</option>
                            <option>Other</option>
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="filled"
                        className={classes.formControl}
                    >
                        <InputLabel htmlFor="filled-status-native-simple">
                            Status
                        </InputLabel>
                        <Select
                            native
                            value={state.status}
                            onChange={handleChange}
                            inputProps={{
                                name: "status",
                                id: "filled-status-native-simple",
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option>Single</option>
                            <option>Married</option>
                        </Select>
                    </FormControl>
                    <TextField
                        type="password"
                        name="password"
                        variant="filled"
                        noValidate
                        autoComplete="off"
                        label="New Password"
                        className={classes.textField}
                        style={{ maxWidth: 180, marginLeft: 20 }}
                    />
                    <NfRedButton
                        type="submit"
                        fullWidth
                        style={{ marginTop: "24px", minHeight: "48px" }}
                    >
                        Save and Continue
                    </NfRedButton>
                </form>

                <br />
            </Container>
        </div>
    );
}
