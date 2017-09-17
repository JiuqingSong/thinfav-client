import forEachGroup from '../../utils/forEachGroup';
import getTemporaryId from '../../utils/getTemporaryId';
import favStore from '../../store/favStore';
import Group from '../../store/schema/Group';
import save from '../save';

function findShortestColumn(): number {
    let itemCounts = [0, 0, 0];

    forEachGroup((group, columnId) => (itemCounts[columnId] += group.items.length + 1));

    let columnId = itemCounts[0] > itemCounts[1] ? 1 : 0;
    columnId = itemCounts[columnId] > itemCounts[2] ? 2 : columnId;
    return columnId;
}

function addGroup(name: string, doSave: boolean = true): Group {
    name = name && name.trim();
    if (name) {
        let columnId = findShortestColumn();
        let id = getTemporaryId();
        let newGroup: Group = {
            id: id,
            displayName: name,
            isOpened: true,
            items: [],
            columnId: columnId,
        };
        favStore.groups[columnId].push(newGroup);

        if (doSave) {
            save();
        }
        return newGroup;
    } else {
        return null;
    }
}

export default addGroup;
