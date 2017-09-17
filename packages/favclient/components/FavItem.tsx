import * as React from 'react';
import Item from '../store/schema/Item';
import DragAndDropTrigger from 'client/dragAndDrop/DragAndDropTrigger';
import DragAndDropElement from 'client/dragAndDrop/DragAndDropElement';
import DragAndDropManager from 'client/dragAndDrop/DragAndDropManager';
import observer from 'client/flux/observer';
import editItem from '../actions/item/editItem';
import showItemDialog from '../actions/dialog/showItemDialog';

let styles = require('favclient/favclient.scss');

export interface FavItemProps {
    item: Item;
    manager: DragAndDropManager;
}

@observer
class FavItem extends React.Component<FavItemProps, any> {
    private element: DragAndDropElement;
    private checkBox: HTMLInputElement;

    render() {
        let item = this.props.item;
        return (
            <DragAndDropElement
                manager={this.props.manager}
                data={item}
                key={item.displayName}
                ref={ref => (this.element = ref)}>
                <DragAndDropTrigger
                    className={styles.favItem}
                    getDragAndDropElement={this.getDragAndDropElement}>
                    <div className={styles.hoverButton} title="编辑" onClick={this.editItem}>
                        <img src="/resource/edit-black.png" width="20" />
                    </div>
                    <input
                        type="checkbox"
                        ref={this.setCheckBoxRef}
                        checked={item.checked}
                        onClick={this.clickCheckBox}
                    />
                    <a href={item.url}>
                        {item.displayName}
                    </a>
                </DragAndDropTrigger>
            </DragAndDropElement>
        );
    }

    getDragAndDropElement = () => {
        return this.element;
    };

    private setCheckBoxRef = (ref: HTMLInputElement) => {
        this.checkBox = ref;
    };

    private clickCheckBox = () => {
        let item = this.props.item;
        editItem(item, item.displayName, item.url, this.checkBox.checked);
    };

    private editItem = () => {
        showItemDialog(null, this.props.item);
    };
}

export default FavItem;
