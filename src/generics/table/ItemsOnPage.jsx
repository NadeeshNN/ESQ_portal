/*
    ITEMS ON PAGE
    -------------
    Harrison Feldman    Dec 2019


    Shows the range of items on a given page of a table in reference to the total amount of items in the table.
    E.G Showing 7 - 14 of 38

    PROPS
    --------------
      rowlength - the size of the data of the table
      currentPage - the current page of the table
      pageSize - the amount of items per page
 */

import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import '../styles/generics.css';


export class ItemsOnPage extends Component {


    render() {
        if (isMobile) { return (<div></div>); }

        //FirstItem = last item on previous page + 1 (if there are no items return 0)
        let firstItem = (this.props.currentPage - 1) * this.props.pageSize + (this.props.rowlength > 0 ? 1 : 0);

        var lastItem = 0;
        if (this.props.currentPage * this.props.pageSize > this.props.rowlength) {//If this is the last page
            //Last item is the last item of the data
            lastItem = this.props.rowlength;
        }
        else {
            lastItem = this.props.currentPage * this.props.pageSize
        }

        return (
            <article className="selfCenter" id="pageDetails">
                {this.props.rowlength === 0 &&
                    <p className="smallTxt selfCenter">
                        No Data Found
                    </p>
                }
                {this.props.rowlength !== 0 &&
                    <p className="smallTxt selfCenter">
                        Showing {firstItem} - {lastItem} of {this.props.rowlength}
                    </p>
                }
            </article>
        );


    }
}

export default ItemsOnPage;