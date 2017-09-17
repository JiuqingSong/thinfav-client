import * as React from 'react';
import DragAndDropManager from './DragAndDropManager';
import observer from '../flux/observer';

export interface DragAndDropTargetProps {
    className?: string;
    data?: any;
    manager: DragAndDropManager;
}

let styles = require('client/dragAndDrop/DragAndDrop.scss');

@observer
class DragAndDropTarget extends React.Component<DragAndDropTargetProps, {}> {
    render() {
        let classNames = (this.props.className || '') + ' ' + styles.dragTarget;
        return (
            <div className={classNames}>
                {this.props.children}
            </div>
        );
    }

    getData() {
        return this.props.data;
    }

    componentDidMount() {
        this.props.manager.addTarget(this);
    }

    componentWillUnmount() {
        this.props.manager.removeTarget(this);
    }
}

export default DragAndDropTarget;
