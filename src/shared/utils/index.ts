import getValue from './getValue';
import objectGet from './objectGet';

function isValid(value: AnyType): boolean {
  if (value !== undefined && value !== null) {
    return true;
  }
  return false;
}

export {
  getValue,
  objectGet,
  isValid,
};
