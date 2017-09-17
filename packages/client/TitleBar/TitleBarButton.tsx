import * as React from 'react';

let styles = require('client/titleBar/TitleBar.scss');

export interface TitleBarButtonProp {
    text: string;
    onClick: () => void;
}

export interface TitleBarButtonProps {
    button: TitleBarButtonProp;
}

class TitleBarButton extends React.Component<TitleBarButtonProps, {}> {
    render() {
        return (
            <div className={styles.titleBarButton}>
                <a onClick={this.props.button.onClick}>
                    {this.props.button.text}
                </a>
            </div>
        );
    }
}

export default TitleBarButton;
