import {
    Container,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Check } from "@material-ui/icons";
import PropTypes from "prop-types";
import NfRedButton from "~/components/NfRedButton";
import { setPaymentPlan } from "~/service/Service";

const useStyles = makeStyles({
    table: {
        "& *": {
            fontSize: "16px",
        },
        "& .MuiSvgIcon-root": {
            fontSize: "30px",
        },
        "& .MuiTableCell-root:first-child": {
            width: "40% !important",
            color: "inherit",
            textAlign: "left",
        },
        "& .MuiTableCell-root": {
            width: "20%",
            color: "#a6a6a6",
            textAlign: "center",
            background: "white",
        },
        "& .PlanHeader": {
            backgroundColor: "#e50914",
            color: "white",
            width: "90px",
            lineHeight: "90px",
            margin: "auto",
            borderRadius: "2px",
            opacity: ".6",
            fontWeight: "700",
        },
        "& .PlanHeaderTriangle": {
            width: "20px",
            height: "20px",
            transform: "translate(35px, -12px) rotate(45deg)",
            backgroundColor: "#e50914",
            position: "absolute",
            display: "none",
        },
        "& .MuiTableRow-root:last-child *": {
            borderBottom: "none",
        },
        "&.SelectedPlan1 .MuiTableCell-root:nth-child(2), \
		&.SelectedPlan2 .MuiTableCell-root:nth-child(3), \
		&.SelectedPlan3 .MuiTableCell-root:nth-child(4)": {
            color: "#e50914",
            "& .PlanHeader": {
                opacity: "1",
                boxShadow: "0 0 3px 0 #e50914",
            },
            "& .PlanHeaderTriangle": {
                display: "block",
            },
        },
    },
});

export default function PlanForm({ classes }) {
    const [plan, setPlan] = useState(1);
    const submit = (e) => {
        e.preventDefault();
        setPaymentPlan({ plan })
            .then(() => {
                window.location.href = "/";
            })
            .catch(() => alert("Something went wrong!"));
    };

    const handleTableClick = (event) => {
        const target = event.target;
        if (!target || !target.classList) return;

        let parentCell = target;
        while (!parentCell.classList.contains("MuiTableCell-root")) {
            parentCell = parentCell.parentNode;
            if (!parentCell || !parentCell.classList) return;
        }

        const selectionIndex = [...parentCell.parentNode.children].indexOf(
            parentCell
        );
        if (selectionIndex > 0) {
            const table = parentCell.parentNode.parentNode.parentNode;
            table.classList.remove("SelectedPlan" + plan);
            table.classList.add("SelectedPlan" + selectionIndex);
            setPlan(selectionIndex);
        }
    };

    const myClasses = useStyles();
    return (
        <form>
            <Container maxWidth="md">
                <span className={classes.stepIndicator}>
                    STEP <b>2</b> OF <b>3</b>
                </span>
                <Typography variant="h1" className={classes.stepTitle}>
                    Choose the plan that’s right for you
                </Typography>
                <div className={classes.contextBody}>
                    Downgrade or upgrade at any time.
                </div>
                <br />

                <Table
                    id="plan-table"
                    className={myClasses.table + " SelectedPlan1"}
                    onClick={handleTableClick}
                    stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>
                                <div className="PlanHeader">
                                    Basic
                                    <div className="PlanHeaderTriangle" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="PlanHeader">
                                    Standard
                                    <div className="PlanHeaderTriangle" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="PlanHeader">
                                    Premium
                                    <div className="PlanHeaderTriangle" />
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Monthly price</TableCell>
                            <TableCell>17.99 TL</TableCell>
                            <TableCell>29.99 TL</TableCell>
                            <TableCell>41.99 TL</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Video quality</TableCell>
                            <TableCell>Good</TableCell>
                            <TableCell>Better</TableCell>
                            <TableCell>Best</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Resolution</TableCell>
                            <TableCell>480p</TableCell>
                            <TableCell>1080p</TableCell>
                            <TableCell>4K+HDR</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Screens you can watch on at the same time
                            </TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Watch on your TV, computer, mobile phone and
                                tablet
                            </TableCell>
                            <TableCell>
                                <Check />
                            </TableCell>
                            <TableCell>
                                <Check />
                            </TableCell>
                            <TableCell>
                                <Check />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Unlimited movies and TV shows</TableCell>
                            <TableCell>
                                <Check />
                            </TableCell>
                            <TableCell>
                                <Check />
                            </TableCell>
                            <TableCell>
                                <Check />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Cancel anytime</TableCell>
                            <TableCell>
                                <Check />
                            </TableCell>
                            <TableCell>
                                <Check />
                            </TableCell>
                            <TableCell>
                                <Check />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <br />
                <small style={{ color: "#737373" }}>
                    Full HD (1080p), Ultra HD (4K) and HDR availability subject
                    to your internet service and device capabilities. Not all
                    content available in HD, Full HD, Ultra HD or HDR. See Terms
                    of Use for more details.
                </small>
                <NfRedButton
                    style={{
                        marginTop: "24px",
                        minHeight: "48px",
                        width: "50%",
                        marginLeft: "25%",
                    }}
                    onClick={submit}
                >
                    Continue
                </NfRedButton>
            </Container>
        </form>
    );
}

PlanForm.propTypes = {
    classes: PropTypes.object.isRequired,
};
