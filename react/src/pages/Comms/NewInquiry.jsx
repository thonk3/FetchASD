/* 
    this be the form for new messages
    reusable for loggedin not loggedin
*/

import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/spinner/Spinner';
import { Container, Paper, Typography, Box, Button, TextField } from '@material-ui/core';

import { useAuth } from '../../contexts/authContext';
import token from '../../utils/tokenUtils';

const CommsContainer = (props) => {
    // set id if logged in
    // const { loggedIn } = useAuth();
    const id = useAuth().loggedIn ? token.getID() : "";

    // state hooks
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");

    const [ loading, setLoading ] = useState(false);

    // form change
    const handleTitle = (e) => setTitle(e.target.value);
    const handleContent = (e) => setContent(e.target.value);

    function referer() {
        if(props.location.state === undefined)
            return '/'
        return props.location.state.referer;
    }

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
                    window.location = referer(); // redirect to previous page
            })
            .catch(e => console.log(e));
    }
    
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

                    {
                        loading ? 
                        <Spinner />
                        :
                        <Box display='flex' justifyContent='center' style={{ margin: 20 }}>
                            <Button style={{ width: '20%', marginRight: 5 }} variant="contained" color="secondary" onClick={() => window.location = referer()}>Cancel</Button>
                            <Button style={{ width: '20%', marginLeft: 5 }} variant="contained" color="primary" type="submit">Submit</Button>
                        </Box>
                    }
                    {/* submit button */}

                </form>
            </Paper>
        </Container>
    )
};


export default CommsContainer;