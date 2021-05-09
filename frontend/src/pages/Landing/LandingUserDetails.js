import { makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getUserDetails } from "~/service/Service";
import NfRedButton from "~/components/NfRedButton";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    background: {
        background: "rgba(0, 0, 0, 0.75)",
        color: "white",
        fontWeight: "700",
        borderRadius: "30px",
        padding: "35px",
        margin: "auto",
    },
});

export default function LandingUserDetails() {
    const [userDetails, setUserDetails] = useState({ loading: "Loading..." });
    useEffect(() => {
        getUserDetails()
            .then((response) => {
                setUserDetails(response.data);
            })
            .catch(() => {
                alert(
                    "An error occured while trying to get your user details."
                );
            });
    }, []);

    const classes = useStyles();

    const history = useHistory();
    const renderPlan = (plan) => {
        switch (plan) {
            case 1:
                return "Basic";
            case 2:
                return "Standard";
            case 3:
                return "Premium";
            default:
                return "Not selected";
        }
    };

    return (
        <Typography
            paragraph
            variant="h5"
            component="div"
            className={classes.background}
        >
            You are currently signed in.
            <br />
            Your user details:
            <br />
            <br />
            {userDetails.loading || (
                <>
                    Email:&nbsp;
                    {userDetails.email}
                    <br />
                    Payment Plan:&nbsp;
                    {renderPlan(userDetails.plan)}
                    <br />
                    Receive Special Offers:&nbsp;
                    {userDetails.receive_offers.toString()}
                    <br />
                    <div style={{ textAlign: "center", paddingTop: "20px" }}>
                        <NfRedButton onClick={() => history.push("/signup")}>
                            Change Payment Plan
                        </NfRedButton>
                    </div>
                </>
            )}
        </Typography>
    );
}
