const Render = 'render';
const ComponentWillMount = 'componentWillMount';
const ComponentWillUnmount = 'componentWillUnmount';
const IsMounted = '__isMountedForObserver';

let observerStack: React.Component<any, any>[] = [];

function pushObserver(o: React.Component<any, any>) {
    observerStack.push(o);
}

function popObserver() {
    observerStack.pop();
}

function getCurrentObserver() {
    return observerStack[observerStack.length - 1];
}

function observer(target: Function) {
    let render = target.prototype[Render];
    if (render) {
        target.prototype[Render] = function() {
            pushObserver(this);
            let result = render.apply(this, arguments);
            popObserver();
            return result;
        };
    }

    let componentWillMount = target.prototype[ComponentWillMount];
    target.prototype[ComponentWillMount] = function() {
        this[IsMounted] = true;
        return componentWillMount ? componentWillMount.apply(this, arguments) : null;
    };

    let componentWillUnmount = target.prototype[ComponentWillUnmount];
    target.prototype[ComponentWillUnmount] = function() {
        this[IsMounted] = false;
        return componentWillUnmount ? componentWillUnmount.apply(this, arguments) : null;
    };
}

export { IsMounted };
export { getCurrentObserver };
export default observer;
