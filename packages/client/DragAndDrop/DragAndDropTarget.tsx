import * as React from 'react';
import DragAndDropManager from './DragAndDropManager';
import observer from '../Flux/observer';

export interface DragAndDropTargetProps {
    className?: string;
    data?: any;
    manager: DragAndDropManager;
}

@observer
class DragAndDropTarget extends React.Component<DragAndDropTargetProps, {}> {
    render() {
        let classNames = (this.props.className || "") + " dragTarget";
        return (
            <div className={classNames}>
                { this.props.children }
            </div>);
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