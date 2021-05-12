import {
    Box,
    Container,
    makeStyles,
    withStyles,
    Typography,
    Checkbox,
    FormControlLabel,
    SvgIcon,
} from "@material-ui/core";
import { CheckBox as CheckBoxIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NfRedButton from "~/components/NfRedButton";
import NfValidatedTextField from "~/components/NfValidatedTextField";
import { signin } from "~/service/Service";
import { validateEmail, validatePassword } from "~/validators";
import { getLocalStorage } from "~/service/LocalStorageWithExpiry";

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
        backgroundColor: "#000000",
        borderRadius: "4px",
        color: "white",
        fontSize: "14px",
        padding: "10px 20px",
        marginBottom: "16px",
    },
    textField: {
        paddingBottom: "16px",
        "& .MuiFormHelperText-root": {
            color: "#000000",
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
    checkbox: {
        fontSize: "25px",
        color: "#FFFFFF",
        paddingRight: "0",
        "&:hover": {
            backgroundColor: "transparent !important",
        },
    },
    remember: {
        color: "#FFFFFF",
        flexGrow: 1,
        "& .MuiTypography-root": {
            fontSize: "13px",
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

export default function SignIn() {
    const isSignedIn = getLocalStorage("isSignedIn");
    if (isSignedIn) {
        window.location.href = "/";
    }

    const [shouldValidate, setShouldValidate] = useState(false);
    const submit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const remember = e.target.remember.checked;
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        if (isEmailValid !== true || isPasswordValid !== true) {
            return;
        }

        signin({ username: email, password }, remember)
            .then(() => (window.location.href = "/"))
            .catch((response) => {
                if (response.status == 401) {
                    alert("Incorrect email or password provided!");
                } else {
                    alert("Unknown error occured!");
                }
            });
    };

    const classes = useStyles();
    return (
        !isSignedIn && (
            <div className={classes.paper}>
                <Container maxWidth="xs" className={classes.centerForm}>
                    <form onSubmit={submit}>
                        <WhiteTypography paragraph variant="h4">
                            <Box fontWeight="Bold" component="span">
                                Sign In
                            </Box>
                        </WhiteTypography>

                        <WhiteTypography
                            paragraph
                            variant="h4"
                        ></WhiteTypography>

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
                            Sign In
                        </NfRedButton>

                        <div style={{ display: "flex" }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        disableRipple
                                        className={classes.checkbox}
                                        icon={
                                            <SvgIcon fontSize="inherit">
                                                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5" />
                                            </SvgIcon>
                                        }
                                        checkedIcon={
                                            <CheckBoxIcon fontSize="inherit" />
                                        }
                                        color="default"
                                        name="remember"
                                        defaultChecked
                                    />
                                }
                                className={classes.remember}
                                label="Remember me"
                            />
                        </div>
                    </form>

                    <br />
                    <div style={{ color: "#FFFFFF" }}>
                        Don&apos;t have an account yet?&nbsp;
                        <Link to="/signup" className={classes.link}>
                            Sign up now
                        </Link>
                    </div>
                </Container>
            </div>
        )
    );
}
