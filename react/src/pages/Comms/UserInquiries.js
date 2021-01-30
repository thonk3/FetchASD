/* 
    page to view list of inquiries of one user
    user can view the details of their past enquiries
    user can also chose to delete their own messages
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import token from '../../utils/token';
import { Link } from 'react-router-dom'

import MsgItem from './Components/MsgItem'
import { Button, Paper, Tabs, Tab, Container } from '@material-ui/core';
import Spinner from '../../components/Spinner/Spinner';

// ok deffinitely need redirect??

const UserInquiries = props => {
    const { admin } = props;

    const [ msgList, setMsgList ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ tabVal, setTabVal ] = useState(0);
    
    // lists and sorting
    const filterResolved = (flag) => {
        if (flag) return msgList.filter(obj => obj.status === "resolved");
        else return msgList.filter(obj => obj.status !== "resolved");
    }
    // load msg list
    useEffect(() => {
        let api = admin ? '/api/msg/' : '/api/msg/user'
        axios.post(api, { senderID: token().id })
            .then(res => setMsgList(res.data.list))
            .catch(error => console.log("error", error))
            .then(() => setLoading(false));
    }, [admin]);

    // handle tab change
    const handleTabChange = (e, val) => setTabVal(val);

    // render msg list
    const renderList = (list) => {
        if(loading) return <Spinner />
        if(list.length === 0) return <h3>No Messages Found</h3>
        else return list.map(item => <MsgItem key={item._id} item={item} admin={admin} /> )
    }

    // tabpannel
    const TabPanel = props => {
        const { children, value, index } = props;
        return (
            value === index && <Container maxWidth="md">{children}</Container>
        )
    }

    return (
        <>
            <Paper>
                <Tabs
                    value={tabVal} onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary" centered
                >
                    <Tab label="Pending" />
                    <Tab label="Resolved" />
                </Tabs>
            </Paper>
            
            {
                admin ?
                <></>
                :
                <Container maxWidth="md">
                    <Link to='/newmsg' style={{ textDecoration: 'none' }}>
                        <Button style={{ marginLeft: 20, marginTop: 20 }} variant="contained" color="primary">New Inquiry</Button>
                    </Link>
                </Container>
            }


            {/* new , read */}
            <TabPanel value={tabVal} index={0}>
                <ul> { renderList(filterResolved(false)) } </ul>
            </TabPanel>

            {/* resolved */}
            <TabPanel value={tabVal} index={1}>
                <ul> { renderList(filterResolved(true)) } </ul>
            </TabPanel>

        </>
    )
}

export default UserInquiries;
