import Item from '../../store/schema/Item';
import save from '../save';

function editItem(item: Item, name: string, url: string, checked: boolean) {
    item.displayName = name;
    item.url = url;
    item.checked = checked;
    save();
}

export default editItem;
