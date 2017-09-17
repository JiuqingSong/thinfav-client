import Item from '../../store/schema/Item';
import Group from '../../store/schema/Group';
import findGroupByItem from '../../utils/findGroupByItem';

function moveItem(item: Item, targetGroup: Group, targetIndex: number): boolean {
    let currentGroup = findGroupByItem(item);
    let currentIndex = currentGroup.items.indexOf(item);

    if (currentGroup == targetGroup) {
        if (currentIndex == targetIndex || currentIndex == targetIndex - 1) {
            return false;
        } else if (currentIndex < targetIndex) {
            targetIndex--;
        }
    }

    let targetItems = targetGroup.items;
    currentGroup.items.splice(currentIndex, 1);
    targetGroup.items = targetItems
        .slice(0, targetIndex)
        .concat([item])
        .concat(targetItems.slice(targetIndex));

    return true;
}

export default moveItem;
