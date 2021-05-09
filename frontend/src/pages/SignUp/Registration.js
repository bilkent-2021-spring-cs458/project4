import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import NfRedButton from "~/components/NfRedButton";
import devicesImg from "~/assets/Devices.png";

const useStyles = makeStyles({
    devicesLogo: {
        maxWidth: "75%",
    },
});

export default function Registration({ classes }) {
    const history = useHistory();
    const myClasses = useStyles();
    return (
        <Container maxWidth="xs" className={classes.centerContent}>
            <img
                src={devicesImg}
                className={classes.stepLogo + " " + myClasses.devicesLogo}
            />
            <br />
            <span className={classes.stepIndicator}>
                STEP <b>1</b> OF <b>3</b>
            </span>
            <Typography variant="h1" className={classes.stepTitle}>
                Finish setting up your account.
            </Typography>
            <div className={classes.contextBody}>
                Netflix is personalized for you. Create a password to watch
                Netflix on any device at any time.
            </div>
            <NfRedButton
                fullWidth
                style={{ marginTop: "24px", minHeight: "48px" }}
                onClick={() => history.push("/signup/regform")}
            >
                Continue
            </NfRedButton>
        </Container>
    );
}

Registration.propTypes = {
    classes: PropTypes.object.isRequired,
};
