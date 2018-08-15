
/*


* | a | b | x | * | 0 | 2 | 4 |
* | c | d | y | * | 1 | 3 | 5 |
* | 0 | 0 | 1 |

* | 0 | 3 | 6 | * | a | c | x |
* | 1 | 4 | 7 | * | b | d | y |
* | 2 | 5 | 8 | * | 0 | 0 | 1 |

a = scale_x
b = cos
x = x translate

c = scale_y
d = sin
y = y translate

HTML5/CSS3 uses matrices in column-major order based.

*/

export default class Matrix3 {

    private _a: number[];


    /*
    * Constructor is identity only
    */
    constructor(a?: number, b?: number) {

        /*a = a || i;
        b = b || 0;
        x = x || 0;
    
        c = c || 0;   
        d = d || i;   
        y = y || 0;*/

        a = a || 0;
        b = b || 0;

        this._a = [];

        // first column
        this._a[0] = a;
        this._a[1] = b;
        this._a[2] = b;
        // second column
        this._a[3] = b;
        this._a[4] = a;
        this._a[5] = b;
        // third column
        this._a[6] = b;
        this._a[7] = b;
        this._a[8] = a;
        //this._at = null;

    }

    get a(): number[] {
        return this._a;
    }

    at(i: number, j: number): number {
        return this._a[i + j * 3];
    }

    set(i: number, j: number, value: number): this {
        this._a[i + j * 3] = value;
        return this;
    }

    setIdentity(): this {
        return this.setTransform(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );
    }

    setTransform(a, b, c, d, e, f, g, h, i): this {

        this._a[0] = a;
        this._a[1] = b;
        this._a[2] = c; // 0

        this._a[3] = d;
        this._a[4] = e;
        this._a[5] = f; // 0

        this._a[6] = g; // x
        this._a[7] = h; // y
        this._a[8] = i;

        return this;

    }

    translate(x: number, y: number): this {


        /* | a | b | x | * | 0 | 2 | 4 |
        *  | c | d | y | * | 1 | 3 | 5 |
      
        * | 0 | 3 | 6 | * | a | c | x |
        * | 1 | 4 | 7 | * | b | d | y |
        * | 2 | 5 | 8 |
        */
        // 4 = 0 * x * 2 * y + 4
        // 5 = 1 * x * 3 * y + 5

        // 6 = 1 * x + 3 * y + 5
        // 7 = 1 * x + 4 * y + 7
        this._a[6] = this._a[0] * x + this._a[3] * y + this._a[6];
        this._a[7] = this._a[1] * x + this._a[4] * y + this._a[7];
        return this;
    }

    scale(x: number, y?: number): this {

        if (y === undefined) {
            y = x;
        }

        this._a[0] *= x; // a
        this._a[1] *= x; // b

        this._a[3] *= y; // c
        this._a[4] *= y; // d

        this._a[6] *= x; // x
        this._a[7] *= y; // y
        return this;

    }

    rotate(radianAngle): this {
        let cos = Math.cos(radianAngle);
        let sin = Math.sin(radianAngle);

        return this.radianRotate(cos, sin);
    }

    radianRotate(cos: number, sin: number): this {
        return this.transform(cos, sin, -sin, cos, 0, 0);
    }

    transform(a: number, b: number, c: number, d: number, x: number, y: number): this {
        let a00 = this._a[0]; // a
        let a01 = this._a[1]; // b

        let a10 = this._a[3]; // c
        let a11 = this._a[4]; // d

        let a20 = this._a[6]; // x
        let a21 = this._a[7]; // y

        this._a[0] = a * a00 + b * a10; // a * a0 + b * c0;
        this._a[1] = a * a01 + b * a11; // a * b0 + b * d0;

        this._a[3] = c * a00 + d * a10; // c * a0 + d * c0;
        this._a[4] = c * a01 + d * a11; // c * b0 + d * d0;

        this._a[6] = x * a00 + y * a10 + a20; // x * a0 + y * c0 + x0;
        this._a[7] = x * a01 + y * a11 + a21; // x * b0 + y * d0 + y0;

        return this;
    }

    setModelMatrix(position: IVector2, scale: IVector2, rotation: IVector2): this {
        this._a[0] = rotation.x * scale.x; // a
        this._a[1] = rotation.y * scale.x; // b
        this._a[3] = -rotation.y * scale.y; // c
        this._a[4] = rotation.x * scale.y; // d
        this._a[6] = position.x; // x
        this._a[7] = position.y; // y

        /*if (origin !== undefined) {
          this._a[6] -= origin.x * this._a[0] + origin.y * this._a[3];
          this._a[7] -= origin.y * this._a[1] + origin.y * this._a[4];
        }*/

        return this;
        /*
        a  =  _transform._cosSin.x * _transform.scale.x;
        b  = _transform._cosSin.y * _transform.scale.x;
        c  = -_transform._cosSin.y * _transform.scale.y;
        d  =  _transform._cosSin.x * _transform.scale.y;
        x =  _transform.position.x;
        y =  _transform.position.y;
    
        x -= _transform.origin.x * a + _transform.origin.y * c;
        y -= _transform.origin.y * b + _transform.origin.y * d;
        */


    }


    multiply(other: Matrix3): this {

        // faster way
        let a00 = this._a[0]; // a - 0
        let a01 = this._a[1]; // b - 1
        let a10 = this._a[3]; // c - 3
        let a11 = this._a[4]; // d - 4
        let a20 = this._a[6]; // x - 6
        let a21 = this._a[7]; // y - 7

        this._a[0] = other.a[0] * a00 + other.a[1] * a10; // a1 * a0 + b1 * c0;
        this._a[1] = other.a[0] * a01 + other.a[1] * a11; // a1 * b0 + b1 * d0;

        this._a[3] = other.a[3] * a00 + other.a[4] * a10; // c1 * a0 + d1 * c0;
        this._a[4] = other.a[3] * a01 + other.a[4] * a11; // c1 * b0 + d1 * d0;

        this._a[6] = other.a[6] * a00 + other.a[7] * a10 + a20; // x1 * a0 + y1 * c0 + x0;
        this._a[7] = other.a[6] * a01 + other.a[7] * a11 + a21; // x1 * b0 + y1 * d0 + y0;

        return this;
    }

    concat(other: Matrix3): this {

        let a = this._a[0]; // a - 0
        let b = this._a[1]; // b - 1
        let c = this._a[3]; // c - 3
        let d = this._a[4]; // d - 4
        let x = this._a[6]; // x - 6
        let y = this._a[7]; // y - 7

        this._a[0] = a * other.a[0] + b * other.a[3]; // a * pt.a + b * pt.c;
        this._a[1] = a * other.a[1] + b * other.a[4]; // a * pt.b + b * pt.d;

        this._a[3] = c * other.a[0] + d * other.a[3]; // c * pt.a + d * pt.c;
        this._a[4] = c * other.a[1] + d * other.a[4]; // c * pt.b + d * pt.d;

        this._a[6] = x * other.a[0] + y * other.a[3] + other.a[6]; // x * pt.a + y * pt.c + pt.x;
        this._a[7] = x * other.a[1] + y * other.a[4] + other.a[7]; // x * pt.b + y * pt.d + pt.y;

        return this;
    }

    transformPoint(x: number, y: number): IVector2 {

        let point = { x: 0, y: 0 }

        point.x = x * this._a[0] + y * this._a[3] + this._a[6];
        point.y = x * this._a[1] + y * this._a[4] + this._a[7];

        return point;
    }

    transpose(): this {
        return this.setTransform(
            this._a[0], this._a[3], this._a[6],
            this._a[1], this._a[4], this._a[7],
            this._a[2], this._a[5], this._a[8]
        );
    }

    inversed(): this {
        const det = Matrix3.determinant(this);

        if (det === 0) {
            return this;
        }
        const inv_det = 1.0 / det;
        const a = this._a;
        const b:number[] = [];

        b[0] = inv_det * (a[4] * a[8] - a[5] * a[7]); // (m11*m22 - m12*m21)/det;
        b[1] = inv_det * (a[2] * a[7] - a[1] * a[8]); // (m02*m21 - m01*m22)/det;
        b[2] = inv_det * (a[1] * a[5] - a[2] * a[4]); // (m01*m12 - m02*m11)/det;

        b[3] = inv_det * (a[5] * a[6] - a[3] * a[8]); // (m12*m20 - m10*m22)/det;
        b[4] = inv_det * (a[0] * a[8] - a[2] * a[6]); // (m00*m22 - m02*m20)/det;
        b[5] = inv_det * (a[2] * a[3] - a[0] * a[5]); // (m02*m10 - m00*m12)/det;

        b[6] = inv_det * (a[3] * a[7] - a[4] * a[6]); // (m10*m21 - m11*m20)/det;
        b[7] = inv_det * (a[1] * a[6] - a[0] * a[7]); // (m01*m20 - m00*m21)/det;
        b[8] = inv_det * (a[0] * a[4] - a[1] * a[3]); // (m00*m11 - m01*m10)/det;

        this._a = b;

        return this;

    }

    toString(): string {
        let str = "";
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                let val = this.at(y, x);
                //str += val.toString() + " ";
                //console.log("---- " + (x + y * 3).toString());
                str += val + " ";
            }
            str += "\n"
        }

        return str;

    }


    static identity(): Matrix3 { return new Matrix3(1); }

    static zero(): Matrix3 { return new Matrix3(0); }

    static transpose(mat: Matrix3) {
        let copy: Matrix3 = Matrix3.zero();
        return copy.setTransform(
            mat.a[0], mat.a[3], mat.a[6],
            mat.a[1], mat.a[4], mat.a[7],
            mat.a[2], mat.a[5], mat.a[8]
        );

    }

    static determinant(m: Matrix3): number {
        //m Y (row) X (column)

        /*
        * | 0 | 3 | 6 | * | a | c | x | * | m00 | m10 | m20 |
        * | 1 | 4 | 7 | * | b | d | y | * | m01 | m11 | m21 |
        * | 2 | 5 | 8 | * | 0 | 0 | 1 | * | m02 | m12 | m22 |
        */

        const det =
            m.a[0] * m.a[4] * m.a[8] + // m00*m11*m22 +
            m.a[1] * m.a[5] * m.a[6] + // m01*m12*m20 +
            m.a[2] * m.a[3] * m.a[7] - // m02*m10*m21 -
            m.a[0] * m.a[5] * m.a[7] - // m00*m12*m21 - 
            m.a[1] * m.a[3] * m.a[8] - // m01*m10*m22 - 
            m.a[2] * m.a[4] * m.a[6];  // m02*m11*m20;

        return det;
    }

    static determinant2D(m: Matrix3): number {
        return (m.a[0] * m.a[4]) - (m.a[1] * m.a[3]);
    }

    static inverse(m: Matrix3): Matrix3 {
        const det = Matrix3.determinant(m);

        if (det === 0) {
            return m;
        }
        const inv_det = 1.0 / det;
        const b = new Matrix3();

        b.a[0] = inv_det * (m.a[4] * m.a[8] - m.a[5] * m.a[7]); // (m11*m22 - m12*m21)/det;
        b.a[1] = inv_det * (m.a[2] * m.a[7] - m.a[1] * m.a[8]); // (m02*m21 - m01*m22)/det;
        b.a[2] = inv_det * (m.a[1] * m.a[5] - m.a[2] * m.a[4]); // (m01*m12 - m02*m11)/det;

        b.a[3] = inv_det * (m.a[5] * m.a[6] - m.a[3] * m.a[8]); // (m12*m20 - m10*m22)/det;
        b.a[4] = inv_det * (m.a[0] * m.a[8] - m.a[2] * m.a[6]); // (m00*m22 - m02*m20)/det;
        b.a[5] = inv_det * (m.a[2] * m.a[3] - m.a[0] * m.a[5]); // (m02*m10 - m00*m12)/det;

        b.a[6] = inv_det * (m.a[3] * m.a[7] - m.a[4] * m.a[6]); // (m10*m21 - m11*m20)/det;
        b.a[7] = inv_det * (m.a[1] * m.a[6] - m.a[0] * m.a[7]); // (m01*m20 - m00*m21)/det;
        b.a[8] = inv_det * (m.a[0] * m.a[4] - m.a[1] * m.a[3]); // (m00*m11 - m01*m10)/det;

        return b;
    }


    static multiplySlow(a: Matrix3, b: Matrix3): Matrix3 {
        var mat = Matrix3.zero(); // zeroes
        let val;

        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                for (let k = 0; k < 3; ++k) {
                    val = mat.at(i, k);
                    val += a.at(i, j) * b.at(j, k);
                    mat.set(i, k, val);
                }
            }
        }

        return mat;
    }

}

