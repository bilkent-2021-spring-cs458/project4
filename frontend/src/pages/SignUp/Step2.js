import {
    Container,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import NfRedButton from "~/components/NfRedButton";
import checkmarkImg from "~/assets/Checkmark.png";

const useStyles = makeStyles({
    checkmarkLogo: {
        maxWidth: "13%",
    },
});

export default function Step2({ classes }) {
    const history = useHistory();
    const myClasses = useStyles();
    return (
        <Container maxWidth="xs" className={classes.centerContent}>
            <img
                src={checkmarkImg}
                className={classes.stepLogo + " " + myClasses.checkmarkLogo}
            />
            <br />
            <span className={classes.stepIndicator}>
                STEP <b>2</b> OF <b>3</b>
            </span>
            <Typography variant="h1" className={classes.stepTitle}>
                Choose your plan.
            </Typography>

            <List className={classes.contextBody}>
                <ListItem>
                    <ListItemIcon>
                        <Check style={{ color: "#e50914" }} />
                    </ListItemIcon>
                    <ListItemText primary="No commitments, cancel anytime." />
                </ListItem>
                <ListItem style={{ paddingTop: "0" }}>
                    <ListItemIcon>
                        <Check style={{ color: "#e50914" }} />
                    </ListItemIcon>
                    <ListItemText primary="Everything on Netflix for one low price." />
                </ListItem>
                <ListItem style={{ paddingTop: "0" }}>
                    <ListItemIcon>
                        <Check style={{ color: "#e50914" }} />
                    </ListItemIcon>
                    <ListItemText primary="Unlimited viewing on all your devices." />
                </ListItem>
            </List>

            <NfRedButton
                fullWidth
                style={{ marginTop: "24px", minHeight: "48px" }}
                onClick={() => history.push("/signup/planform")}
            >
                See the Plans
            </NfRedButton>
        </Container>
    );
}

Step2.propTypes = {
    classes: PropTypes.object.isRequired,
};
