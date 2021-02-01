import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar, Box,
    Container, Paper, Typography
} from '@material-ui/core';
import useStyles from './Form.style';

const FormWrapper = (props) => {
    const classes = useStyles();

    const {
        children,
        icon: Icon,    // element type
        title, maxWidth,
        onSubmit,
    } = props;

    return (
        <Container maxWidth={maxWidth}>
            <Box className={classes.paper}>
                <Paper elevation={3} className={classes.innerPaper}>
                    {/* title */}
                    <Avatar className={classes.avatar}>
                        <Icon />
                    </Avatar>
                    <Typography componen="h1" variant="h4">
                        { title }
                    </Typography>

                    {/* form */}
                    <form onSubmit={onSubmit}>
                        {children}
                    </form>

                </Paper>
            </Box>
        </Container>

    );
}

export default FormWrapper;
