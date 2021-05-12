import React from "react";
import { Button, withStyles } from "@material-ui/core";

const StyledButton = withStyles({
    root: {
        textTransform: "none",
        background: "#004C99",
        color: "white",
        borderRadius: 3,
        paddingLeft: "1em",
        paddingRight: "1em",
        margin: 4,
        "&:hover": {
            background: "#0066CC",
        },
        "&:active": {
            background: "#004C99",
        },
        "&:focus": {
            outline: "none",
            border: "0.085em solid black",
            boxShadow: "0 0 0 0.085em white",
        },
    },
})(Button);

export default function NfRedButton(props) {
    return <StyledButton {...props} disableRipple />;
}
