/*
    PAGINATED BUTTONS
    -------------
    Harrison Feldman    Dec 2019


    The buttons below a paginated table, allowing movement through the pages.

    PROPS
    --------------
      rowlength - the tables data
      pageSize - the amount of items per page
      currentPage - the current page of the table
      changePage(newPage) - the function called when a paginated button is pressed. Returns the newly requested page.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, TextField } from '@material-ui/core';//Inputs
import { NavigateNext, NavigateBefore, SkipNext, SkipPrevious } from '@material-ui/icons';//Icons
import { DotsButton } from './DotsButton.jsx';
import { isMobile } from 'react-device-detect';
import { COLOURS } from "../Config";


const styles = theme => ({
    pageButton: {
        width: 30,
    },
    highButton: {
        width: 30,
        color: 'white',
    }
});

export class PaginatedButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: this.props.currentPage,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentPage !== this.props.currentPage) {
            this.setState({
                currentPage: this.props.currentPage,
            });
        }
        if (prevProps.rowlength !== this.props.rowlength) {
            this.props.changePage(1);
        }
    }
    //Dynamically creates the buttons for the page numbers
    createControls() {
        const { classes } = this.props;
        let controls = [];
        const pageCount = (this.props.rowlength > this.props.pageSize) ? Math.ceil(this.props.rowlength / this.props.pageSize) : 1;//Is there enough data to overflow the page? If not then pageCount is 1

        //Go to start
        controls.push(
            <Button key={controls.length}
                disabled={this.props.currentPage === 1}
                onClick={() => {
                    this.props.changePage(1);
                }}
                className={classes.pageButton}
            >
                <SkipPrevious />
            </Button>
        );

        //Back 1
        controls.push(
            <Button key={controls.length}
                disabled={this.props.currentPage === 1}
                onClick={() => {
                    this.props.changePage(this.props.currentPage - 1);
                }}
                className={classes.pageButton}
            >
                <NavigateBefore />
            </Button>
        );

        if (!isMobile) {
            if (pageCount <= 6) {//No need for dots
                for (let i = 1; i <= pageCount; i++) {
                    controls.push(
                        <Button key={controls.length}
                            value={i}
                            variant={this.props.currentPage === i ? "contained" : ""}
                            className={this.props.currentPage === i ? classes.highButton : classes.pageButton}
                            style={{
                                background: this.props.currentPage === i ? COLOURS[1] : "white",
                            }}
                            onClick={() => {
                                this.props.changePage(i);
                            }}
                        >
                            {i}
                        </Button>
                    );
                }
            }
            else if (this.props.currentPage <= 3) {//If at the start of the page buttons
                for (let i = 1; i <= 6; i++) {//For page 1 to 6
                    controls.push(
                        <Button key={controls.length}
                            value={i}
                            variant={this.props.currentPage === i ? "contained" : ""}
                            className={this.props.currentPage === i ? classes.highButton : classes.pageButton}
                            style={{
                                background: this.props.currentPage === i ? COLOURS[1] : "white",
                            }}
                            onClick={() => {
                                this.props.changePage(i);
                            }}
                        >
                            {i}
                        </Button>
                    );
                }
                //... More right
                controls.push(
                    <DotsButton key={controls.length} />
                );
            }
            else if (this.props.currentPage > pageCount - 3) {//If at the end of the page buttons

                //... More Left
                controls.push(
                    <DotsButton key={controls.length} />
                )
                for (let i = pageCount - 5; i <= pageCount; i++) {//6 buttons to the end of the page count
                    controls.push(
                        <Button key={controls.length}
                            value={i}
                            variant={this.props.currentPage === i ? "contained" : ""}
                            className={this.props.currentPage === i ? classes.highButton : classes.pageButton}
                            style={{
                                background: this.props.currentPage === i ? COLOURS[1] : "white",
                            }}
                            onClick={() => {
                                this.props.changePage(i);
                            }}
                        >
                            {i}
                        </Button>
                    );
                }
            }
            else if (this.props.currentPage > 3) {//If in the middle of the page buttons

                //... more left
                controls.push(
                    <DotsButton key={controls.length} />
                );

                //Button for each page
                for (let i = -2; i < 3; i++) {//From 2 pages before to 2 pages ahead
                    controls.push(
                        <Button key={controls.length}
                            value={this.props.currentPage + i}
                            variant={i === 0 ? "contained" : ""}
                            className={this.props.currentPage === this.props.currentPage + i ? classes.highButton : classes.pageButton}
                            style={{
                                background: i === 0 ? COLOURS[1] : "white",
                            }}
                            onClick={() => {
                                this.props.changePage(this.props.currentPage + i)
                            }}
                        >
                            {this.props.currentPage + i}
                        </Button>
                    );
                }

                //... more right
                controls.push(
                    <DotsButton key={controls.length} />
                );
            }
        }

        //Forward 1
        controls.push(
            <Button key={controls.length}
                disabled={this.props.currentPage >= pageCount}
                onClick={() => {
                    this.props.changePage(this.props.currentPage + 1);
                }}
                className={classes.pageButton}
            >
                <NavigateNext />
            </Button>
        );

        //Go to end
        controls.push(
            <Button key={controls.length + 1}
                disabled={this.props.currentPage >= pageCount}
                onClick={() => {
                    this.props.changePage(pageCount);
                }}
                className={classes.pageButton}
            >
                <SkipNext />
            </Button>
        );

        return controls;
    }

    render() {
        const pageCount = (this.props.rowlength > this.props.pageSize) ? Math.ceil(this.props.rowlength / this.props.pageSize) : 1;//Is there enough data to overflow the page? If not then pageCount is 1

        return (
            <div>
                <ButtonGroup >
                    {this.createControls()}
                </ButtonGroup>

                {isMobile &&
                    <TextField
                        style={{
                            marginLeft: 5,
                            width: 60,
                            border: '1px solid grey',
                            borderRadius: 5,
                            height: 36,
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                        value={this.state.currentPage}
                        type="number"

                        onChange={(event) => {
                            let val = event.target.value;
                            if (val === "") {
                                this.setState({ currentPage: "" });
                            } else if (val <= pageCount) {
                                this.props.changePage(val);
                            }
                        }}
                    />
                }
            </div>
        );

    }


}

PaginatedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaginatedButtons);