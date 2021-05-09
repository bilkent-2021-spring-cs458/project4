import {
    AppBar,
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
import logo from "~/assets/logo.svg";
import NfRedButton from "~/components/NfRedButton";
import NfValidatedTextField from "~/components/NfValidatedTextField";
import backgroundImg from "~/assets/background.jpg";
import { signin } from "~/service/Service";
import { validateEmail, validatePassword } from "~/validators";
import { getLocalStorage } from "~/service/LocalStorageWithExpiry";

const useStyles = makeStyles({
    paper: {
        backgroundImage: `linear-gradient(to top,
			rgba(0,0,0,.8) 0,
			rgba(0,0,0,.4) 60%,
			rgba(0,0,0,.8) 100%), url(${backgroundImg})`,
        height: 750,
    },
    header: {
        boxShadow: "none",
        background: "transparent",
        height: "90px",
        padding: "25px",
    },
    centerForm: {
        padding: "60px 68px 123px",
        background: "rgba(0, 0, 0, 0.75)",
    },
    uiMessage: {
        backgroundColor: "#e87c03",
        borderRadius: "4px",
        color: "white",
        fontSize: "14px",
        padding: "10px 20px",
        marginBottom: "16px",
    },
    textField: {
        paddingBottom: "16px",
        "& .MuiFormHelperText-root": {
            color: "#e87c03",
            fontSize: "13px",
        },
        "& .MuiInputBase-root": {
            backgroundColor: "rgb(51, 51, 51)",
            borderRadius: "4px",
            borderColor: "rgb(51, 51, 51)",
        },
        "& .MuiInputBase-input": {
            color: "white",
        },
        "& .MuiInputBase-root.Mui-focused": {
            backgroundColor: "rgb(69, 69, 69)",
            borderTopColor: "rgb(69, 69, 69)",
            borderLeftColor: "rgb(69, 69, 69)",
            borderRightColor: "rgb(69, 69, 69)",
        },
        "& .MuiInputBase-root.Mui-focused:not(.Mui-error)": {
            borderBottomColor: "rgb(69, 69, 69)",
        },
    },
    checkbox: {
        fontSize: "25px",
        color: "#737373",
        paddingRight: "0",
        "&:hover": {
            backgroundColor: "transparent !important",
        },
    },
    remember: {
        color: "#b3b3b3",
        flexGrow: 1,
        "& .MuiTypography-root": {
            fontSize: "13px",
        },
    },
    link: {
        color: "white",
        cursor: "pointer",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    help: {
        paddingTop: "10px",
        color: "#b3b3b3",
        fontSize: "13px",
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

    const [error, setError] = useState();
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

        signin({ email, password, remember })
            .then(() => (window.location.href = "/"))
            .catch((response) => {
                sessionStorage.setItem("email", email);
                setError(
                    <div className={classes.uiMessage}>
                        {response.data.error === "INCORRECT_PASSWORD" ? (
                            <>
                                Incorrect password. Please try again or you
                                can&nbsp;
                                <Link to="#" style={{ color: "inherit" }}>
                                    reset your password
                                </Link>
                                .
                            </>
                        ) : (
                            <>
                                Sorry, we can&apos;t find an account with this
                                email address. Please try again or&nbsp;
                                <Link to="/" style={{ color: "inherit" }}>
                                    create a new account
                                </Link>
                                .
                            </>
                        )}
                    </div>
                );
            });
    };

    const classes = useStyles();
    return (
        !isSignedIn && (
            <div className={classes.paper}>
                <AppBar position="static" className={classes.header}>
                    <Box>
                        <Link to="/">
                            <img height="44" src={logo} alt="logo" />
                        </Link>
                    </Box>
                </AppBar>

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
                            <a className={classes.link + " " + classes.help}>
                                Need help?
                            </a>
                        </div>
                    </form>

                    <br />
                    <div style={{ color: "#737373" }}>
                        New to Netflix?&nbsp;
                        <Link to="/" className={classes.link}>
                            Sign up now
                        </Link>
                    </div>
                </Container>
            </div>
        )
    );
}
