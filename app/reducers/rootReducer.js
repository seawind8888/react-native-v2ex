/**
 * Created by haifeng on 17/1/10.
 */
import { combineReducers } from 'redux';
import ListInfo from './listInfoReducer';
import RightSlider from './rightSliderReducer'

const rootReducer = combineReducers({
    ListInfo,
    RightSlider
});

export default rootReducer