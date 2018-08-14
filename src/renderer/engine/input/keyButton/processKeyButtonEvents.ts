import KeyButtonControl, { KeyButtonStatus } from "./KeyButtonControl";
/**
 * 
 * @param {KeyboardEvent|MouseEvent} event 
 * @param {Button} button 
 */
export function processKeyButtonUp(event: KeyboardEvent | MouseEvent, button: KeyButtonControl) {

    if (button.preventDefault === true) {
        event.preventDefault();
    }

    if (!button.enabled) {
        return;
    }

    if (button.up === true) {
        if (button.status === KeyButtonStatus.POST_PRESSED) {
            button.status = KeyButtonStatus.RELEASED;
        }

        return;
    }


    // set key properties
    button.press = false;
    button.down = false;
    button.up = true;

    // set press time duration
    button.upTime = event.timeStamp;
    button.downDuration = button.upTime - button.downTime;
    button.upDuration = 0;
    button.downTime = 0;


    button.status = KeyButtonStatus.RELEASED;

}

/**
 * 
 * @param {KeyboardEvent|MouseEvent} event 
 * @param {KeyButtonControl} button 
 */
export function processKeyButtonDown(event: KeyboardEvent | MouseEvent, button: KeyButtonControl) {

    if (button.preventDefault === true) {
        event.preventDefault();
    }

    if (!button.enabled) {
        return;
    }

    if (button.down === true) {
        if (button.status === KeyButtonStatus.PRESSED) {
            button.status = KeyButtonStatus.POST_PRESSED;
        }

        return;
    }

    // set key properties
    button.press = true;
    button.down = true;
    button.up = false;

    // set press time duration
    button.downTime = event.timeStamp; 
    button.downDuration = 0;
    button.upDuration = button.downTime - button.upTime;

    button.status = KeyButtonStatus.PRESSED;


}