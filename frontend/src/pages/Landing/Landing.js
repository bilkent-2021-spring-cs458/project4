import { AppBar, Box, Container, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import logo from "~/assets/logo.svg";
import backgroundImg from "~/assets/background.jpg";
import NfRedButton from "~/components/NfRedButton";
import { signout } from "~/service/Service";
import { getLocalStorage } from "~/service/LocalStorageWithExpiry";
import LandingSignUpForm from "./LandingSignUpForm";
import LandingUserDetails from "./LandingUserDetails";

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
        height: "64px",
        padding: "25px",
    },
    logoBox: {
        display: "flex",
        flexGrow: 1,
    },
    centerForm: {
        padding: "150px 50px 0",
    },
    textField: {
        "& .MuiFormHelperText-root": {
            color: "#ffa00a",
            fontSize: "15px",
        },
    },
});

export default function Landing() {
    const history = useHistory();
    const classes = useStyles();
    const isSignedIn = getLocalStorage("isSignedIn");
    return (
        <div className={classes.paper}>
            <AppBar position="static" className={classes.header}>
                <Toolbar>
                    <Box className={classes.logoBox}>
                        <img height="36" src={logo} alt="logo" />
                    </Box>
                    {isSignedIn ? (
                        <NfRedButton
                            onClick={() => {
                                signout().then(
                                    () => (window.location.href = "/")
                                );
                            }}
                        >
                            Sign out
                        </NfRedButton>
                    ) : (
                        <NfRedButton onClick={() => history.push("/signin")}>
                            Sign In
                        </NfRedButton>
                    )}
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" className={classes.centerForm}>
                {isSignedIn ? <LandingUserDetails /> : <LandingSignUpForm />}
            </Container>
        </div>
    );
}
