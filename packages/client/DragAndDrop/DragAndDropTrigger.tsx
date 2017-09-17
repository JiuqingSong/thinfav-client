import * as React from 'react';
import DragAndDropElement from './DragAndDropElement';
import observer from '../Flux/observer';

export interface DragAndDropTriggerProps {
    getDragAndDropElement: () => DragAndDropElement;
    className?: string;
}

@observer
class DragAndDropTrigger extends React.Component<DragAndDropTriggerProps, {}> {
    render() {
        let classNames = this.props.className || "";
        return (
            <div ref="div" onMouseDown={this.startDrag} className={classNames}>
                {this.props.children}
            </div>);
    }

    private startDrag = (ev: React.MouseEvent<EventTarget>) => {
        if (ev.button == 0 && ev.target == (this.refs["div"] as HTMLElement)) {
            let element = this.props.getDragAndDropElement();

            if (element) {
                element.startDrag(ev);
            }
        }
    }
}

export default DragAndDropTrigger;