import favStore from '../../store/favStore';

function setGroupFlying(isFlying: boolean) {
    favStore.dragAndDrop.hasFlyingGroup = isFlying;
}

export default setGroupFlying;
 