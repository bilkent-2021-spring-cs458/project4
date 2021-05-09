import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    makeStyles,
    Typography,
    withStyles,
} from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import NfRedButton from "~/components/NfRedButton";
import NfValidatedTextField from "~/components/NfValidatedTextField";
import { validateEmail } from "~/validators";
import { checkEmail } from "~/service/Service";

const useStyles = makeStyles({
    textField: {
        "& .MuiFormHelperText-root": {
            color: "#ffa00a",
            fontSize: "15px",
        },
    },
});

const WhiteTypography = withStyles({
    root: {
        color: "white",
    },
})(Typography);

export default function LandingSignUpForm() {
    const history = useHistory();
    const [shouldValidate, setShouldValidate] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    const dialogClosed = () => {
        history.push("/signin");
    };

    const submit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const isValid = validateEmail(email);
        if (isValid !== true) {
            return;
        }

        sessionStorage.setItem("email", email);
        checkEmail(email).then((response) => {
            if (response.data.info == "ACCOUNT_EXISTS") {
                setDialogOpen(true);
                return;
            }
            history.push("/signup/registration");
        });
    };

    const classes = useStyles();
    return (
        <form align="center" onSubmit={submit}>
            <WhiteTypography paragraph variant="h3" align="center">
                <Box fontWeight="Bold" component="span">
                    Unlimited movies, TV shows, and more.
                </Box>
            </WhiteTypography>
            <WhiteTypography paragraph variant="h5" align="center">
                Watch anywhere. Cancel anytime.
            </WhiteTypography>
            <WhiteTypography gutterBottom variant="h5" align="center">
                Ready to watch? Enter your email to create or restart your
                membership.
            </WhiteTypography>
            <NfValidatedTextField
                type="email"
                name="email"
                fullWidth
                label="Email address"
                required
                className={classes.textField}
                shouldValidate={shouldValidate}
                initialValue={sessionStorage.getItem("email")}
            />
            <br />
            <NfRedButton
                type="submit"
                endIcon={<ChevronRight />}
                style={{ minHeight: "40px" }}
                onClick={() => setShouldValidate(true)}
            >
                GET STARTED
            </NfRedButton>

            <Dialog
                open={dialogOpen}
                onClose={dialogClosed}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Welcome back! You already have an account. Enter your
                    password to sign in.
                </DialogTitle>
                <DialogActions>
                    <Button onClick={dialogClosed} color="primary">
                        Take me to the sign in page
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}
