/**
 * Created by haifeng on 17/2/24.
 */
import * as types from './actionTypes'

var rightIsOpen = false;

export let rightSliderOpen = (Open) => {
    if(Open){
        rightIsOpen = Open
    }
    rightIsOpen = !rightIsOpen;
    if(rightIsOpen){
        return {
            type: types.RIGHT_SLIDER_OPEN
        }
    }else{
        return {
            type: types.RIGHT_SLIDER_CLOSE
        }
    }

};
