import * as React from 'react';
import Group from '../store/schema/Group';
import observer from 'client/Flux/observer';
import FavGroup from './FavGroup';
import getGroups from '../utils/getGroups';
import DragAndDropTarget from 'client/DragAndDrop/DragAndDropTarget';
import DragAndDropManager from 'client/DragAndDrop/DragAndDropManager';
import { GroupDragAndDropHandler } from '../utils/DragAndDropHandlers';

export interface FavColumnProps {
    columnId: number;
    groupDragAndDropManager: DragAndDropManager;
    itemDragAndDropManager: DragAndDropManager;
};

@observer
class FavColumn extends React.Component<FavColumnProps, {}> {
    render() {
        let groups = getGroups(this.props.columnId);
        return (
            <DragAndDropTarget
                className="favColumn"
                manager={this.props.groupDragAndDropManager}
                ref={this.setColumnRef}>
                {
                    groups.map(this.renderGroup)
                }
            </DragAndDropTarget>);
    }

    private setColumnRef = (ref: DragAndDropTarget) => {
        let handler = this.props.groupDragAndDropManager.getHandler() as GroupDragAndDropHandler;
        handler.setColumn(this.props.columnId, ref);
    }

    private renderGroup = (group: Group) => {
        return <FavGroup
            key={group.id}
            groupDragAndDropManager={this.props.groupDragAndDropManager}
            itemDragAndDropManager={this.props.itemDragAndDropManager}
            group={group} />;
    }
}

export default FavColumn;