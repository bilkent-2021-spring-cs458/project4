import React from "react";
import { Hidden, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Dropdown, Form, Modal, Button, Col, Row } from "react-bootstrap";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { useHistory } from "react-router-dom";

import {
    getUserDetails,
    getUserSymptoms,
    addNewSymptom,
    signout,
} from "~/service/Service";
import "bootstrap/dist/css/bootstrap.min.css";
const useStyles = makeStyles({
    mainDiv: {
        background: "linear-gradient(to right, #E2E2E2, #C9D6FF)",
        padding: "2% 10%",
        overflow: "hidden",
    },
    panel: {
        overflow: "hidden",
        background: "rgba( 255, 255, 255, 0.40 )",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        borderRadius: "10px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
        padding: "3%",
        marginBottom: "5%",
    },
    label: {
        display: "inline-block",
        marginBottom: ".5rem",
    },
});

const limits = {
    lowestTemp: 35,
    highestTemp: 45,
    normalityLimit: 37,
    scaleLimit: 6,
    lowestSp: 0,
    highestSp: 100,
    spLimit: 95,
};

export default function Home() {
    const history = useHistory();
    const [userDetails, setUserDetails] = useState({ loading: "Loading..." });
    const [userSymptoms, updateSypmtoms] = useState({ loading: "Loading..." });
    const [component, setComponent] = useState("");
    const [value, setValue] = useState("");
    const [date, setDate] = useState();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const symptoms = [
        "Fever",
        "SpO2",
        "Cough",
        "Shortness of breath",
        "tiredness",
    ];
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

        updateShownSymptoms();
    }, []);

    const updateShownSymptoms = function () {
        getUserSymptoms()
            .then((response) => {
                updateSypmtoms(response.data);
            })
            .catch(() => {
                alert(
                    "An error occured while trying to get your user symptoms."
                );
            });
    };

    const handleClose = () => setShow(false);
    const handleLogout = () => {
        signout()
            .then(() => {
                history.push("/signup");
            })
            .catch(() => {
                alert("An error occured while trying to log out.");
            });
    };
    const addSymptom = () => {
        var valid = true;
        console.log(component, value);
        if (component === "" || value === null || value === "") {
            setShow(true);
            setMessage("Please fill all fields.");
            valid = false;
        }
        var val = parseInt(value);
        if (parseInt(value) === isNaN) {
            setShow(true);
            setMessage("Please enter a numeric value");
            valid = false;
        }
        if (component === "Fever") {
            if (val > limits.highestTemp || val < limits.lowestTemp) {
                setShow(true);
                setMessage("Please enter a valid temptrature");
                valid = false;
            }
            if (val > limits.normalityLimit) {
                setShow(true);
                setMessage("Value is higher than normal!");
                valid = true;
            }
        } else if (component == "Sp02") {
            if (val < limits.lowestSp || val > limits.highestSp) {
                setShow(true);
                setMessage("Please enter a valid temptrature");
                valid = false;
            }
            if (val < limits.spLimit) {
                setShow(true);
                setMessage("Value is lower than normal!");
                valid = true;
            }
        } else {
            if (val < 0 || val > 10) {
                setShow(true);
                setMessage("Please enter a valid value");
                valid = false;
            }
            if (val > limits.scaleLimit) {
                setShow(true);
                setMessage("Value is higher than normal!");
                valid = true;
            }
        }
        if (valid) {
            const componentSelected = (component) => {
                switch (component) {
                    case "Fever":
                        return "TEMPERATURE";
                    case "SpO2":
                        return "SPO2";
                    case "Shortness of breath":
                        return "SHORTNESS_OF_BREATH_SEVERITY";
                    case "Cough":
                        return "COUGH_SEVERITY";
                    case "tiredness":
                        return "TIREDNESS";
                    default:
                        return "Not selected";
                }
            };
            const selectedValue = parseInt(value);
            var sypmtom = {
                date: moment(date).format("YYYY-MM-DD"),
                type: componentSelected(component),
                value: selectedValue,
            };
            addNewSymptom(sypmtom).then(() => {
                updateShownSymptoms();
            });
        }
    };
    const classes = useStyles();
    return (
        <div className={classes.mainDiv}>
            <div className={classes.panel}>
                <h1>
                    {userDetails.loading || (
                        <>Welcome&nbsp; {userDetails.data.fullName}</>
                    )}
                </h1>
            </div>

            <div className={classes.panel}>
                <h2>Patient Information</h2>
                <div className="row">
                    <p className="col">
                        {userDetails.loading || (
                            <>Full Name: &nbsp; {userDetails.data.fullName}</>
                        )}
                    </p>
                    <p className="col">
                        {userDetails.loading || (
                            <>Age:&nbsp; {userDetails.data.age}</>
                        )}
                    </p>
                </div>
                <div className="row">
                    <p className="col">
                        {" "}
                        {userDetails.loading || (
                            <>City:&nbsp; {userDetails.data.city}</>
                        )}
                    </p>
                    <p className="col">
                        {userDetails.loading || (
                            <>District:&nbsp; {userDetails.data.district}</>
                        )}
                    </p>
                </div>
                <div className="row">
                    <p className="col">
                        {userDetails.loading || (
                            <>Email: &nbsp; {userDetails.data.email}</>
                        )}
                    </p>
                    <p className="col">
                        {userDetails.loading || (
                            <>Gender: &nbsp; {userDetails.data.gender}</>
                        )}
                    </p>
                </div>
                <div className="row">
                    <p className="col">
                        {userDetails.loading || (
                            <>
                                Marital Status:&nbsp;{" "}
                                {userDetails.data.maritalStatus}
                            </>
                        )}
                    </p>
                </div>
            </div>
            <div className={classes.panel}>
                <h2>Symptoms</h2>
                {userSymptoms.loading ||
                    userSymptoms.data.map((item, index) => {
                        return (
                            <p key={index}>
                                Name: {item.type} Value: {item.value} Date:{" "}
                                {item.date}
                            </p>
                        );
                    })}

                <button
                    className="btn btn-primary "
                    style={{ float: "right" }}
                    onClick={() => history.push("/info")}
                >
                    Edit
                </button>
            </div>
            <div className={classes.panel}>
                <h2>Add Symptom</h2>
                <div>
                    <div className="row" style={{ marginBottom: "3%" }}>
                        <p className="label col-2">Symptom</p>
                        <Dropdown
                            className="col"
                            style={{ width: "100%" }}
                            onSelect={function (evt, eventkey) {
                                setComponent(eventkey.target.innerHTML);
                            }}
                        >
                            <Dropdown.Toggle id="dropdown-basic">
                                {component === ""
                                    ? "Select Symptom"
                                    : component}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {symptoms.map((item, index) => {
                                    return (
                                        <Dropdown.Item key={index}>
                                            {item}
                                        </Dropdown.Item>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Form.Group
                        as={Row}
                        onChange={function (evt) {
                            setValue(evt.target.value);
                        }}
                    >
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Value" />
                        </Col>
                    </Form.Group>
                    <div className="row">
                        <p
                            className="label col-2"
                            style={{ marginTop: "16px", marginRight: "15px" }}
                        >
                            Date
                        </p>
                        <MuiPickersUtilsProvider
                            className="col edited"
                            utils={DateFnsUtils}
                        >
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                maxDate={new Date()}
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={date}
                                onChange={(date) => setDate(date)}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>

                <button
                    onClick={() => addSymptom()}
                    className="btn btn-primary "
                    style={{ float: "right" }}
                >
                    Add Symptom
                </button>
            </div>
            <div>
                <button
                    className="btn btn-primary "
                    style={{ float: "right" }}
                    onClick={handleLogout}
                >
                    Log Out
                </button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
