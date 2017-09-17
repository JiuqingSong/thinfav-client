import Group from '../store/schema/Group';
import favStore from '../store/favStore';

function forEachGroup(callback: (group: Group, columnId?: number) => void) {
    favStore.groups.forEach((column, columnId) => column.forEach(group => callback(group, columnId)));
} 

export default forEachGroup;