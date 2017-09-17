import Group from '../store/schema/Group';
import favStore from '../store/favStore';

function getGroups(columnId: number): Group[] {
    return favStore.groups[columnId];
}

export default getGroups;