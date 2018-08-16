import Transform2D from "./Transform2D";
import Bounds2D from "../bounds/Bounds2D";
import Matrix3 from "../Matrix3";



/**
 * Compute entities transform
 * @param transform The transform to compute
 * @param parentTransform Optional: Parent transform to concat to it
 */
export function computeTransform2D(transform: Transform2D, parentTransform?: Transform2D) {

    if (!transform.isDirty) {
        return;
    }

    if (parentTransform && !parentTransform.isDirty) {
        return;
    }

    if (transform.rotation !== transform._oldRotation) {
        transform._oldRotation = transform.rotation;
        transform._cosSin.y = Math.sin(transform.rotation);
        transform._cosSin.x = Math.cos(transform.rotation);
    }

    transform.matrix.setModelMatrix(
        transform.position,
        transform.scale,
        transform._cosSin);

    if (parentTransform) {
        transform.matrix.concat(parentTransform.matrix);
    }

}

/**
 * Computes the 2D bounding box for renderables.
 * @param bounds 
 * @param matrix 
 * @param width 
 * @param height 
 * @param origin 
 */
export function computeBounds2D(bounds: Bounds2D, matrix: Matrix3, width: number, height: number, origin: IVector2) {

    let top = matrix.transformPoint(-origin.x, -origin.y);
    let left = matrix.transformPoint(width - origin.x, -origin.y);
    let bottom = matrix.transformPoint(-origin.x, height - origin.y);
    let right = matrix.transformPoint(width - origin.x, height - origin.y);

    bounds.min.x = Math.min(top.x, left.x, bottom.x, right.x);
    bounds.min.y = Math.min(top.y, left.y, bottom.y, right.y);
    bounds.max.x = Math.max(top.x, left.x, bottom.x, right.x);
    bounds.max.y = Math.max(top.y, left.y, bottom.y, right.y);

}

// function computeDelimiterPoint(position: IVector2, rotation: IVector2, anchor?: IVector2): IVector2 {

//     let coord = {x:0, y:0};

//     if (anchor === undefined) {
//         coord.x = (position.x * rotation.x) - (position.y * rotation.y);
//         coord.y = (position.x * rotation.y) - (position.y * rotation.x);
//     } else {

//         let xa = position.x - anchor.x;
//         let ya = position.y - anchor.y;
//     // cx = anchor.x + ((x-anchor.x) * Math.cos(rotation)) - ((y-anchor.y) * Math.sin(rotation));
//         coord.x = anchor.x + (xa * rotation.x) - (ya * rotation.y);
//     // cy = anchor.y - ((x-anchor.x) * Math.sin(rotation)) - ((y-anchor.y) * Math.cos(rotation));
//         coord.y = anchor.y - (xa * rotation.y) - (ya * rotation.x);
//     }

//     return coord;
// }

