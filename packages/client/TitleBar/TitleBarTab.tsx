import * as React from 'react';
import { Module } from './Module';

export interface TitleBarTabProps {
    module: Module;
}

class TitleBarTab extends React.Component<TitleBarTabProps, {}> {
    render() {
        let classNames = this.props.module.selected ? "titleBarTab selected" : "titleBarTab";
        return <div className={classNames}><a href={this.props.module.url}>{this.props.module.displayName}</a></div>;
    }
}

export default TitleBarTab;