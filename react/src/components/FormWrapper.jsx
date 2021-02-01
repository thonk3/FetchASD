import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Container, Paper, Typography
} from '@material-ui/core';

const FormWrapper = (props) => {
    const {
        children,
        icon: Icon,    // element type
        title,
        maxWidth,

    } = props;

    return (
        <Container maxWidth={maxWidth}>
            <div>
                <Paper>
                    {/* title */}
                    <Avatar><Icon /></Avatar>
                    <Typography componen="h1" variant="h4">
                        { title }
                    </Typography>

                    {/* form */}
                    <form onSubmit={maxWidth}>
                        {children}
                    </form>

                </Paper>
            </div>
        </Container>

    );
}

export default FormWrapper;
