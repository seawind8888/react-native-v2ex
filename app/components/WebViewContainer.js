/**
 * Created by haifeng on 17/1/20.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    WebView,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';

import Util from '../common/utils';

let {height, width} = Dimensions.get('window');

const headerHeight = (Platform.OS === 'ios' ? 65 : 55)
const headerPaddingTop = (Platform.OS === 'ios' ? 35 : 20)

class WebViewContainer extends Component {
    constructor(props) {
        super(props);
        this.buttonBackAction = this.buttonBackAction.bind(this);
        this.state = {
        }
    }

    buttonBackAction() {
        const {navigator} = this.props;
        return Util.NaviGoBack(navigator);
    }

    render() {
        const {route} = this.props;
        return (
            <View style={{flex:1}}>
                <View style={styles.listHeader}>
                    <View style={styles.backButtonContainer}>
                        <TouchableWithoutFeedback onPress={() => {
                            this.buttonBackAction()
                        }}>
                            <Image style={styles.backButton} source={require('../imgs/back.png')}></Image>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.tabTitle}>技术</Text>
                    </View>
                    <View style={styles.backButtonContainer}>
                    </View>
                </View>
                <WebView
                    style={{flex:1}}
                    source={{uri: route.listContent.url}}
                >
                </WebView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    listHeader: {
        width: width,
        height: headerHeight,
        paddingTop: headerPaddingTop,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        position:'relative',
        borderBottomWidth:.5,
        borderColor:'#dddddd'
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center'
    },
    tabTitle: {
        fontSize: 18
    },
    backButtonContainer: {
        width: 20,
        height:20,
        padding: 2
    },
    backButton: {
        width: 14,
        height: 14
    },

});

export default WebViewContainer