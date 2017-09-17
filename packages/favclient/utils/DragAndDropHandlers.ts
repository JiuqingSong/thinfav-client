import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Item from '../store/schema/Item';
import Group from '../store/schema/Group';
import { DragAndDropHandler } from 'client/DragAndDrop/DragAndDropManager';
import DragAndDropElement from 'client/DragAndDrop/DragAndDropElement';
import DragAndDropTarget from 'client/DragAndDrop/DragAndDropTarget';
import save from '../actions/save';
import moveGroup from '../actions/dragAndDrop/moveGroup';
import moveItem from '../actions/dragAndDrop/moveItem';
import setGroupFlying from '../actions/dragAndDrop/setGroupFlying';
import setItemFlying from '../actions/dragAndDrop/setItemFlying';

abstract class FavDragAndDropHandler implements DragAndDropHandler {
    protected changed = false;
    private favPane: React.Component<any, any>;

    constructor(favPane: React.Component<any, any>) {
        this.favPane = favPane;
    }

    getOffsetRoot() {
        return ReactDOM.findDOMNode(this.favPane) as HTMLElement;
    }

    dragFinish() {
        setGroupFlying(false);
        setItemFlying(false);

        if (this.changed) {
            this.changed = false;
            save();
        }
    }

    abstract dragStart(): void;
    abstract dragTo(element: DragAndDropElement, target: DragAndDropTarget, index: number): void;
}

class GroupDragAndDropHandler extends FavDragAndDropHandler {
    private columns: DragAndDropTarget[] = [];

    setColumn(columnId: number, column: DragAndDropTarget) {
        this.columns[columnId] = column;
    }

    dragStart() {
        setGroupFlying(true);
    }

    dragTo(element: DragAndDropElement, target: DragAndDropTarget, index: number) {
        let group = element.getData() as Group;
        let targetColumnId = this.columns.indexOf(target);
        if (moveGroup(group, targetColumnId, index)) {
            this.changed = true;
        }
    }
}

class ItemDragAndDropHandler extends FavDragAndDropHandler {
    dragStart() {
        setItemFlying(true);
    }

    dragTo(element: DragAndDropElement, target: DragAndDropTarget, index: number) {
        let item = element.getData() as Item;
        let targetGroup = target.getData() as Group;
        if (moveItem(item, targetGroup, index)) {
            this.changed = true;
        }
    }
}

export { FavDragAndDropHandler };
export { GroupDragAndDropHandler };
export { ItemDragAndDropHandler };