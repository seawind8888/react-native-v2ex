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
import App from './view/HomePage';
import { Provider } from 'react-redux';
import store from './store/configureStore';

export default class rootApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}