/**
 * Created by haifeng on 16/12/29.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    InteractionManager,
    DrawerLayoutAndroid,
    Platform
} from 'react-native';
import SideMenu from 'react-native-side-menu'
import LatestList from '../view/LatestList';
import Menu from '../view/Menu';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';
import {fetchLatest} from '../action';


var {height, width} = Dimensions.get('window');

class AppMain extends Component {
    constructor(props) {
        super(props);
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this);
        this.state = {
            isOpen: false,
            rightIsOpen: false,
            selectedItem: 'Collection'
        }
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(fetchLatest());
    }

    componentDidMount() {

    }

    toggleLeft() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    toggleRight() {
        this.setState({
            rightIsOpen: !this.state.rightIsOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({isOpen,});
    }

    onMenuItemSelected = (item) => {
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    }

    render() {
        const {Latest} = this.props;
        console.log(this.state.rightIsOpen);
        const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;
        return (
            <View style={{flex: 1}}>
                {Latest.isLoading ? <View style={styles.waitingBlock}>
                    <Progress.Circle size={40} indeterminate={true}/></View> :
                    <SideMenu
                        menu={menu}
                        isOpen={this.state.isOpen}
                        onChange={(isOpen) => this.updateMenuState(isOpen)}>
                        <View>
                            <View style={styles.listHeader}>
                                <TouchableOpacity style={styles.slideButton} onPress={() => this.toggleLeft()}>
                                    <Image source={require('../imgs/slideButton.png')} style={styles.slideButtonImg}/>
                                </TouchableOpacity>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.tabTitle}>技术</Text>
                                </View>
                                <TouchableOpacity style={styles.slideButton} onPress={() => this.toggleRight()}>
                                    <Image source={require('../imgs/moebutton.png')} style={styles.slideButtonImg}/>
                                </TouchableOpacity>
                            </View>
                            <LatestList {...this.props}/>
                        </View>
                    </SideMenu>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listHeader: {
        width: width,
        height: 65,
        paddingTop: 35,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center'
    },
    slideButton: {
        width: 20,
        padding: 2
    },
    waitingBlock: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slideButtonImg: {
        width: 14,
        height: 14
    },
    tabTitle: {
        fontSize: 18
    }
});

export default connect((state) => {
    const {Latest} = state;
    console.log(state);
    return {
        Latest
    }
})(AppMain);





