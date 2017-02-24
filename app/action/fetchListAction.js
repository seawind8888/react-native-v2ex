/**
 * Created by haifeng on 17/2/22.
 */
import Util from '../common/utils'
import * as types from './actionTypes'

export function fetchList(channel) {
    var URL;
    if (channel == 'latest') {
        URL = 'https://www.v2ex.com/api/topics/latest.json';
    } else if (channel == 'hot') {
        URL = 'https://www.v2ex.com/api/topics/hot.json';
    } else {
        URL = 'https://www.v2ex.com/api/nodes/show.json?name='
    }


    return dispatch => {
        dispatch(fetchListInit());

        Util.fetchData(URL, 'get', '', (response) => {
            dispatch(fetchListInfo(response,channel));
        }, (error) => {
            alert(error);
            dispatch(fetchListInfo(error,channel))
        })
    }
}

let fetchListInit = (response) => {
    return {
        type: types.FETCH_LIST_INIT,
        response
    }
};

let fetchListInfo = (response,channel) => {
    return {
        type: types.FETCH_LIST_INFO,
        response,
        channel
    }
};

