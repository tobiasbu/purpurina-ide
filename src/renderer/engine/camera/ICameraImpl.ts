import ICamera from "./ICamera";

export default interface ICameraImpl extends ICamera {

    updateTransform();

    resize(width: number, height: number);

}