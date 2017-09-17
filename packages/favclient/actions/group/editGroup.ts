import Group from '../../store/schema/Group';
import save from '../save';

function editGroup(group: Group, name: string, isOpened: boolean) {
    group.displayName = name;
    group.isOpened = isOpened;
    save();
}

export default editGroup;