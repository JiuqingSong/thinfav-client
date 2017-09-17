import * as React from 'react';
import observer from 'client/Flux/observer';
import favStore from '../store/favStore';
import DragAndDropManager from 'client/DragAndDrop/DragAndDropManager';

export interface FavFlyingsProps {
    groupDragAndDropManager: DragAndDropManager;
    itemDragAndDropManager: DragAndDropManager;
}

@observer
class FavFlyings extends React.Component<FavFlyingsProps, {}> {
    render() {
        return <div>
            { favStore.dragAndDrop.hasFlyingGroup && this.props.groupDragAndDropManager.getFlyingElement() }
            { favStore.dragAndDrop.hasFlyingItem && this.props.itemDragAndDropManager.getFlyingElement() }
        </div>;
    }
}

export default FavFlyings;