
const FLOAT_REGEX = /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/;


export interface ParserResult<T> {
    isValid: boolean;
    value: T;
}

export function floatableString(value: string): ParserResult<string> {

    let newValue: string;
    let isValidValue = false;


    if (value.length > 0) {

        const nonDigits: boolean = /([^.\d]+)/g.test(value);

        if (nonDigits) {

            const isNegative: boolean = value[0] === '-';
            newValue = value.replace(/([^.\d]+)/g, '');
            const canParse: boolean = newValue.length !== 0;

            if (canParse == false) {
                if (!isNegative) {
                    newValue = '0';
                } else {
                    newValue = '-';
                }
            } else {
                if (isNegative) {
                    newValue = '-' + newValue;
                }
                isValidValue = true;
                newValue = (parseFloat(newValue)).toString();
            }
        } else {
            const float = FLOAT_REGEX.exec(value);
            if (float && float.length > 0) {
                newValue = float[0];//parseFloat(float[0]).toString();

            } else {
                newValue = value;
            }
            isValidValue = true;
        }
    } else {
        newValue = ''
        isValidValue = false;
    }

    return {
        value: newValue,
        isValid: isValidValue
    }

}