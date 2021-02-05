import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import token from '../../utils/tokenUtils';

const AccountManContainer = (props) => {
    const ID = token.getID();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [suburb, setSuburb] = useState("");
    const [postcode, setPostcode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [errors, setErrors] = useState({});

    const [password, setPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

    // --------------------------------------------------------------------------------
    const onChangeFirstName = (e) => setFirstName(e.target.value);
    const onChangeLastName = (e) => setLastName(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePhoneNumber = (e) => setPhoneNumber(e.target.value);
    const onChangeSuburb = (e) => setSuburb(e.target.value);
    const onChangePostcode = (e) => setPostcode(e.target.value);

    // const onChange
    // --------------------------------------------------------------------------------

    const onChangeCurrentPassword = (e) => setCurrentPassword(e.target.value);
    const onChangeNewPassword = (e) => setNewPassword(e.target.value);
    const onChangeNewPassword2 = (e) => setNewPassword2(e.target.value);

    // --------------------------------------------------------------------------------
    const onSubmit = e => { // test this
        e.preventDefault();

        console.log(
            firstName, lastName, email, phoneNumber, suburb, postcode
        )
        // const updateUser = {
        //     firstName, lastName,
        //     email, phoneNumber,
        //     suburb, postcode
        // }

        // // disgusting
        // if (handleValidation()) {
        //     alert("Form Submitted")
        // } else {
        //     alert("Form has errors")
        //     return (0)
        // }

        // console.log(updateUser);
        // Axios.put('/api/users/' + ID, updateUser)
        //     .then(res => {
        //         console.log(res.data);
        //         window.location = '/myacc';
        //     })
        //     .catch((error) => {
        //         console.log(error.message);
        //     })
    }

    const onSubmitDelete = (e) => {
        // test this
        e.preventDefault();
        console.log("deleting user");

        // Axios.delete('/api/users/' + ID)
        //     .then(res => {
        //         console.log(res.data)
        //         localStorage.removeItem("tokens")
        //         window.location = '/';
        //     })
        //     .catch((error) => {
        //         console.log(error.message);
        //     })
    }

    const onSubmitPassword = async (e) => {
        // do this // what the fuck is this mess
        console.log("why is this 2 different calls");
        console.log("one is good");
        e.preventDefault();
        // let errors = {};
        // let formIsValid = true;
        // const data = {
        //     id: ID,
        //     currentPass: currentPassword
        // }
        // await Axios.post('/api/auth/checkPassword/' + ID, data)
        //     .then(() => formIsValid = true)
        //     .catch(err => {
        //         formIsValid = false;
        //         errors["password"] = "Incorrect Password";
        //         console.log("end");
        //         return;
        //     })
        //     .then(() => {
        //         if (newPassword !== newPassword2) {
        //             errors["passwords"] = "Passwords do not match";
        //             formIsValid = false;
        //         }
        //         console.log(formIsValid);
        //         setErrors(errors)
        //         if (formIsValid === false) return;
        //     });

        // console.log("changing");
        // const newPass = {
        //     id: ID,
        //     newPassword: newPassword,
        // }
        // await Axios.post('/api/auth/changePassword/' + ID, newPass)
        //     .then(res => {
        //         console.log(res.data)
        //         window.location = '/';
        //     })
        //     .catch((error) => console.log(error.message))
    }

    // yuck
    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;

        //first name validation
        if (!(firstName.match(/^[a-zA-Z]+$/))) {
            formIsValid = false;
            errors["firstName"] = "Only Letters";
        }
        //lastName validation
        if (!(lastName.match(/^[a-zA-Z]+$/))) {
            formIsValid = false;
            errors["lastName"] = "Only Letters";
        }
        //email validation
        //digust need change and fix
        if (!(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))) {
            formIsValid = false;
            errors["email"] = "Email is not valid";
        }
        //phoneNumber validation
        // if(!((phoneNumber.match(/^[0-9]+$/)) && phoneNumber.length === 10)){
        //     formIsValid=false;
        //     errors["phoneNumber"] = "Only Numbers";
        // }
        //suburb
        if (!(suburb.match(/^[0-9a-zA-Z\s]+$/))) {
            formIsValid = false;
            errors["suburb"] = "No Special Characters";
        }
        //postcode validation
        if (!((postcode.match(/^[0-9]+$/)) && postcode.length === 4)) {
            formIsValid = false;
            errors["postcode"] = "Only 4 Numbers";
        }

        setErrors(errors);
        return formIsValid;

    }
    // --------------------------------------------------------------------------------
    useEffect(() => {
        Axios.get('/api/users/' + ID)
            .then(res => {
                console.log(res.data);
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email);
                setPhoneNumber(res.data.phoneNumber);
                setPostcode(res.data.postcode);
                setSuburb(res.data.suburb);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, [])
    // --------------------------------------------------------------------------------
    let boxStyle = { display: "flex", margin: "1vw", justifyContent: "center" };
    let spanStyle = { color: "red", display: "flex", margin: "1vw", justifyContent: "center" };

    return <div className="updatingUser">
        <h1 align="center">Edit User Details</h1>
        <form onSubmit={onSubmit}>
            <Box style={boxStyle} ><TextField required style={{ width: "500px" }} variant="outlined" id="firstName" label="firstName" value={firstName} onChange={onChangeFirstName} /></Box>
            <span style={spanStyle}>{errors["firstName"]}</span>
            <Box style={boxStyle} ><TextField required style={{ width: "500px" }} variant="outlined" id="lastName" label="lastName" value={lastName} onChange={onChangeLastName} /></Box>
            <span style={spanStyle}>{errors["lastName"]}</span>
            <Box style={boxStyle} ><TextField required style={{ width: "500px" }} variant="outlined" id="email" label="email" value={email} onChange={onChangeEmail} /></Box>
            <span style={spanStyle}>{errors["email"]}</span>
            <Box style={boxStyle} ><TextField required style={{ width: "500px" }} variant="outlined" id="phoneNumber" label="phoneNumber" value={phoneNumber} onChange={onChangePhoneNumber} /></Box>
            <span style={spanStyle}>{errors["phoneNumber"]}</span>
            <Box style={boxStyle} ><TextField required style={{ width: "500px" }} variant="outlined" id="suburb" label="suburb" value={suburb} onChange={onChangeSuburb} /></Box>
            <span style={spanStyle}>{errors["suburb"]}</span>
            <Box style={boxStyle} ><TextField required style={{ width: "500px" }} variant="outlined" id="postcode" label="postcode" value={postcode} onChange={onChangePostcode} /></Box>
            <span style={spanStyle}>{errors["postcode"]}</span>
            <Box style={boxStyle} >
                <Button color="primary" variant="contained" type="submit">
                    Update User Details
                        </Button>
            </Box>
        </form>
        <form onSubmit={onSubmitDelete}>
            <Box style={boxStyle} >
                <Button color="secondary" variant="contained" type="submit">
                    Delete User
                        </Button>
            </Box>
        </form>
        <h4 align="center">Change Password</h4>
        <form onSubmit={onSubmitPassword}>
            <Box style={boxStyle} >
                <TextField required type="password" style={{ width: "500px" }} variant="outlined" id="CurrentPassword" label="Current Password" value={currentPassword} onChange={onChangeCurrentPassword} /></Box>
            <span style={spanStyle}>{errors["password"]}</span>
            <Box style={boxStyle} ><TextField required type="password" style={{ width: "500px" }} variant="outlined" id="New Password" label="New Password" value={newPassword} onChange={onChangeNewPassword} /></Box>
            <span style={spanStyle}>{errors["passwords"]}</span>
            <Box style={boxStyle} ><TextField required type="password" style={{ width: "500px" }} variant="outlined" id="Repeat Password" label="Repeat New Password" value={newPassword2} onChange={onChangeNewPassword2} /></Box>
            <span style={spanStyle}>{errors["passwords"]}</span>
            <Box style={boxStyle} >
                <Button color="primary" variant="contained" type="submit">
                    Change Password
                </Button>
            </Box>
        </form>
    </div>;
}

export default AccountManContainer;