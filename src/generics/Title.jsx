/*
    TITLE
    -------------
    Harrison Feldman    June 2020


    The title of a module including its icon and any right side buttons

    PROPS
    --------------
      label - the title that is shown
      icon
      buttonLabel - the label that will be shown on the right side button. Leave empty to hide the button
      buttonVariant
      onBtnClick() - triggered when the right side button is clicked
 */


import React, { Component } from 'react';
import { ColourButton } from './ColourButton';
import { COLOURS } from './Config';
import { isEmpty } from './GeneralFunctions';

const styles = {
    icon: {
        marginRight: "7%",
        color: COLOURS[0]
    },
    label: {
        marginBottom: 0,
    }
};

export class Title extends Component {

    render() {
        return (
            <section className="between" id="titleModule">
                {/*Just the icon and label*/}
                <section className="itemsCenter" style={{ flexWrap: "nowrap" }}>
                    {this.props.icon &&

                        <div style={styles.icon}>
                            {this.props.icon}
                        </div>
                    }

                    <p className="largeTxt" style={styles.label}>
                        {this.props.label}
                    </p>
                </section>

                {/*Right side button*/}
                {!isEmpty(this.props.buttonLabel) &&
                    <div>
                        <ColourButton
                            text={this.props.buttonLabel}
                            variant={this.props.buttonVariant}
                            onClick={this.props.onBtnClick}
                        />
                    </div>
                }
            </section>
        );
    }
}

export default (Title);
