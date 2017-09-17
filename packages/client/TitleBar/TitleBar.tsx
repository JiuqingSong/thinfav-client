import * as React from 'react';
import Modules, { Module, VersionInfo } from './Module';
import TitleBarTab from './TitleBarTab';
import TitleBarButton, { TitleBarButtonProp } from './TitleBarButton';
import ModalDialog, { ModalDialogButton } from '../modalDialog/ModalDialog';

let styles = require('client/titleBar/TitleBar.scss');

export interface TitleBarProps {
    modules: Modules;
    versionInfo: VersionInfo;
    buttons?: TitleBarButtonProp[];
}

export interface TitleBarState {
    showingAbout: boolean;
}

class TitleBar extends React.Component<TitleBarProps, TitleBarState> {
    constructor(props: TitleBarProps) {
        super(props);
        this.state = {
            showingAbout: false,
        };
    }

    private showAbout = () => {
        this.setState({
            showingAbout: true,
        });
    };

    render() {
        let button: ModalDialogButton = {
            text: '确定',
            onClick: () => {
                this.setState({ showingAbout: false });
            },
        };
        let version = this.props.versionInfo;
        return (
            <div className={styles.titleBar}>
                <div className={styles.titleBarText}>
                    {this.props.modules.title}
                </div>
                <div className={styles.titleBarLinks}>
                    <a href="#" onClick={this.showAbout}>
                        关于
                    </a>
                </div>
                {this.props.buttons &&
                    this.props.buttons.length &&
                    <div className={styles.titleBarToolbar}>
                        {this.props.buttons.map(b => <TitleBarButton key={b.text} button={b} />)}
                    </div>}
                <div className={styles.titleBarTabs}>
                    {this.props.modules.modules.map((m: Module) =>
                        <TitleBarTab key={m.displayName} module={m} />
                    )}
                </div>
                {this.state.showingAbout &&
                    <ModalDialog buttons={[button]}>
                        <div className={styles.aboutLine1}>
                            {version.author}
                        </div>
                        <div className={styles.aboutLine2}>
                            {version.title}
                        </div>
                        <div className={styles.aboutLine3}>
                            版本：{version.major}.{version.minor}.{version.year}
                            {version.month}
                            {version.day}
                        </div>
                        {version.location &&
                            <div className={styles.aboutLine3}>
                                于{version.location}
                            </div>}
                    </ModalDialog>}
            </div>
        );
    }
}

export default TitleBar;
