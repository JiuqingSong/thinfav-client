import Item from '../../store/schema/Item';
import Group from '../../store/schema/Group';
import favStore from '../../store/favStore';
import { DialogStatus } from '../../store/schema/FavStore';

function showItemDialog(group: Group, item: Item) {
    favStore.dialogs.editingItem = item;
    favStore.dialogs.editingGroup = group;
    favStore.dialogs.dialogStatus = DialogStatus.EditItem;
}

export default showItemDialog;
