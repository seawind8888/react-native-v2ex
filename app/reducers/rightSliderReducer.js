/**
 * Created by haifeng on 17/2/24.
 */
import * as types from '../action/actionTypes';

const initialState = {
    isOpen: false
};

let rightSliderReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RIGHT_SLIDER_CLOSE:
            return {
                ...state,
                isOpen: false
            };
        case types.RIGHT_SLIDER_OPEN:
            return {
                ...state,
                isOpen: true
            };
        default:
            return state
    }
}

export default rightSliderReducer;