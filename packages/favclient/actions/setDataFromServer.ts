import Group from '../store/schema/Group';
import { initStore } from '../store/favStore';

function setStoreFromServer(groupsFromServer: Group[]) {
    let groups: Group[][] = [[], [], []];
    groupsFromServer.forEach(group => {
        group.isDragging = false;
        group.items.forEach(item => (item.isDragging = false));
        groups[group.columnId].push(group);
    });

    initStore(groups);
}

export default setStoreFromServer;
