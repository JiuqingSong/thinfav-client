import Item from '../../store/schema/Item';
import findGroupByItem from '../../utils/findGroupByItem';
import save from '../save';

function deleteItem(item: Item) {
    let group = findGroupByItem(item);

    if (group) {
        let index = group.items.indexOf(item);
        group.items.splice(index, 1);
        save();
    }
}

export default deleteItem;
