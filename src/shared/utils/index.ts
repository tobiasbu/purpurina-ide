import getValue from './getValue';
import objectGet from './objectGet';

function isValid(value: any): boolean {
  if (value === undefined || value === null) {
    return false;
  }
  return true;
}

export {
  getValue,
  objectGet,
  isValid,
};
