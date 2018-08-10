

// 10000000 + -1000 + -4000 + -80000000 + -100000000000,
const n = 1e7 + -1e3 + -4e3 + -8e3 + -1e11;

class UUIDGenerator {

    /**
     * Generates a UUID
     * @param a Placeholder
     */
    generate(a?: number | any): string {
        if (a) {
            // if the placeholder was passed, return
            // unless b is 8, in which case  a random number from  8 to 11 in hexadecimal
            return (a ^ Math.random() * 16 >> a / 4).toString(16);

        } else {
            // or otherwise a concatenated string:
            // replacing zeroes, ones, and eights with random hex digits
            return n.toString().replace(/[018]/g, this.generate);

        }

    }

    simple(from?: number, length?: number) {
        if (!from) from = 2;
        if (!length) length = 10;

        return Math.random().toString(36).substr(from, length);
    }



}

const UUID = new UUIDGenerator();

export default UUID;