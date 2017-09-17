import favStore from '../../store/favStore';
import { DialogStatus } from '../../store/schema/FavStore';

function closeDialog() {
    favStore.dialogs.editingGroup = null;
    favStore.dialogs.editingItem = null;
    favStore.dialogs.dialogStatus = DialogStatus.None;
}

export default closeDialog;
