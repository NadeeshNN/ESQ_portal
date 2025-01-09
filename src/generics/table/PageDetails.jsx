/*
    PAGE DETAILS
    -------------
    Harrison Feldman    Jan 2020


    Includes the paginated buttons as well as the page info.

    PROPS
    --------------
     IF USING EXPORT
      tableName - the name of the table for file exporting.
      rows - the tables data
      excelStrongFormats
    ELSE
      datalength - amount of rows

      pageSize - the amount of items per page
      currentPage - the current page of the table
      onChange(newPage) - the function called when a paginated button is pressed. Returns the newly requested page.
 */

import React, { Component } from 'react';

import PaginatedButtons from './PaginatedButtons';
import ItemsOnPage from './ItemsOnPage';
import ExcelExport from './ExcelExport';
import { isMobileOnly } from 'react-device-detect';




export default class PageDetails extends React.Component {


    render() {
        if (!this.props.rows && !this.props.datalength) { return (<div></div>); }
        const length = this.props.rows ? this.props.rows.length : this.props.datalength

        return (
            <section className="between">
                <PaginatedButtons
                    rowlength={length}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    changePage={(newPage) => {
                        this.props.onChange(newPage);
                    }}
                />
                <section>
                    <article>
                        {!isMobileOnly &&
                            <ItemsOnPage
                                rowlength={length}
                                pageSize={this.props.pageSize}
                                currentPage={this.props.currentPage}
                            />
                        }
                    </article>

                    {this.props.tableName && this.props.rows.length > 0 && 
                        <ExcelExport
                            strongFormat={this.props.excelStrongFormats}
                            rows={this.props.rows}
                            tableName={this.props.tableName}
                        />
                    }
                </section>
            </section>
        );
    }
}