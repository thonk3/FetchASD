import React from 'react';
import PropTypes from 'prop-types';
import {
    Container, Paper, Typography
} from '@material-ui/core';

const FormWrapper = (props) => {
    const {
        avt: Avt,
        
    } = props;

    return (
        <Container>
            <div>
                <Paper>
                    {/* title */}
                    {/* add avatar for form?? */}
                    <Typography componen="h1" variant="h4">
                        { cheese }
                    </Typography>

                    {/* form */}
                    <form onSubmit={cheese}>
                        {children}
                    </form>

                </Paper>
            </div>
        </Container>

    );
}

export default FormWrapper;
