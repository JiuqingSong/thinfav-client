let compareObject: (obj1: any, obj2: any) => boolean;

function compareArray(array1: any[], array2: any[]): boolean {
    if (array1.length != array2.length) {
        return false;
    }

    for (let i = 0; i < array1.length; i++) {
        if (!compareObject(array1[i], array2[i])) {
            return false;
        }
    }

    return true;
}

compareObject = function(obj1: any, obj2: any): boolean {
    if (obj1 == obj2) {
        return true;
    }

    if (
        !obj1 ||
        !obj2 ||
        typeof obj1 != typeof obj2 ||
        typeof obj1 != 'object' ||
        (<Object>obj1).constructor != (<Object>obj2).constructor
    ) {
        return false;
    }

    if ((<Object>obj1).constructor == Date) {
        return (<Date>obj1).getTime() == (<Date>obj2).getTime();
    } else if ((<Object>obj1).constructor == Array) {
        return compareArray(<any[]>obj1, <any[]>obj2);
    } else {
        let keys1 = Object.keys(obj1);
        let keys2 = Object.keys(obj2);

        if (!compareArray(keys1, keys2)) {
            return false;
        }

        for (let i = 0; i < keys1.length; i++) {
            if (
                keys1[i] != keys2[i] ||
                !compareObject((<any[]>obj1)[<any>keys1[i]], (<any[]>obj2)[<any>keys2[i]])
            ) {
                return false;
            }
        }

        return true;
    }
};

export default compareObject;
