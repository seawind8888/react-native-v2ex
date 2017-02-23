/**
 * Created by haifeng on 17/2/22.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    View
} from 'react-native';
import App from './view/App';
import { Provider } from 'react-redux';
import store from './store/configureStore';

export default class root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}