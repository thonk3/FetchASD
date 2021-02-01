import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core';


const TextBox = props => {
        const { label, value, onChange, inputType } = props;
    const  type = inputType || "text";

    return (
        <div className="form-group">

        <TextField 
            variant="outlined"
            margin="normal"
            required 
            // ill see if its needed to be a prop
            style={{ minWidth: "25rem"}}
            label={label}
            type={type}
            onChange={onChange}
            value={value}
        />

        </div>
    )
}

TextBox.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    inputType: PropTypes.string,
}

export default TextBox;