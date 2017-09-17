import makeObservable from './makeObservable';
import { getCurrentObserver, IsMounted } from './observer';

class Observable {
    private key: string;
    private value: any;
    private observers: React.Component<any, any>[] = [];

    constructor(key: string, value: any) {
        this.key = key;
        this.value = value;
    }

    getKey = () => {
        return this.key;
    };

    getValue = () => {
        let observer = getCurrentObserver();

        if (observer && this.observers.indexOf(observer) < 0) {
            this.observers.push(observer);
        }

        return this.value;
    };

    setValue = (value: any) => {
        if (this.value != value) {
            this.value = value;
            makeObservable(this.value, this);
            this.forceUpdate();
        }
    };

    forceUpdate = () => {
        this.observers.forEach(observer => (<any>observer)[IsMounted] && observer.forceUpdate());
    };
}

export default Observable;
