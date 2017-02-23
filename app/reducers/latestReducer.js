/**
 * Created by haifeng on 17/1/13.
 */
import * as types from '../action/actionTypes';
import React, {
    ListView
} from 'react-native'

const initialState = {
    data:{},
    isLoading:true,
};

let latestReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_LATEST_INIT:
            return {
                ...state,
                isLoading: true
            };
        case types.FETCH_LATEST_LIST:
            return {
                ...state,
                isLoading: false,
                data: action.response
            };
        default:
            return state
    }
}

export default latestReducer;