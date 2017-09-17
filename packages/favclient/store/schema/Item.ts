import { DragAndDropProps } from 'client/DragAndDrop/DragAndDropManager';

interface Item extends DragAndDropProps {
    id: string;
    displayName: string;
    checked: boolean;
    url: string;
}

export default Item;
