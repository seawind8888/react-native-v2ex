/**
 * Created by haifeng on 17/2/22.
 */
import Util from '../common/utils'
import * as types from './actionTypes'

export function fetchLatest() {
    let URL = 'https://www.v2ex.com/api/topics/latest.json';

    return dispatch => {
        dispatch(fetchLatestInit());

        Util.fetchData(URL, 'get','',(response) => {
            dispatch(fetchLatestList(response));
        }, (error) => {alert(error);
            dispatch(fetchLatestList(error))
        })
    }
}

let fetchLatestInit = (response) => {
    return {
        type: types.FETCH_LATEST_INIT,
        response
    }
};

let fetchLatestList = (response) => {
    return {
        type: types.FETCH_LATEST_LIST,
        response
    }
};