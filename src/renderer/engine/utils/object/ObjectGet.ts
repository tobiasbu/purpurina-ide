
// type TypeName<T> =
// T extends string ? "string" :
// T extends number ? "number" :
// T extends boolean ? "boolean" :
// T extends undefined ? "undefined" :
// T extends Function ? "function" :
// "object";

type TypeOfValue<T> =
    T extends boolean ? boolean :
    T extends string ? string :
    T extends number ? number :
    T extends undefined ? undefined :
    T extends object ? T : 
    T extends Function ? any : any;

class ObjectGetter {


    typedValue<
        T extends object | string | number,
        D extends boolean | string | number | null | object | undefined,
        R = TypeOfValue<D>
        >
        (obj: T, key: string, defaultValue: D): R {
        return this.value(obj, key, defaultValue) as R;
    }

    value(obj: any, key: string, defaultValue: any): any {



        const type = typeof (obj);

        if (!obj || type === 'number' || type === 'string')
            return defaultValue;
        else if (obj.hasOwnProperty(key) && obj[key] !== undefined)
            return obj[key];
        else
            return defaultValue;

    }

    // Get value in complex object
    propertyValue(source, key, defaultValue) {
        if (!source || typeof source === 'number')
            return defaultValue;
        else if (source.hasOwnProperty(key))
            return source[key];
        else if (key.indexOf('.')) {
            var keys = key.split('.');
            var parent = source;
            var value = defaultValue;

            for (var i = 0; i < keys.length; i++) {
                if (parent.hasOwnProperty(keys[i])) {
                    value = parent[keys[i]];
                    parent = parent[keys[i]];
                }
                else {
                    value = defaultValue;
                    break;
                }
            }

            return value;
        }
        else {
            return defaultValue;
        }
    }



};

const ObjectGet = new ObjectGetter();

Object.freeze(ObjectGet);

export default ObjectGet;