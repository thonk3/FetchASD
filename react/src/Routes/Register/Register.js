import React, { useState } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

/* 
    TODO:
    - Display error messages from the payload
    - split these into logic / style components
*/

const Register = props => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [suburb, setSuburb] = useState();
    const [postcode, setpostcode] = useState();

    const [errors, setErrors] = useState({
        error: false,
        errList: [],
    });

    const onChangeFName = (e) =>  setFirstName(e.target.value);
    const onChangeLName = (e) =>  setLastName(e.target.value);
    const onChangeEmail = (e) =>  setEmail(e.target.value);
    const onChangePassword = (e) =>  setPassword(e.target.value);
    const onChangePhone = (e) =>  setPhoneNumber(e.target.value);
    const onChangeSuburb = (e) =>  setSuburb(e.target.value);
    const onChangePostcode = (e) =>  setpostcode(e.target.value);

    const [redirLogin, setRedirLogin] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        const payload = {
            firstName, lastName, email, password, phoneNumber, suburb, postcode
        }

        axios.post('/api/auth/register', payload)
            .then(res => {
                if(res.status === 200) {
                    setRedirLogin(true);
                } else {    // probably validation errors
                    console.log(res);
                }
            }).catch(error => {
                console.log("uhoh ");
                let list = [...error.response.data.error];

                console.log(list);
                setErrors({
                    error: true,
                    errList: errors.errList.push(...list),
                });

                console.log(typeof errors.errList);
                
                errors.errList.map(er => console.log(er.param, ' - ', er.msg))

            })
    }

    // const test = () => {
    //     console.log("HELLO?");
    //     if(errors.error) {
    //         return errors.errList.map(er => { return <li>{er.param} - {er.msg}</li>});
    //     }
    // }

    // redirect to login after sign in
    if(redirLogin) return <Redirect to='/login' />

    return (
        <div>
            <h1>NEW ACCOUNT PLES {errors.error.toString()}</h1>

            <form onSubmit={submit}>
                <TextBox label="FirstName" value={firstName} onChange={onChangeFName}/>
                <TextBox label="LastName" value={lastName} onChange={onChangeLName}/>
                <TextBox label="Email"  inputType="email" value={email} onChange={onChangeEmail}/>
                <TextBox label="Password" inputType="password" value={password} onChange={onChangePassword}/>
                <TextBox label="Phone" value={phoneNumber} onChange={onChangePhone}/>
                <TextBox label="Suburb" value={suburb} onChange={onChangeSuburb}/>
                <TextBox label="PostCode" value={postcode} onChange={onChangePostcode}/>


                <div className="form-group">
                    <input type="submit" value="Create Dog" />
                </div>
            </form>

            {/* <ul>
                {
                    test()
                }
            </ul> */}
        </div>
    );
};

// component for input boxes
const TextBox = props => {
    const { label, value, onChange, inputType } = props;

    const  type = inputType || "text";

    return (
        <div className="form-group">
            <label> {label}</label>
            <input type={type}
                required
                className="form-control"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}



export default Register;