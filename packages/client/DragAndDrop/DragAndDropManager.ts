import * as ReactDOM from 'react-dom';
import DragAndDropTarget from './DragAndDropTarget';
import DragAndDropElement from './DragAndDropElement';

interface DragAndDropProps {
    isDragging?: boolean;
}

export { DragAndDropProps };

interface DragAndDropHandler {
    getOffsetRoot: () => HTMLElement;
    dragStart: () => void;
    dragTo: (element: DragAndDropElement, target: DragAndDropTarget, index: number) => void;
    dragFinish: () => void;
}

export { DragAndDropHandler };

interface Rect {
    left: number;
    top: number;
    width: number;
    height: number;
}

function calcRect(obj: HTMLElement, stopElement?: HTMLElement): Rect {
    stopElement = stopElement || document.body;
    let offsetParent =
        obj.offsetParent && obj.offsetParent != stopElement
            ? obj.offsetParent as HTMLElement
            : null;
    let parentRect = offsetParent
        ? calcRect(offsetParent, stopElement)
        : {
              left: 0,
              top: 0,
              width: 0,
              height: 0,
          };
    return {
        left: obj.offsetLeft + parentRect.left,
        top: obj.offsetTop + parentRect.top,
        width: obj.offsetWidth,
        height: obj.offsetHeight,
    };
}

class DragAndDropManager {
    private handler: DragAndDropHandler;
    private flyingElement: JSX.Element;
    private targets: DragAndDropTarget[] = [];
    private draggingElement: DragAndDropElement;
    private flyingDiv: HTMLElement;
    private rect: Rect;
    private mouseX: number;
    private mouseY: number;

    constructor(handler: DragAndDropHandler) {
        this.handler = handler;
    }

    getFlyingElement() {
        return this.flyingElement;
    }

    addTarget(target: DragAndDropTarget) {
        this.targets.push(target);
    }

    removeTarget(target: DragAndDropTarget) {
        for (let i = 0; i < this.targets.length; i++) {
            if (this.targets[i] == target) {
                this.targets.splice(i, 1);
                break;
            }
        }
    }

    setFlyingDivRef = (ref: HTMLElement) => {
        this.flyingDiv = ref;
        this.setFlyingPosition();
    };

    startDrag(
        element: DragAndDropElement,
        event: React.MouseEvent<EventTarget>,
        flyingElement: JSX.Element
    ) {
        this.draggingElement = element;
        this.flyingElement = flyingElement;
        this.rect = calcRect(
            ReactDOM.findDOMNode(this.draggingElement) as HTMLElement,
            this.handler.getOffsetRoot()
        );
        this.mouseX = event.pageX;
        this.mouseY = event.pageY;

        document.addEventListener('mousemove', this.onMouseMove, true);
        document.addEventListener('mouseup', this.onMouseUp, true);
        document.addEventListener('selectstart', this.onSelectStart);
    }

    getHandler() {
        return this.handler;
    }

    private onMouseMove = (ev: MouseEvent) =>
        ReactDOM.unstable_batchedUpdates(() => {
            let data = this.draggingElement.getData();

            if (!data.isDragging) {
                data.isDragging = true;
                this.handler.dragStart();
            }

            this.rect.left += ev.pageX - this.mouseX;
            this.rect.top += ev.pageY - this.mouseY;
            this.mouseX = ev.pageX;
            this.mouseY = ev.pageY;
            this.setFlyingPosition();
            let scrollTop = this.handler.getOffsetRoot().scrollTop;

            for (let i = 0; i < this.targets.length; i++) {
                let target = ReactDOM.findDOMNode(this.targets[i]) as HTMLElement;
                let elementRect = calcRect(target);

                if (
                    ev.pageX >= elementRect.left &&
                    ev.pageX < elementRect.left + elementRect.width &&
                    ev.pageY >= elementRect.top &&
                    ev.pageY < elementRect.top + elementRect.height
                ) {
                    let y = ev.pageY - elementRect.top + scrollTop;
                    let index = 0;
                    let targetDiv = ReactDOM.findDOMNode(this.targets[i]) as HTMLElement;
                    for (
                        let child = targetDiv.firstChild as HTMLElement;
                        child;
                        child = child.nextElementSibling as HTMLElement
                    ) {
                        if (y > child.offsetTop + child.offsetHeight / 2) {
                            index++;
                        } else {
                            break;
                        }
                    }

                    this.handler.dragTo(this.draggingElement, this.targets[i], index);

                    break;
                }
            }
        });

    private onMouseUp = (ev: MouseEvent) =>
        ReactDOM.unstable_batchedUpdates(() => {
            this.draggingElement.getData().isDragging = false;
            document.removeEventListener('mousemove', this.onMouseMove, true);
            document.removeEventListener('mouseup', this.onMouseUp, true);
            document.removeEventListener('selectstart', this.onSelectStart);
            this.flyingElement = null;
            this.handler.dragFinish();
        });

    private onSelectStart = (ev: MouseEvent) => {
        ev.preventDefault();
    };

    private setFlyingPosition() {
        if (this.flyingDiv) {
            this.flyingDiv.style.width = this.rect.width + 'px';
            this.flyingDiv.style.height = this.rect.height + 'px';
            this.flyingDiv.style.left = this.rect.left + 'px';
            this.flyingDiv.style.top = this.rect.top + 'px';
        }
    }
}

export default DragAndDropManager;
