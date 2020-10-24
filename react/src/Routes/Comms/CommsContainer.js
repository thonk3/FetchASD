/* 
    this be the form for new messages
    reusable for loggedin not loggedin
*/

import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../../Common/Spinner/Spinner';
import { Container, Paper, Typography, Box, Button, TextField } from '@material-ui/core';

import { useAuth } from '../../Context/authContext';
import token from '../../Helpers/token';

const CommsContainer = (props) => {
    // set id if logged in
    // const { loggedIn } = useAuth();
    const id = useAuth().loggedIn ? token().id : "";

    // state hooks
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");

    const [ loading, setLoading ] = useState(false);

    // form change
    const handleTitle = (e) => setTitle(e.target.value);
    const handleContent = (e) => setContent(e.target.value);

    // post form
    const submit = (e) => {
        e.preventDefault();

        const newMsg = {
            msgTitle: title,
            content: content,
            senderID: id,
        }

        setLoading(true);
        axios.post('/api/msg/new', newMsg)
            .then(res => {
                if(res.status === 200) 
                    window.location = '/'; // redirect to previous page
            })
            .catch(e => console.log(e));
    }

    // should redirect to previous page
    if (loading)  return <Spinner />
    
    // common style list
    // margin top 20
    // padding 20
    return (
        <Container maxWidth="md" style={{ marginTop: 20 }}>
            <Paper style={{ padding: 20 }}>
                <Typography variant="h2" style={{ margin: 20 }}>Create an Inquiry</Typography>
                
                <form onSubmit={submit}>
                    {/* msg title */}
                    <Box style={{ margin: 20 }} >
                    <TextField required
                        variant="outlined"
                        label="Title"
                        value={title} onChange={handleTitle}
                        style={{ width: '100%' }}
                    /> </Box>

                    <Box style={{ margin: 20 }} >
                    <TextField required 
                        variant="outlined"
                        label="Message Content"
                        value={content} onChange={handleContent} 
                        multiline rows={8}
                        style={{ width: '100%' }}
                    /> </Box>

                    {/* submit button */}
                    <Box display='flex' justifyContent='center' style={{ margin: 20 }}>
                        <Button style={{ width: '20%', marginRight: 5 }} variant="contained" color="secondary" onClick={() => window.location = '/events'}>Cancel</Button>
                        <Button style={{ width: '20%', marginLeft: 5 }} variant="contained" color="primary" type="submit">Submit</Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    )
};


export default CommsContainer;