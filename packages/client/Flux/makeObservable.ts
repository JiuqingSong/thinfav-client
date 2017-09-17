import observer from '../Flux/observer';
import Observable from '../Flux/Observable';

const ObservablesKey = "__observables";
const ObservableFunctions = ["push", "pop", "splice", "reverse", "shift", "sort", "unshift"];

function observeArrayFunctions(array: Array<any>, parentObservable?: Observable) {
    ObservableFunctions.forEach(name => {
        var func = (<any>Array.prototype)[name];
        Object.defineProperty(array, name, {
            value: function () {
                let retVal = func.apply(array, arguments);
                makeObservable(array, parentObservable);
                parentObservable.forceUpdate();
                return retVal;
            }
        });
    });
}

function makeObservableArray(array: Array<any>, parentObservable?: Observable) {
    let len = array.length;

    for (let i = 0; i < len; i++) {
        if (Object.getOwnPropertyDescriptor(array, <string><any>i).get) {
            continue;
        }

        let value = array[i];
        let observable = new Observable(i.toString(), value);
        makeObservable(value, observable);

        Object.defineProperty(array, <string><any>i, {
            get: observable.getValue,
            set: observable.setValue,
        });
    }

    if (parentObservable && array["push"] == Array.prototype["push"]) {
        observeArrayFunctions(array, parentObservable);
    }
 }

function makeObservable(o: Object, parentObservable?: Observable) {
    if (!o || (<any>o)[ObservablesKey] || typeof o != 'object' || o.constructor == Date || o.constructor == Function) {
        return;
    }

    if (o.constructor == Array) {
        makeObservableArray(o as Array<any>, parentObservable);
    } else {
        let keys = Object.keys(o);
        let observables: Observable[] = [];
        keys.forEach(key => {
            let value = (<any>o)[key];
            let observable = new Observable(key, value);
            makeObservable(value, observable);
            Object.defineProperty(o, key, {
                get: observable.getValue,
                set: observable.setValue,
            });

            observables.push(observable);
        });
        (<any>o)[ObservablesKey] = observables;
    }
} 

export default makeObservable;