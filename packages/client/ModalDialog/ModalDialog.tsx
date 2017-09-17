import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface ModalDialogButton {
    text: string;
    onClick: () => void;
}

export interface ModalDialogProps {
    buttons: ModalDialogButton[];
}

class ModalDialog extends React.Component<ModalDialogProps, {}> {
    private dialogDiv: HTMLDivElement;
    private dialogRoot: HTMLDivElement;
    private dialogMask: HTMLDivElement;

    render(): JSX.Element {
        return null;
    }

    componentDidMount() {
        window.addEventListener("resize", this.repositionDialog);
        this.dialogDiv = document.createElement("div");
        document.body.appendChild(this.dialogDiv);
        this.dialogMask = document.createElement("div");
        document.body.appendChild(this.dialogMask);
        this.dialogMask.className = "modalDialogMask";
        this.realRender();
        this.repositionDialog();
    }

    componentDidUpdate() {
        this.realRender();
        this.repositionDialog();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.repositionDialog);
        ReactDOM.unmountComponentAtNode(this.dialogDiv);
        document.body.removeChild(this.dialogDiv);
        document.body.removeChild(this.dialogMask);
    }

    private realRender() {
        this.dialogMask.style.display = this.props.children ? "block" : "none";
        let element = this.props.children ?
            (
                <div className="modalDialog" ref={ref => this.dialogRoot = ref}>
                    <div className="dialogBody">{this.props.children}</div>
                    <div className="dialogButtonPane">
                        {
                            this.props.buttons.map(button => <button key={button.text} className="modalDialogButton" onClick={button.onClick}>{button.text}</button>)
                        }
                    </div>
                </div>
            ) : null;

        if (element) {
            ReactDOM.render(element, this.dialogDiv);
        } else {
            ReactDOM.unmountComponentAtNode(this.dialogDiv);
        }
    }

    private repositionDialog = () => {
        if (this.dialogRoot) {
            let width = this.dialogRoot.offsetWidth;
            let height = this.dialogRoot.offsetHeight;
            let windowWidth = window.innerWidth;
            let windowHeight = window.innerHeight;
            let left = (windowWidth - width) / 2;
            let top = (windowHeight - height) / 2;
            this.dialogRoot.style.left = left + "px";
            this.dialogRoot.style.top = top + "px";
        }
    }
}

export default ModalDialog;