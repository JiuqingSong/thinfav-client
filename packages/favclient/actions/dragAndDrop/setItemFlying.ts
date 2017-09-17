import favStore from '../../store/favStore';

function setItemFlying(isFlying: boolean) {
    favStore.dragAndDrop.hasFlyingItem = isFlying;
}

export default setItemFlying;
  