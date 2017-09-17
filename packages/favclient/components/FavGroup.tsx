import * as React from 'react';
import Item from '../store/schema/Item';
import Group from '../store/schema/Group';
import FavItem from './FavItem';
import DragAndDropTrigger from 'client/DragAndDrop/DragAndDropTrigger';
import DragAndDropElement from 'client/DragAndDrop/DragAndDropElement';
import DragAndDropTarget from 'client/DragAndDrop/DragAndDropTarget';
import DragAndDropManager from 'client/DragAndDrop/DragAndDropManager';
import { getPlugIn } from '../plugins/FavPlugIn';
import observer from 'client/Flux/observer';
import editGroup from '../actions/group/editGroup';
import showGroupDialog from '../actions/dialog/showGroupDialog';
import showItemDialog from '../actions/dialog/showItemDialog';

export interface FavGroupProps {
    group: Group;
    groupDragAndDropManager: DragAndDropManager;
    itemDragAndDropManager: DragAndDropManager;
}

@observer
class FavGroup extends React.Component<FavGroupProps, any> {
    private newName: HTMLInputElement;
    private newUrl: HTMLInputElement;
    private dragAndDropElement: DragAndDropElement;

    render() {
        let group = this.props.group;
        let groupClassName = group.isOpened ? "favGroup opened" : "favGroup";
        let plugin = getPlugIn(group);
        let groupUrl = plugin && plugin.url ? plugin.url : "#";
        let onClickTitle = plugin ? null : this.openAllLink;
        let title = plugin ? plugin.displayName : group.displayName;

        return (
            <DragAndDropElement
                manager={this.props.groupDragAndDropManager}
                className={groupClassName}
                data={group}
                ref={ref => this.dragAndDropElement = ref}>
                <div className="favGroupTitle">
                    {
                        group.isOpened ?
                            <div className="hoverButton" title="收起" onClick={this.toggleExpand}>
                                <img src="/resource/collapse.png" width="20" />
                            </div> :
                            <div className="hoverButton" title="展开" onClick={this.toggleExpand}>
                                <img src="/resource/expand.png" width="20" />
                            </div>
                    }
                    <div className="hoverButton" title="编辑" onClick={() => showGroupDialog(group) }>
                        <img src="/resource/edit.png" width="20" />
                    </div>
                    {
                        !plugin &&
                        <div className="hoverButton" title="添加链接" onClick={() => showItemDialog(group, null) }>
                            <img src="/resource/add.png" width="20" />
                        </div>
                    }
                    <DragAndDropTrigger getDragAndDropElement={this.getDragAndDropElement} className="favGroupName">
                        <a href={groupUrl} onClick={onClickTitle}>{title}</a>
                    </DragAndDropTrigger>
                </div>
                {
                    group.isOpened && 
                        (plugin ?
                        (<div className="favGroupBody">{plugin.getBody()}</div>) :
                        (<DragAndDropTarget manager={this.props.itemDragAndDropManager} className="favGroupBody" data={group}>
                            {
                                group.items.length > 0 ?
                                    group.items.map(
                                        (item) =>
                                            <FavItem
                                                key={item.id}
                                                manager={this.props.itemDragAndDropManager}
                                                item={item} />) :
                                    <div className="addNewItemLink">
                                        <a href="#" onClick={() => showItemDialog(group, null) }>点击这里开始添加收藏</a>
                                    </div>
                            }
                        </DragAndDropTarget>)
                        )
                }
            </DragAndDropElement>);
    }

    private getDragAndDropElement = () => {
        return this.dragAndDropElement;
    }

    private toggleExpand = () => {
        let group = this.props.group;
        editGroup(group, group.displayName, !group.isOpened);
    }

    private openAllLink = () => {
        let items = this.props.group.items;
        for (let i = 0; i < items.length; i++) {
            window.open(items[i].url);
        }
    }
}

export default FavGroup;
