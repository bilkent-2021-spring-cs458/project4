import {
    Box,
    Container,
    makeStyles,
    withStyles,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NfRedButton from "~/components/NfRedButton";
import NfValidatedTextField from "~/components/NfValidatedTextField";
import { validateEmail, validatePassword } from "~/validators";
import { signup } from "~/service/Service";
import {
    getLocalStorage,
    setLocalStorage,
} from "~/service/LocalStorageWithExpiry";

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
    link: {
        color: "blue",
        cursor: "pointer",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
});

const WhiteTypography = withStyles({
    root: {
        color: "white",
    },
})(Typography);

export default function SignUp() {
    const error = useState();
    const submit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        if (isEmailValid !== true || isPasswordValid !== true) {
            return;
        }

        setLocalStorage("email", email);
        signup({
            email,
            password,
        })
            .then(() => {
                window.location.href = "/info";
            })
            .catch((response) => {
                if (response.status == 409) {
                    alert("There already exists an account with that email");
                } else if (response.status == 400) {
                    alert("Error occured! Please check your input again!");
                } else {
                    alert("Unknown error occured!");
                }
            });
    };
    const [shouldValidate, setShouldValidate] = useState(false);

    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <Container maxWidth="xs" className={classes.centerForm}>
                <form onSubmit={submit}>
                    <WhiteTypography paragraph variant="h4">
                        <Box fontWeight="Bold" component="span">
                            Sign Up
                        </Box>
                    </WhiteTypography>

                    <WhiteTypography paragraph variant="h4"></WhiteTypography>

                    {error}

                    <NfValidatedTextField
                        type="email"
                        name="email"
                        fullWidth
                        label="Email"
                        required
                        className={classes.textField}
                        shouldValidate={shouldValidate}
                        initialValue={
                            getLocalStorage("email") ||
                            sessionStorage.getItem("email")
                        }
                    />
                    <NfValidatedTextField
                        type="password"
                        name="password"
                        fullWidth
                        label="Password"
                        required
                        className={classes.textField}
                        shouldValidate={shouldValidate}
                    />
                    <NfRedButton
                        type="submit"
                        fullWidth
                        style={{ marginTop: "24px", minHeight: "48px" }}
                        onClick={() => setShouldValidate(true)}
                    >
                        Sign Up
                    </NfRedButton>
                </form>

                <br />
                <div style={{ color: "#FFFFFF" }}>
                    Already have an account?&nbsp;
                    <Link to="/signin" className={classes.link}>
                        Sign in now
                    </Link>
                </div>
            </Container>
        </div>
    );
}
