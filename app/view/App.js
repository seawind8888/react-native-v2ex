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
import AppMain from './AppMain'

class App extends Component {
    constructor(props) {
        super(props)
    }

    _renderScene(route, navigator) {
        let Component = route.component;
        return (
            <Component navigator={navigator} route={route} {...route.passProps}/>
        );
    }

    _configureScene() {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Navigator
                    ref='navigator'
                    style={{flex:1}}
                    configureScene={this._configureScene}
                    renderScene={this._renderScene}
                    initialRoute={{
                        component: AppMain,
                        name: 'AppMain'
                    }}
                />
            </View>
        )
    }
}

export default App