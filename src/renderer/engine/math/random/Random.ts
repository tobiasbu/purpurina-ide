
import { mash } from "./Mash";
import MathUtils from "../MathUtils";


// ms
//const uint32 a = 214013;
//const uint32 c = 2531011;
// b
//const RNG_A = 8253729;
//const RNG_B = 2396403;
// Alea
const RNG_A = 2091639;
const RNG_B = 2.3283064365386963e-10; // 2^-32;
const FRAC = 1.1102230246251565e-16; // 2^-53


// From http://baagoe.com/en/RandomMusings/javascript/
class RandomGenerator {

    private c: number
    private s0: number;
    private s1: number;
    private s2: number;
    private n: number;

    constructor() {
        this.c = 1;
        this.s0 = 0;
        this.s1 = 0;
        this.s2 = 0;
        this.n = 0xefc8249d;

    }

    hash(data: string | number | boolean) {
        let h;
        let n = this.n;

        data = data.toString();

        for (let i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000;// 2^32
        }

        this.n = n;

        return (n >>> 0) * 2.3283064365386963e-10;// 2^-32
    }

    rand() {
        // common lcg =  (a * seed + c);
        const t = RNG_A * this.s0 + this.c * RNG_B; // 2^-32
        this.s0 = this.s1;
        this.s1 = this.s2;
        this.c = t | 0;
        this.s2 = t - this.c;
        return this.s2;
    }

    uint32() {
        return this.rand() * 0x100000000; // ^32
    }

    frac() {
        return this.rand() + (this.rand() * 0x200000 | 0) * FRAC;
    }

    // 0...1
    real() {
        return this.uint32() + this.frac();
    }

    // real range
    range(from, to) {
        return this.frac() * (to - from) + from;
    }

    // integer
    irange(from, to) {
        return MathUtils.floor(this.range(0, to - from) + from);
        //MathUtils.floor(Math.random() * (max - min)) + min;
    }

    reset(seeds) {
        // this.n = 0xefc8249d;
        this.s0 = mash(' ');
        this.s1 = mash(' ');
        this.s2 = mash(' ');
        this.c = 1;

        for (let i = 0; i < seeds.length && (seeds[i] != null); i++) {
            let seed = seeds[i];

            this.s0 -= mash(seed);
            this.s0 += ~~(this.s0 < 0);
            this.s1 -= mash(seed);
            this.s1 += ~~(this.s1 < 0);
            this.s2 -= mash(seed);
            this.s2 += ~~(this.s2 < 0);
        }
    }

}

const Random = new RandomGenerator();

Object.seal(Random);

export default Random;