import Item from '../store/schema/Item';
import Group from '../store/schema/Group';
import forEachGroup from '../utils/forEachGroup';
import setDataFromServer from './setDataFromServer';
import ajaxCall from 'client/ajax/ajax';
import compareObject from 'client/ajax/compareObject';

function save(callback?: () => void) {
    let saveData: Group[] = [];
    forEachGroup(group => {
        let items: Item[] = [];
        group.items.forEach(item => {
            items.push({
                checked: item.checked,
                displayName: item.displayName,
                id: item.id,
                url: item.url,
            });
        });
        saveData.push({
            columnId: group.columnId,
            displayName: group.displayName,
            id: group.id,
            isOpened: group.isOpened,
            items: items,
        });
    });

    ajaxCall<Group[]>('Fav_SaveGroups.ysf', true, saveData, result => {
        if (!compareObject(saveData, result)) {
            setDataFromServer(result);
        }

        if (callback) {
            callback();
        }
    });
}

export default save;
