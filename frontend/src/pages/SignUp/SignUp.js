import {
    AppBar,
    Box,
    Container,
    Link,
    makeStyles,
    Toolbar,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Route, withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import logo from "~/assets/logo.svg";
import PlanForm from "./PlanForm";
import RegForm from "./RegForm";
import Registration from "./Registration";
import Step2 from "./Step2";
import "~/stylesheet/SignUp.css";
import { signout } from "~/service/Service";
import { getLocalStorage } from "~/service/LocalStorageWithExpiry";

const useStyles = makeStyles({
    header: {
        boxShadow: "none",
        background: "transparent",
        padding: "0 25px",
        borderBottom: "1px solid #e6e6e6",
    },
    logoBox: {
        display: "flex",
        flexGrow: 1,
    },
    headerLink: {
        color: "#333",
        fontWeight: 700,
        fontSize: "19px",
        lineHeight: "90px",
    },

    centerContent: {
        marginTop: "100px",
        textAlign: "center",
        paddingLeft: "53px",
        paddingRight: "53px",
    },
    stepLogo: {
        paddingBottom: "20px",
    },
    stepIndicator: {
        fontSize: "13px",
    },
    stepTitle: {
        fontWeight: "700",
        fontSize: "23px",
        margin: "0 0 .4em",
    },
    contextBody: {
        fontSize: "17px",
    },
    contextRow: {
        fontSize: "19px",
    },
    textField: {
        marginTop: "10px",
        "& .MuiFormHelperText-root": {
            color: "#b92d2b",
            fontSize: "13px",
        },
        "& .MuiInputBase-root.Mui-error": {
            border: "1px solid #b92d2b",
        },
    },
});

export default withRouter(function SignUp(props) {
    const routes = [
        {
            path: "/signup/registration",
            Component: Registration,
            ref: useRef(null),
        },
        {
            path: "/signup/regform",
            Component: RegForm,
            ref: useRef(null),
        },
        {
            path: "/signup",
            Component: Step2,
            ref: useRef(null),
        },
        {
            path: "/signup/planform",
            Component: PlanForm,
            ref: useRef(null),
        },
    ];

    const [isSignedIn, setSignedIn] = useState(getLocalStorage("isSignedIn"));
    useEffect(() => {
        setSignedIn(getLocalStorage("isSignedIn"));
    }, [props.location]);

    const classes = useStyles();
    return (
        <>
            <AppBar position="static" className={classes.header}>
                <Toolbar style={{ padding: 0 }}>
                    <Box className={classes.logoBox}>
                        <Link href="/" className={classes.headerLink}>
                            <img
                                align="center"
                                height="45"
                                src={logo}
                                alt="logo"
                            />
                        </Link>
                    </Box>

                    {isSignedIn ? (
                        <Link
                            href="#"
                            className={classes.headerLink}
                            onClick={() => {
                                signout().then(
                                    () => (window.location.href = "/")
                                );
                            }}
                        >
                            Sign Out
                        </Link>
                    ) : (
                        <Link href="/signin" className={classes.headerLink}>
                            Sign In
                        </Link>
                    )}
                </Toolbar>
            </AppBar>

            <Container style={{ paddingTop: 20 }}>
                {routes.map(({ path, Component, ref }) => (
                    <Route key={path} exact path={path}>
                        {({ match }) => (
                            <CSSTransition
                                nodeRef={ref}
                                in={match != null}
                                timeout={500}
                                classNames="transition"
                                unmountOnExit
                            >
                                <div className="transition" ref={ref}>
                                    <Component classes={classes} />
                                </div>
                            </CSSTransition>
                        )}
                    </Route>
                ))}
            </Container>
        </>
    );
});
