import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar, Box,
    Container, Paper, Typography
} from '@material-ui/core';
import useStyles from './Form.style';

/* 
    Generic wrapper for Forms

    or atleast i think its generic
*/

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
                    <Avatar className={classes.avatar}>
                        <Icon />    {/* ttle */}
                    </Avatar>
                    <Typography componen="h1" variant="h4">
                        {title}
                    </Typography>

                    <form onSubmit={onSubmit}>
                        {children}  {/* form */}
                    </form>
                </Paper>
            </Box>
        </Container>

    );
}

FormWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.elementType,
    title: PropTypes.string,
    maxWidth: PropTypes.string,
    onSubmit: PropTypes.func,
}

export default FormWrapper;
