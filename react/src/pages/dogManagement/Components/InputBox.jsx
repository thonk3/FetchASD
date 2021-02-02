import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

// InputBox component that is used by a few other components
class InputBox extends Component {
    render() {
        return (
            <Box style={{ display: "flex", justifyContent: "center", margin: "1vw" }}>
                <TextField
                    variant="outlined"
                    style={{width: "500px"}}
                    required={this.props.required}
                    value={this.props.value}
                    label={this.props.label}
                    onChange={this.props.onChange}
                />
            </Box>
        )
    }
}

export default InputBox;