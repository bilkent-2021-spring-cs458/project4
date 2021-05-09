import {
    Checkbox,
    Container,
    FormControlLabel,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import NfRedButton from "~/components/NfRedButton";
import NfValidatedTextField from "~/components/NfValidatedTextField";
import { validateEmail, validatePassword } from "~/validators";
import { signup } from "~/service/Service";
import {
    getLocalStorage,
    setLocalStorage,
} from "~/service/LocalStorageWithExpiry";

const useStyles = makeStyles({
    checkbox: {
        "&:hover": {
            backgroundColor: "transparent !important",
        },
    },
    email: {
        margin: "50px",
        textAlign: "center",
        fontSize: "19px",
        fontWeight: "700",
    },
});

export default function RegForm({ classes }) {
    const history = useHistory();
    const submit = (e) => {
        e.preventDefault();

        if (isSignedIn) {
            history.push("/signup");
            return;
        }

        const email = e.target.email.value;
        const password = e.target.password.value;
        const emailPreference = e.target.emailPreference.checked;
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        if (isEmailValid !== true || isPasswordValid !== true) {
            return;
        }

        setLocalStorage("email", email);
        signup({
            email,
            password,
            receive_offers: emailPreference,
        })
            .then(() => {
                history.push("/signup");
            })
            .catch(() => {
                alert("Some error occured");
            });
    };

    const isSignedIn = getLocalStorage("isSignedIn");
    const [shouldValidate, setShouldValidate] = useState(false);
    const myClasses = useStyles();
    return (
        <Container maxWidth="xs">
            <form onSubmit={submit}>
                {isSignedIn ? (
                    <>
                        <Typography variant="h1" className={classes.stepTitle}>
                            Account Created
                        </Typography>
                        <div className={classes.contextRow}>
                            Use this email to access your account:
                        </div>
                        <Typography variant="h1" className={myClasses.email}>
                            {getLocalStorage("email")}
                        </Typography>
                    </>
                ) : (
                    <>
                        <span className={classes.stepIndicator}>
                            STEP <b>1</b> OF <b>3</b>
                        </span>
                        <Typography variant="h1" className={classes.stepTitle}>
                            Create a password to start your membership.
                        </Typography>
                        <div className={classes.contextRow}>
                            Just a few more steps and you&apos;re done!
                            <br />
                            We hate paperwork, too.
                        </div>

                        <NfValidatedTextField
                            type="email"
                            name="email"
                            fullWidth
                            label="Email"
                            required
                            className={classes.textField}
                            shouldValidate={shouldValidate}
                            initialValue={sessionStorage.getItem("email")}
                        />
                        <NfValidatedTextField
                            type="password"
                            name="password"
                            fullWidth
                            label="Add a password"
                            required
                            className={classes.textField}
                            shouldValidate={shouldValidate}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    disableRipple
                                    icon={
                                        <CheckBoxOutlineBlank fontSize="large" />
                                    }
                                    checkedIcon={
                                        <CheckBoxOutlined
                                            fontSize="large"
                                            style={{ color: "#0071eb" }}
                                        />
                                    }
                                    className={myClasses.checkbox}
                                    name="emailPreference"
                                />
                            }
                            label="Please do not email me Netflix special offers."
                        />
                    </>
                )}
                <NfRedButton
                    type="submit"
                    fullWidth
                    style={{ marginTop: "24px", minHeight: "48px" }}
                    onClick={() => setShouldValidate(true)}
                >
                    Continue
                </NfRedButton>
            </form>
        </Container>
    );
}

RegForm.propTypes = {
    classes: PropTypes.object.isRequired,
};
