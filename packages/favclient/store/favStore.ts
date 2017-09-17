import Group from './schema/Group';
import FavStore, { DialogStatus } from './schema/FavStore';
import makeObservable from 'client/Flux/makeObservable';

let favStore: FavStore = {
    groups: [[], [], []],
    dragAndDrop: {
        hasFlyingGroup: false,
        hasFlyingItem: false,
    },
    dialogs: {
        dialogStatus: DialogStatus.None,
        editingGroup: null,
        editingItem: null,
    },
};
makeObservable(favStore);
export default favStore;

function initStore(groups: Group[][]) {
    favStore.groups = groups;
};

export { initStore };