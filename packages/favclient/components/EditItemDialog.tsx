import * as React from 'react';
import Item from '../store/schema/Item';
import ModalDialog, { ModalDialogButton } from 'client/modalDialog/ModalDialog';

let styles = require('client/titleBar/TitleBar.scss');

export interface EditItemDialogProps {
    itemToEdit: Item;
    onEditItem: (item: Item, newName: string, newUrl: string) => void;
    onDeleteItem: (item: Item) => void;
    onCancel: () => void;
}

export interface EditItemDialogState {
    name: string;
    url: string;
}

class EditItemDialog extends React.Component<EditItemDialogProps, EditItemDialogState> {
    private newItemName: HTMLInputElement;
    private newUrl: HTMLInputElement;

    private getInitialState() {
        let item = this.props.itemToEdit;
        return item
            ? {
                  name: item.displayName,
                  url: item.url,
              }
            : {
                  name: '',
                  url: 'http://',
              };
    }

    private editItem = () => {
        let name = this.state.name;
        let url = this.state.url;

        if (!name || !url) {
            return;
        }
        name = name.trim();
        url = url.trim();

        if (name && url) {
            if (url.indexOf('://') < 0) {
                url = 'http://' + url.trim();
            }

            this.props.onEditItem(this.props.itemToEdit, name, url);
            this.setState(this.getInitialState());
        }
    };

    private deleteItem = () => {
        if (window.confirm('确定要删除这个收藏吗？此操作不可恢复！')) {
            this.props.onDeleteItem(this.props.itemToEdit);
            this.setState(this.getInitialState());
        }
    };

    private okButton: ModalDialogButton = {
        text: '确定',
        onClick: this.editItem,
    };
    private cancelButton: ModalDialogButton = {
        text: '取消',
        onClick: this.props.onCancel,
    };
    private deleteButton: ModalDialogButton = {
        text: '删除',
        onClick: this.deleteItem,
    };

    constructor(props: EditItemDialogProps) {
        super(props);
        this.state = this.getInitialState();
    }

    render() {
        let dialogButtons: ModalDialogButton[] = this.props.itemToEdit
            ? [this.okButton, this.cancelButton, this.deleteButton]
            : [this.okButton, this.cancelButton];

        return (
            <ModalDialog buttons={dialogButtons}>
                <div className={styles.aboutLine2}>
                    {this.props.itemToEdit ? '编辑收藏' : '添加收藏'}
                </div>
                <div className="dialogTable">
                    <div className={styles.trDiv}>
                        <div className={styles.tdDiv}>名称：</div>
                        <div className={styles.tdDiv}>
                            <input
                                type="text"
                                className={styles.tableInput}
                                ref={ref => (this.newItemName = ref)}
                                value={this.state.name}
                                onChange={this.onNameUrlChanged}
                            />
                        </div>
                    </div>
                    <div className={styles.trDiv}>
                        <div className={styles.tdDiv}>地址：</div>
                        <div className={styles.tdDiv}>
                            <input
                                type="text"
                                className={styles.tableInput}
                                ref={ref => (this.newUrl = ref)}
                                value={this.state.url}
                                onChange={this.onNameUrlChanged}
                            />
                        </div>
                    </div>
                </div>
            </ModalDialog>
        );
    }

    private onNameUrlChanged = () => {
        this.setState({
            name: this.newItemName.value,
            url: this.newUrl.value,
        });
    };
}

export default EditItemDialog;
