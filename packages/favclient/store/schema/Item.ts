import { DragAndDropProps } from 'client/dragAndDrop/DragAndDropManager';

interface Item extends DragAndDropProps {
    id: string;
    displayName: string;
    checked: boolean;
    url: string;
}

export default Item;
