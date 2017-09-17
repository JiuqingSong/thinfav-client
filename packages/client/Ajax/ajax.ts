let dateRegEx = new RegExp(
    '(^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"',
    'g'
);
let jsonRegEx = new RegExp('[^,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t]', 'g');
let jsonStringRegEx = new RegExp('"(\\\\.|[^"\\\\])*"', 'g');

function deserialize(source: string): any {
    if (!source || !source.trim()) {
        return null;
    }

    let exp = source.replace(dateRegEx, '$1new Date($2)');

    if (jsonRegEx.test(exp.replace(jsonStringRegEx, ''))) {
        return null;
    }

    return eval('(' + exp + ')');
}

function jsEncode(source: string): string {
    return source
        .replace('\\', '\\\\')
        .replace("'", "\\'")
        .replace('"', '\\"')
        .replace('<', '\\<')
        .replace('>', '\\>');
}

function serialize(source: any): string {
    if (source === null || typeof source == 'undefined') {
        return 'null';
    }

    switch (typeof source) {
        case 'object':
            if (source) {
                let result = '';
                if (source.constructor == Array) {
                    result += '[';
                    for (let i = 0; i < source.length; ++i) {
                        if (i > 0) {
                            result += ',';
                        }
                        result += serialize(source[i]);
                    }
                    result += ']';
                } else if (source.constructor == Date) {
                    result += '"\\/Date(' + (source as Date).getTime() + ')\\/"';
                } else {
                    result += '{';
                    let isFirst = true;
                    for (let key in source) {
                        let value = source[key];
                        if (typeof value != 'undefined' && typeof value != 'function') {
                            if (!isFirst) {
                                result += ',';
                            }
                            isFirst = false;
                            result += '"' + jsEncode(key) + '":' + serialize(value);
                        }
                    }
                    result += '}';
                }
                return result;
            } else {
                return 'null';
            }
        case 'number':
            return String(source);
        case 'string':
            return '"' + jsEncode(source as string) + '"';
        case 'boolean':
            let sourceBool = source as boolean;
            return sourceBool ? 'true' : 'false';
        default:
            return 'null';
    }
}

function ajaxCall<T>(
    url: string,
    isPost: boolean,
    data: any,
    onSuccess?: (data: T) => void,
    onError?: (error: any) => void
) {
    let request = new XMLHttpRequest();
    let json = serialize(data);
    request.onreadystatechange = (ev: ProgressEvent) => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                if (onSuccess) {
                    let result = deserialize(request.responseText) as T;
                    onSuccess(result);
                }
            } else if (onError) {
                onError(request.responseText);
            }
        }
    };

    request.open(isPost ? 'POST' : 'GET', url, true);
    request.send(json);
}

export default ajaxCall;
