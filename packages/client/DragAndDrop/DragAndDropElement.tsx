import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DragAndDropManager, { DragAndDropProps } from './DragAndDropManager';
import observer from '../Flux/observer';

export interface DragAndDropElementProps {
    manager: DragAndDropManager;
    className?: string;
    data: DragAndDropProps;
}

@observer
class DragAndDropElement extends React.Component<DragAndDropElementProps, any> {
    render() {
        let classNames = this.props.className || "";

        if (this.props.data.isDragging) {
            classNames += " isDragging";
        }

        return (
            <div className={classNames}>
                {this.props.children}
            </div>);
    }

    getData(): DragAndDropProps {
        return this.props.data;
    }

    startDrag(ev: React.MouseEvent<EventTarget>) {
        let classNames = this.props.className || "";
        classNames += " isFlying";
        let innerHtml = (ReactDOM.findDOMNode(this) as HTMLElement).innerHTML;
        let flyingElement = (
            <div className={classNames} ref={this.props.manager.setFlyingDivRef} dangerouslySetInnerHTML={{__html: innerHtml}}>
            </div>);

        this.props.manager.startDrag(this, ev, flyingElement);
    }
}

export default DragAndDropElement;