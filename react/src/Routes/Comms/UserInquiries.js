/* 
    page to view list of inquiries of one user
    user can view the details of their past enquiries
    user can also chose to delete their own messages
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import token from '../../Helpers/token';
import { Button } from '@material-ui/core';
import Spinner from '../../Common/Spinner/Spinner';

// ok deffinitely need redirect??

const UserInquiries = props => {
    const [ msgList, setMsgList ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    // load msg list
    useEffect(() => {
        setLoading(true);
        axios.get('/api/msg/user', { senderID: token().id })
            .then(res => {
                setMsgList(res.data);
                console.log(res.data);
            }).catch(error => console.log("error"));
        setLoading(false);
    }, []);

    // render msg list
    const renderList = () => {
        if(msgList.length === 0) return <h3>No msg</h3>

        return msgList.map(li => <li key={li._id}>Date: {li.sentOn} - Title: {li.msgTitle} </li>)
    }

    return (
        <>
            <p>My Inqquiries</p>

            <Button onClick={() => window.location = '/newmsg'}> new inquiry </Button>
            {
                loading ?
                <Spinner />
                :
                <ul>  {renderList()} </ul>
            }
        </>
    )
}

export default UserInquiries;
