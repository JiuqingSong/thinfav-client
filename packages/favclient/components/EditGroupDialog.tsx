import * as React from 'react';
import Group from '../store/schema/Group';
import ModalDialog, { ModalDialogButton } from 'client/modalDialog/ModalDialog';
import FavPlugIn, { getPlugIn, getPlugins } from '../plugins/FavPlugIn';

let styles = require('client/titleBar/TitleBar.scss');

export interface EditGroupDialogProps {
    groupToEdit: Group;
    onEditGroup: (group: Group, newName: string) => void;
    onDeleteGroup: (group: Group) => void;
    onCancel: () => void;
}

export interface EditGroupDialogState {
    name: string;
    addingPlugIn: boolean;
}

class EditGroupDialog extends React.Component<EditGroupDialogProps, EditGroupDialogState> {
    private newGroupName: HTMLInputElement;

    private getInitialState(): EditGroupDialogState {
        return {
            name: this.props.groupToEdit ? this.props.groupToEdit.displayName : '',
            addingPlugIn: false,
        };
    }

    private editGroup = () => {
        let groupName = this.state.name;

        if (groupName && groupName.trim()) {
            this.props.onEditGroup(this.props.groupToEdit, groupName.trim());
        }
    };

    private deleteGroup = () => {
        if (window.confirm('确定要删除这个组吗？此操作不可恢复！')) {
            this.props.onDeleteGroup(this.props.groupToEdit);
        }
    };

    private okButton: ModalDialogButton = {
        text: '确定',
        onClick: this.editGroup,
    };
    private cancelButton: ModalDialogButton = {
        text: '取消',
        onClick: this.props.onCancel,
    };
    private deleteButton: ModalDialogButton = {
        text: '删除',
        onClick: this.deleteGroup,
    };

    constructor(props: EditGroupDialogProps) {
        super(props);
        this.state = this.getInitialState();
    }

    render() {
        let group = this.props.groupToEdit;
        let dialogButtons: ModalDialogButton[];
        let thisPlugIn = getPlugIn(group);

        if (thisPlugIn) {
            dialogButtons = [this.cancelButton, this.deleteButton];
        } else if (group) {
            dialogButtons = [this.okButton, this.cancelButton, this.deleteButton];
        } else {
            dialogButtons = [this.okButton, this.cancelButton];
        }

        let addGroupClass = this.state.addingPlugIn ? styles.unselectedTitle : styles.selectedTitle;
        let addPlugInClass = this.state.addingPlugIn
            ? styles.selectedTitle
            : styles.unselectedTitle;
        let plugIns = getPlugins();

        return (
            <ModalDialog buttons={dialogButtons}>
                {group
                    ? <div className={styles.aboutLine2}>
                          {thisPlugIn ? '编辑插件' : '编辑组'}
                      </div>
                    : <div>
                          <a href="#" className={addGroupClass} onClick={this.showAddGroup}>
                              添加组
                          </a>
                          <span className={styles.unselectedTitle}>&nbsp;|&nbsp;</span>
                          <a href="#" className={addPlugInClass} onClick={this.showAddPlugIn}>
                              添加插件
                          </a>
                      </div>}
                {this.state.addingPlugIn
                    ? <div>
                          {plugIns.map(this.renderAddPlugin)}
                      </div>
                    : <div className="dialogTable">
                          <div className={styles.trDiv}>
                              <div className={styles.tdDiv}>
                                  {thisPlugIn ? '插件名称：' : '组名称：'}
                              </div>
                              <div className={styles.tdDiv}>
                                  {thisPlugIn
                                      ? thisPlugIn.displayName
                                      : <input
                                            type="text"
                                            className={styles.tableInput}
                                            ref={ref => (this.newGroupName = ref)}
                                            value={this.state.name}
                                            onChange={this.onNameChanged}
                                        />}
                              </div>
                          </div>
                      </div>}
            </ModalDialog>
        );
    }

    private renderAddPlugin = (plugIn: FavPlugIn) => {
        let classNames =
            this.state.name == plugIn.pluginId
                ? styles.plugInIcon + ' ' + styles.selected
                : styles.plugInIcon;

        return (
            <div key={plugIn.pluginId} className={classNames}>
                <a href="#" onClick={() => this.addPlugIn(plugIn)} title={plugIn.displayName}>
                    <img src={plugIn.logoUrl} width="80" />
                </a>
                &nbsp;
            </div>
        );
    };

    private addPlugIn = (plugIn: FavPlugIn) => {
        this.setState({
            name: plugIn.pluginId,
            addingPlugIn: this.state.addingPlugIn,
        });
    };

    private showAddGroup = () => {
        this.setState({
            name: this.state.name,
            addingPlugIn: false,
        });
    };

    private showAddPlugIn = () => {
        this.setState({
            name: this.state.name,
            addingPlugIn: true,
        });
    };

    private onNameChanged = () => {
        this.setState({
            name: this.newGroupName.value,
            addingPlugIn: this.state.addingPlugIn,
        });
    };
}

export default EditGroupDialog;
