import Group from './Group';
import Item from './Item';

export enum DialogStatus {
    None,
    EditGroup,
    EditItem,
};

export interface DragAndDropStore {
    hasFlyingGroup: boolean;
    hasFlyingItem: boolean;
};

export interface Dialogs {
    dialogStatus: DialogStatus;
    editingGroup: Group;
    editingItem: Item;
}

interface FavStore {
    groups: Group[][];
    dragAndDrop: DragAndDropStore;
    dialogs: Dialogs;
};

export default FavStore;
