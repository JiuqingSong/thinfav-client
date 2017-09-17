import Group from '../../store/schema/Group';
import getGroups from '../../utils/getGroups';
import save from '../save';

function deleteGroup(group: Group) {
    let groups = getGroups(group.columnId);
    let index = groups.indexOf(group);

    if (index >= 0) {
        groups.splice(index, 1);
        save();
    }
}

export default deleteGroup;
