import { DragAndDropProps } from 'client/DragAndDrop/DragAndDropManager';
import Item from './Item';

interface Group extends DragAndDropProps {
    id: string;
    displayName: string;
    isOpened: boolean;
    columnId: number;
    items: Item[];
}

export default Group;
