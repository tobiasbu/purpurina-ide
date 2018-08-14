import { processKeyButtonDown, processKeyButtonUp } from '../../keyButton/processKeyButtonEvents'
import KeyButtonControl from '../../keyButton/KeyButtonControl';
import MouseSystem from '../MouseSystem';
import SharedInputData from '../../SharedInputData';
import MathUtils from '../../../../engine/math/MathUtils';

/*
 Left button=1, 
 Right button=2, 
 Middle (wheel) button=4, 
 4th button (typically, "Browser Back" button)=8,
 5th button (typically, "Browser Forward" button)=16.
*/

function computeMousePos(mouse: MouseSystem, inputData: SharedInputData, clientX: number, clientY: number) {
    mouse.normalizedPosition.x = inputData.normTransformX(clientX);
    mouse.normalizedPosition.y = inputData.normTransformY(clientY);
    mouse.position.x = MathUtils.floor(mouse.normalizedPosition.x * inputData.canvas.width);
    mouse.position.y = MathUtils.floor(mouse.normalizedPosition.y * inputData.canvas.height);
}

/**
 * 
 * @param {MouseEvent} event 
 * @param {KeyButtonControl} button 
 * @param {MouseSystem} mouse 
 * @param {InputData} inputData
 */
export function processMouseButtonDown(event: MouseEvent, button: KeyButtonControl, mouse: MouseSystem, inputData: SharedInputData) {

    if (event.buttons) {
        mouse.buttons = event.buttons;
    }

    mouse.clientPosition.set(inputData.clientRectTransformX(event.pageX), inputData.clientRectTransformY(event.pageY));
    computeMousePos(mouse, inputData, event.clientX, event.clientY);

    mouse.isDown = true;

    processKeyButtonDown(event, button);

    mouse.lastEvent = event;

    mouse.isDirty = true;

}

/**
 * 
 * @param { MouseEvent } event
 * @param { Button } button
 * @param { MouseSystem } mouse
 * @param { InputData } inputData
 */
export function processMouseButtonUp(event: MouseEvent, button: KeyButtonControl, mouse: MouseSystem, inputData: SharedInputData) {

    if (event.buttons) {
        mouse.buttons = event.buttons;
    }

    processKeyButtonUp(event, button);

    mouse.clientPosition.set(inputData.clientRectTransformX(event.pageX), inputData.clientRectTransformY(event.pageY));
    computeMousePos(mouse, inputData, event.clientX, event.clientY);

    mouse.lastEvent = event;

    mouse.isDirty = true;
    mouse.isDown = false;

}


/**
 * 
 * @param {MouseEvent} event 
 * @param {MouseSystem} mouse 
 * @param {InputData} inputData 
 */
export function processMouseMove(event: MouseEvent, mouse: MouseSystem, inputData: SharedInputData) {

    mouse.lastEvent = event;

    //mouse.clientPosition.set(event.clientX, event.clientY);

    mouse.clientPosition.set(inputData.clientRectTransformX(event.pageX), inputData.clientRectTransformY(event.pageY));
    computeMousePos(mouse, inputData, event.clientX, event.clientY);

    mouse.moved = true;

    mouse.isDirty = true;

}

export function processMouseWheel(event: WheelEvent | MouseWheelEvent, mouse: MouseSystem) {



    mouse.lastEvent = event;
    mouse.wheelDelta = event.wheelDelta || event.detail;
    // mouse.delta.x =  event.deltaX;
    // mouse.delta.y =  event.deltaY;
    // mouse.delta.z =  event.deltaZ;

    //event.wheelDeltaX;
    //event.wheelDeltaY;
    

}