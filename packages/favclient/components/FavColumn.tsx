import * as React from 'react';
import Group from '../store/schema/Group';
import observer from 'client/flux/observer';
import FavGroup from './FavGroup';
import getGroups from '../utils/getGroups';
import DragAndDropTarget from 'client/dragAndDrop/DragAndDropTarget';
import DragAndDropManager from 'client/dragAndDrop/DragAndDropManager';
import { GroupDragAndDropHandler } from '../utils/DragAndDropHandlers';

let styles = require('favclient/favclient.scss');

export interface FavColumnProps {
    columnId: number;
    groupDragAndDropManager: DragAndDropManager;
    itemDragAndDropManager: DragAndDropManager;
}

@observer
class FavColumn extends React.Component<FavColumnProps, {}> {
    render() {
        let groups = getGroups(this.props.columnId);
        return (
            <DragAndDropTarget
                className={styles.favColumn}
                manager={this.props.groupDragAndDropManager}
                ref={this.setColumnRef}>
                {groups.map(this.renderGroup)}
            </DragAndDropTarget>
        );
    }

    private setColumnRef = (ref: DragAndDropTarget) => {
        let handler = this.props.groupDragAndDropManager.getHandler() as GroupDragAndDropHandler;
        handler.setColumn(this.props.columnId, ref);
    };

    private renderGroup = (group: Group) => {
        return (
            <FavGroup
                key={group.id}
                groupDragAndDropManager={this.props.groupDragAndDropManager}
                itemDragAndDropManager={this.props.itemDragAndDropManager}
                group={group}
            />
        );
    };
}

export default FavColumn;
