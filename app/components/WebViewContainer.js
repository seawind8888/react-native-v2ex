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
    TouchableWithoutFeedback
} from 'react-native';

let {height, width} = Dimensions.get('window');

class WebViewContainer extends Component {
    constructor(props) {
        super(props);
        this.buttonBackAction = this.buttonBackAction.bind(this);
        this.state = {
        }
    }

    componentWillMount() {
    }

    render() {
        const {news} = this.props;
        console.log(news);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableWithoutFeedback onPress={() => {
                    }}>
                        <Image style={styles.back_arrow}></Image>
                    </TouchableWithoutFeedback>
                </View>
                <WebView
                    style={{flex:1}}
                    source={{uri: news.post_source}}
                >
                </WebView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        width: width,
        height: 60,
        paddingTop: 20,
        paddingLeft: 10,
        backgroundColor: '#e3e3e3',
        justifyContent: 'center'
    },
    back_arrow: {
        width: 20,
        height: 20
    },
    container: {
        flex:1
    }
});

export default WebViewContainer