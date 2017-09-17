import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DragAndDropManager, { DragAndDropProps } from './DragAndDropManager';
import observer from '../flux/observer';

export interface DragAndDropElementProps {
    manager: DragAndDropManager;
    className?: string;
    data: DragAndDropProps;
}

let styles = require('client/dragAndDrop/DragAndDrop.scss');

@observer
class DragAndDropElement extends React.Component<DragAndDropElementProps, any> {
    render() {
        let classNames = this.props.className || '';

        if (this.props.data.isDragging) {
            classNames += ' ' + styles.isDragging;
        }

        return (
            <div className={classNames}>
                {this.props.children}
            </div>
        );
    }

    getData(): DragAndDropProps {
        return this.props.data;
    }

    startDrag(ev: React.MouseEvent<EventTarget>) {
        let classNames = this.props.className || '';
        classNames += ' ' + styles.isFlying;
        let innerHtml = (ReactDOM.findDOMNode(this) as HTMLElement).innerHTML;
        let flyingElement = (
            <div
                className={classNames}
                ref={this.props.manager.setFlyingDivRef}
                dangerouslySetInnerHTML={{ __html: innerHtml }}
            />
        );

        this.props.manager.startDrag(this, ev, flyingElement);
    }
}

export default DragAndDropElement;
