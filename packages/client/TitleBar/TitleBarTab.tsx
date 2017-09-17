import * as React from 'react';
import { Module } from './Module';

let styles = require('client/titleBar/TitleBar.scss');

export interface TitleBarTabProps {
    module: Module;
}

class TitleBarTab extends React.Component<TitleBarTabProps, {}> {
    render() {
        let classNames = this.props.module.selected
            ? styles.titleBarTab + ' ' + styles.selected
            : styles.titleBarTab;
        return (
            <div className={classNames}>
                <a href={this.props.module.url}>
                    {this.props.module.displayName}
                </a>
            </div>
        );
    }
}

export default TitleBarTab;
