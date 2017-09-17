import Item from '../store/schema/Item';
import Group from '../store/schema/Group';
import forEachGroup from './forEachGroup';

function findGroupByItem(item: Item): Group {
    let result: Group = null;
    forEachGroup(group => (result = group.items.indexOf(item) >= 0 ? group : result));
    return result;
}

export default findGroupByItem;
