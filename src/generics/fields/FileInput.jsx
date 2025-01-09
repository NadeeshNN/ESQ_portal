/*
    FILE INPUT
    -------------
    Harrison    July 2020


    An easier way to style input file fields

    PROPS
    --------------
      style - applied to the text
      icon
      onChange(file)
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { COLOURS } from "../Config.jsx";


const styles = theme => ({
    container: {
        position: "relative",
    },
    browse: {
        position: "absolute",
        textDecoration: "underline",
        cursor: "pointer",
        top: 0,
        left: 0,
        width: 105,
    },
    fileInput: {
        cursor: "pointer",
        position: "absolute",
        opacity: 0,
        zIndex: 2,
        top: 0,
        left: 0,
        width: 105,
        maxWidth: 105,
    },
    icon: {
        cursor: "pointer",
        width: 105,
        backgroundColor: COLOURS[1],
        borderRadius: 500,
        textAlign: "center",
        height: "100%",
    }
});

export class FileInput extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container} style={this.props.style}>
                {!this.props.icon &&
                    <p className={classes.browse} style={this.props.style}>Browse</p>
                }
                {this.props.icon &&
                    <div className={classes.icon} style={this.props.style}>
                        {this.props.icon}
                    </div>
                }
                <div style={this.props.style} className={classes.fileInput} >
                    <input type="file" onChange={this.props.onChange} style={this.props.style} className={classes.fileInput} />
                </div>
            </div>
        );
    }
}

FileInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileInput);