import * as React from 'react';
import Group from '../store/schema/Group';
import FavItem from './FavItem';
import DragAndDropTrigger from 'client/dragAndDrop/DragAndDropTrigger';
import DragAndDropElement from 'client/dragAndDrop/DragAndDropElement';
import DragAndDropTarget from 'client/dragAndDrop/DragAndDropTarget';
import DragAndDropManager from 'client/dragAndDrop/DragAndDropManager';
import { getPlugIn } from '../plugins/FavPlugIn';
import observer from 'client/flux/observer';
import editGroup from '../actions/group/editGroup';
import showGroupDialog from '../actions/dialog/showGroupDialog';
import showItemDialog from '../actions/dialog/showItemDialog';

let styles = require('favclient/favclient.scss');

export interface FavGroupProps {
    group: Group;
    groupDragAndDropManager: DragAndDropManager;
    itemDragAndDropManager: DragAndDropManager;
}

@observer
class FavGroup extends React.Component<FavGroupProps, any> {
    private dragAndDropElement: DragAndDropElement;

    render() {
        let group = this.props.group;
        let groupClassName = group.isOpened
            ? styles.favGroup + ' ' + styles.opened
            : styles.favGroup;
        let plugin = getPlugIn(group);
        let groupUrl = plugin && plugin.url ? plugin.url : '#';
        let onClickTitle = plugin ? null : this.openAllLink;
        let title = plugin ? plugin.displayName : group.displayName;

        return (
            <DragAndDropElement
                manager={this.props.groupDragAndDropManager}
                className={groupClassName}
                data={group}
                ref={ref => (this.dragAndDropElement = ref)}>
                <div className={styles.favGroupTitle}>
                    {group.isOpened
                        ? <div
                              className={styles.hoverButton}
                              title="收起"
                              onClick={this.toggleExpand}>
                              <img src="/resource/collapse.png" width="20" />
                          </div>
                        : <div
                              className={styles.hoverButton}
                              title="展开"
                              onClick={this.toggleExpand}>
                              <img src="/resource/expand.png" width="20" />
                          </div>}
                    <div
                        className={styles.hoverButton}
                        title="编辑"
                        onClick={() => showGroupDialog(group)}>
                        <img src="/resource/edit.png" width="20" />
                    </div>
                    {!plugin &&
                        <div
                            className={styles.hoverButton}
                            title="添加链接"
                            onClick={() => showItemDialog(group, null)}>
                            <img src="/resource/add.png" width="20" />
                        </div>}
                    <DragAndDropTrigger
                        getDragAndDropElement={this.getDragAndDropElement}
                        className={styles.favGroupName}>
                        <a href={groupUrl} onClick={onClickTitle}>
                            {title}
                        </a>
                    </DragAndDropTrigger>
                </div>
                {group.isOpened &&
                    (plugin
                        ? <div className={styles.favGroupBody}>
                              {plugin.getBody()}
                          </div>
                        : <DragAndDropTarget
                              manager={this.props.itemDragAndDropManager}
                              className={styles.favGroupBody}
                              data={group}>
                              {group.items.length > 0
                                  ? group.items.map(item =>
                                        <FavItem
                                            key={item.id}
                                            manager={this.props.itemDragAndDropManager}
                                            item={item}
                                        />
                                    )
                                  : <div className={styles.addNewItemLink}>
                                        <a href="#" onClick={() => showItemDialog(group, null)}>
                                            点击这里开始添加收藏
                                        </a>
                                    </div>}
                          </DragAndDropTarget>)}
            </DragAndDropElement>
        );
    }

    private getDragAndDropElement = () => {
        return this.dragAndDropElement;
    };

    private toggleExpand = () => {
        let group = this.props.group;
        editGroup(group, group.displayName, !group.isOpened);
    };

    private openAllLink = () => {
        let items = this.props.group.items;
        for (let i = 0; i < items.length; i++) {
            window.open(items[i].url);
        }
    };
}

export default FavGroup;
