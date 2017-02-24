/**
 * Created by haifeng on 17/1/13.
 */
import * as types from '../action/actionTypes';

const initialState = {
    data:{},
    isLoading:true,
    channel:''
};

let listInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_LIST_INIT:
            return {
                ...state,
                isLoading: true
            };
        case types.FETCH_LIST_INFO:
            return {
                ...state,
                isLoading: false,
                data: action.response,
                channel:action.channel
            };
        default:
            return state
    }
}

export default listInfoReducer;