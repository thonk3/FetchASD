import React from 'react'

import { Box, Button, Card, CardContent, Typography } from '@material-ui/core'
import Axios from 'axios';

const MsgItem = props => {
    const { item, admin } = props;

    const showDate = date => {
        return new Intl.DateTimeFormat("en-AU", {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }).format(new Date(date));
    }

    const handleDelete = () => {
        Axios.post('/api/msg/delete', { id: item._id })
            .then(() => window.location = '/inquiries');
    }

    const handleUpdate = () => {
        Axios.post('/api/msg/update', { id: item._id, status: "resolved" })
            .then(() => window.location = '/admin/messages');
    }

    return (
        <Card style={{ margin: 20 }} raised
            variant="outlined" key={item._id}
        >
            <CardContent>
                <Typography variant='h5'> {item.msgTitle} </Typography>
                <Typography variant='h6'> Sent on: {showDate(item.sentOn)}</Typography>
                <Typography variant='body2'>{item.content}</Typography>

                <Box style={{ marginTop: 5 }} >
                    { admin ?
                        item.status !== "resolved" ?
                            <Button onClick={handleUpdate} style={{ margin: 5 }} variant="contained" color="secondary">Mark Resolved</Button>
                            : <> </>
                        :
                        <Button onClick={handleDelete} style={{ margin: 5 }} variant="contained" color="secondary">Delete</Button>
                    }
                </Box>
            </CardContent>
        </Card>
    )
}

export default MsgItem;