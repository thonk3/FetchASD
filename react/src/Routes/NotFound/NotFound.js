import React from 'react';

import { Box, Typography } from '@material-ui/core'


// for request to pages that doesnt exist
// 404 response

const NotFound = () => {
    return (
    <Box style={{ display: "flex", justifyContent: "center", margin: "4em" }}>
        <Typography variant="h2">404 NOT FOUND</Typography>
    </Box>
    )
}

export default NotFound;