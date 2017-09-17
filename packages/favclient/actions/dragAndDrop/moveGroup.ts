import Group from '../../store/schema/Group';
import favStore from '../../store/favStore';

function moveGroup(group: Group, targetColumnId: number, targetIndex: number): boolean {
    let groups = favStore.groups;
    let currentIndex = groups[group.columnId].indexOf(group);

    if (group.columnId == targetColumnId) {
        if (currentIndex == targetIndex || currentIndex == targetIndex - 1) {
            return false;
        } else if (currentIndex < targetIndex) {
            targetIndex--;
        }
    }

    let targetGroups = groups[targetColumnId];
    groups[group.columnId].splice(currentIndex, 1);
    group.columnId = targetColumnId;
    favStore.groups[targetColumnId] = targetGroups
        .slice(0, targetIndex)
        .concat([group])
        .concat(targetGroups.slice(targetIndex));

    return true;
}

export default moveGroup;
