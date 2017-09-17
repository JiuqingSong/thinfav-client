import Group from '../../store/schema/Group';
import favStore from '../../store/favStore';
import { Dialogs, DialogStatus } from '../../store/schema/FavStore';

function showGroupDialog(group: Group) {
    favStore.dialogs.editingGroup = group;
    favStore.dialogs.dialogStatus = DialogStatus.EditGroup;
}

export default showGroupDialog;