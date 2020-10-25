import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Box, Container, Paper, TextField, Typography, Button } from '@material-ui/core';
import Spinner from '../../../../Common/Spinner/Spinner';
// import { Box } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';

const UserPage = props => {
    const id = props.match.params.id;

    // first, last, email, phone, sub, postcode
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [sub, setSub] = useState("");
    const [post, setPost] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/users/' + id)
            .then(res => {
                // set user data
                console.log(res.data);
                setFirst(res.data.firstName);
                setLast(res.data.lastName);
                setEmail(res.data.email);
                setPhone(res.data.phoneNumber);
                setSub(res.data.suburb);
                setPost(res.data.postcode);
            })
            .catch(error => console.log(error))
            .then(() => setLoading(false));
    }, [id])

    const changeFirst = e => setFirst(e.target.value);
    const changeLast = e => setLast(e.target.value);
    const changeEmail = e => setEmail(e.target.value);
    const changePhone = e => setPhone(e.target.value);
    const changeSub = e => setSub(e.target.value);
    const changePost = e => setPost(e.target.value);

    const redir = () => { window.location = '/admin/user_man'; }
    const handleUpdate = e => {
        e.preventDefault();

        const update = {
            firstName: first,
            lastName: last,
            email: email,
            phoneNumber: phone,
            suburb: sub,
            postcode: post,
        }

        axios.post("/api/users/"+id, update)
            .then(() => {
                setLoading(true);
                window.location='/admin/user_man'
            })
            .catch(error => console.log(error))
    }


    return (
        <Container style={{ marginTop: 20 }}>
            <Paper style={{ padding: 20 }}>
                <Typography variant="h3" style={{ margin: 20 }}>Update User</Typography>
                <br/>

                {
                    loading ?
                    <Spinner />
                    :
                    <form onSubmit={handleUpdate}>
                        <TextThing label="First Name" value={first} change={changeFirst} />
                        <TextThing label="Last Name" value={last} change={changeLast} />
                        <TextThing label="Email" value={email} change={changeEmail} />
                        <TextThing label="Phone" value={phone} change={changePhone} />
                        <TextThing label="Suburb" value={sub} change={changeSub} />
                        <TextThing label="Postcode" value={post} change={changePost} />

                        <Box display='flex' justifyContent='center' style={{ margin: 20 }}>
                            <Button style={{ width: '20%', marginRight: 5 }} variant="contained" color="secondary" onClick={redir}>Cancel</Button>
                            <Button style={{ width: '20%', marginLeft: 5 }} variant="contained" color="primary" type="submit">Update</Button>
                        </Box>
                    </form>
                }

            </Paper>
        </Container>
    )
}

const TextThing = props => {
    const { label, value, change } = props;
    
    return (
        <Box style={{ margin: 20 }}>
            <TextField required variant="outlined"
            label={label} value={value} onChange={change}
            style={{ width: '100%'}} />
        </Box>
    )
}

export default UserPage;
