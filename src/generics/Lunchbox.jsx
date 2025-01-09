/*
    Lunchbox
    -------------
    Harrison Feldman    June 2020


    Contains multiple snackbars

    PROPS
    --------------
      openSnacks - array of ids of currently open snackbars 
      snacks: [
          {
            label,
            colour,
          }
      ]
      onClose={(id) => {
                        var openSnacks = this.state.openSnacks;
                        openSnacks.splice(id, 1);
                        this.setState({ openSnacks: openSnacks });
                    }}
 */

import React, { Component } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';//Inputs
import { Alert } from 'reactstrap';

const styles = {
    container: {
        position: "fixed",
        top: 0,
        left: 0
    }
}

export class Lunchbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bump: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.openSnacks !== this.props.openSnacks) {
            this.setState({
                bump: !this.state.bump,
            });
        }
    }

    render() {
        const snacks = this.props.snacks;

        return (
            <article style={styles.container}>
                {this.props.openSnacks.map((snack, id) => (
                    <Snackbar
                        key={id}
                        open={true}
                        name={snack}
                        onClose={() => { this.props.onClose(id) }}
                        autoHideDuration={5000}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left"
                        }}
                    >
                        <Alert
                            onClose={() => { this.props.onClose(id) }}
                            style={{
                                backgroundColor: snacks[snack].colour,
                                color: 'white',
                                padding: 10,
                            }}
                        >
                            {snacks[snack].label}
                        </Alert>
                    </Snackbar >
                ))}
            </article>
        );

    }
}

export default (Lunchbox);