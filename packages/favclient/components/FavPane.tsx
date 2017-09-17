import * as React from 'react';
import observer from 'client/Flux/observer';
import FavFlyings from './FavFlyings';
import FavColumn from './FavColumn';

import DragAndDropManager from 'client/DragAndDrop/DragAndDropManager';
import { GroupDragAndDropHandler, ItemDragAndDropHandler } from '../utils/DragAndDropHandlers';

import showItemDialog from '../actions/dialog/showItemDialog';
import getGroups from '../utils/getGroups';

@observer
class FavPane extends React.Component<{}, {}> {
    private groupDragAndDropManager: DragAndDropManager;
    private groupDragAndDropHandler: GroupDragAndDropHandler;
    private itemDragAndDropManager: DragAndDropManager;

    constructor() {
        super();
        this.groupDragAndDropManager = new DragAndDropManager(new GroupDragAndDropHandler(this));
        this.itemDragAndDropManager = new DragAndDropManager(new ItemDragAndDropHandler(this));
    }

    render() {
        let hasGroup = getGroups(0).length || getGroups(1).length || getGroups(2).length;
        return (
            <div className="favPane">
                {
                    hasGroup ?
                        [0, 1, 2].map(
                            columnId =>
                                <FavColumn
                                    key={columnId}
                                    columnId={columnId}
                                    groupDragAndDropManager={this.groupDragAndDropManager}
                                    itemDragAndDropManager={this.itemDragAndDropManager} />) :
                        < div className="addNewItemLink">
                            <a href="#" onClick={() => showItemDialog(null, null) }>点击这里开始添加收藏</a>
                        </div>
                }
                <FavFlyings
                    groupDragAndDropManager={this.groupDragAndDropManager}
                    itemDragAndDropManager={this.itemDragAndDropManager} />
            </div>);
    }
}

export default FavPane;