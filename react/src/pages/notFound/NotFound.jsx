import React from 'react';

import { Box, Typography } from '@material-ui/core'

/* 
    Component for 404 page
    Page dont exist
*/
const NotFound = () => {
    return (
    <Box style={{ display: "flex", justifyContent: "center", margin: "4em" }}>
        <Typography variant="h2">404 NOT FOUND</Typography>
    </Box>
    )
}

export default NotFound;