/**
 * Created by haifeng on 17/1/9.
 */

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

let store = applyMiddleware(thunk)(createStore)(rootReducer);
export default store;
