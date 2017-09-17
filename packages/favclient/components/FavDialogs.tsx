import * as React from 'react';
import observer from 'client/flux/observer';
import Group from '../store/schema/Group';
import Item from '../store/schema/Item';
import favStore from '../store/favStore';
import { DialogStatus } from '../store/schema/FavStore';
import EditGroupDialog from '../components/EditGroupDialog';
import EditItemDialog from '../components/EditItemDialog';

import addGroup from '../actions/group/addGroup';
import editGroup from '../actions/group/editGroup';
import deleteGroup from '../actions/group/deleteGroup';
import addItem from '../actions/item/addItem';
import editItem from '../actions/item/editItem';
import deleteItem from '../actions/item/deleteItem';
import closeDialog from '../actions/dialog/closeDialog';

@observer
class FavDialogs extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                {favStore.dialogs.dialogStatus == DialogStatus.EditGroup &&
                    <EditGroupDialog
                        groupToEdit={favStore.dialogs.editingGroup}
                        onEditGroup={this.onEditGroup}
                        onDeleteGroup={this.onDeleteGroup}
                        onCancel={closeDialog}
                    />}
                {favStore.dialogs.dialogStatus == DialogStatus.EditItem &&
                    <EditItemDialog
                        itemToEdit={favStore.dialogs.editingItem}
                        onEditItem={this.onEditItem}
                        onDeleteItem={this.onDeleteItem}
                        onCancel={closeDialog}
                    />}
            </div>
        );
    }

    private onEditGroup = (group: Group, name: string) => {
        if (group) {
            editGroup(group, name, group.isOpened);
        } else {
            addGroup(name);
        }

        closeDialog();
    };

    private onDeleteGroup = (group: Group) => {
        deleteGroup(group);
        closeDialog();
    };

    private onEditItem = (item: Item, name: string, url: string) => {
        if (item) {
            editItem(item, name, url, item.checked);
        } else {
            addItem(favStore.dialogs.editingGroup, name, url);
        }

        closeDialog();
    };

    private onDeleteItem = (item: Item) => {
        deleteItem(item);
        closeDialog();
    };
}

export default FavDialogs;
