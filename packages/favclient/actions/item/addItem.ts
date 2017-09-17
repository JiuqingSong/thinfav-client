import Item from '../../store/schema/Item';
import Group from '../../store/schema/Group';
import getTemporaryId from '../../utils/getTemporaryId';
import addGroup from '../group/addGroup';
import save from '../save';

const DefaultGroupName = '未命名组';

function addItem(targetGroup: Group, name: string, url: string, callback?: () => void) {
    let newItem: Item = {
        id: getTemporaryId(),
        displayName: name,
        checked: false,
        url: url
    };

    targetGroup = targetGroup || addGroup(DefaultGroupName, false);
    targetGroup.items.push(newItem);

    save(callback);
}

export default addItem;
