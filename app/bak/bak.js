/**
 * Created by haifeng on 17/2/23.
 */
import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    ScrollView,
    RefreshControl,
    InteractionManager,
    StyleSheet,
    ListView,
    Animated
} from 'react-native';
import WebViewContainer from '../components/WebViewContainer';

import {fetchLatest} from '../action';

import SideMenu from 'react-native-side-menu'
import Menu from '../view/Menu';


var {height, width} = Dimensions.get('window');
var positionRight = -width;


class InfoListView extends Component {
    constructor(props) {
        super(props);
        const {rightIsOpen} = this.props;
        this.onPressItem = this.onPressItem.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onScrollDown = this.onScrollDown.bind(this);
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            isOpen: rightIsOpen,
            selectedItem: 'Collection',
            digAnim: new Animated.Value(0), // init opacity 0
            fadeAnim: new Animated.Value(0), // init opacity 0
        }
    }

    onPressItem(listContent) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: WebViewContainer,
                name: 'WebViewContainer',
                listContent
            });
        });
    }

    renderContent(dataSource) {
        return (
            <ListView
                initialListSize={1}
                dataSource={dataSource}
                renderRow={this.renderItem}
                style={{backgroundColor: '#f5f5f5', flex: 1}}
                onEndReachedThreshold={10}
                enableEmptySections={true}
            />
        );
    }

    renderItem(listContent) {
        let postTime = Math.floor((Date.parse(new Date()) / 1000 - listContent.last_modified) / 60);
        return (
            <View>
                <TouchableWithoutFeedback onPress={()=> {
                    this.onPressItem(listContent)
                }}>
                    <View style={styles.listItemContainer}>
                        <View style={styles.listItemHeader}>
                            <Text style={styles.contentTitle}>{listContent.title}</Text>
                            <View style={styles.avatarContainer}>
                                <Image style={styles.userAvatar}
                                       source={{uri: 'https:' + listContent.member.avatar_normal}}></Image>
                            </View>
                        </View>
                        <View style={styles.listItemBottom}>
                            <Text style={styles.postTime}>{postTime}分钟前</Text>
                            <View style={styles.listItemBottomRight}>
                                <Text style={styles.userName}>{listContent.member.username}</Text>
                                <Text style={styles.contentClass}>{listContent.node.title}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    onScrollDown() {
        const {dispatch} = this.props;
        dispatch(fetchLatest())
    }

    updateMenuState(isOpen) {
        this.setState({isOpen});
        if (isOpen == 1) {
            Animated.timing(
                this.state.fadeAnim, {
                    toValue: .6,
                    duration: 500
                },
            ).start();
        } else {
            Animated.timing(
                this.state.fadeAnim, {
                    toValue: 0,
                    duration: 500
                },
            ).start();
        }
    }

    onMenuItemSelected = (item) => {
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    }

    render() {
        const {Latest,rightIsOpen} = this.props;
        const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;
        console.log(rightIsOpen);
        return (
            <View style={styles.container}>
                <SideMenu
                    menu={menu}
                    openMenuOffset={250}
                    menuPosition="left"
                    isOpen={this.state.isOpen}
                    onChange={(isOpen) => this.updateMenuState(isOpen)}>
                    {this.state.isOpen ?
                        <TouchableWithoutFeedback onPress={() => this.toggleLeft()}>
                            <Animated.View
                                style={{
                                    opacity: this.state.fadeAnim,
                                    width: width,
                                    height: height,
                                    backgroundColor: '#333',
                                    position: 'absolute',
                                    zIndex: 200
                                }}>
                            </Animated.View>
                        </TouchableWithoutFeedback> : <View/>
                    }
                    <ScrollView
                        style={styles.listContainer}
                        refreshControl={
                            <RefreshControl
                                refreshing={Latest.isLoading}
                                onRefresh={() => this.onScrollDown() }
                                title="正在加载中……"
                                color="#ccc"/>
                        }>
                        {Latest.isLoading ? <View></View> :
                            <View style={{flex:1}}>{this.renderContent(this.state.dataSource.cloneWithRows(Latest.data))}</View>
                        }
                    </ScrollView>
                </SideMenu>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    listContainer: {
        flex: 1,
    },
    listItemContainer: {
        paddingTop: 13,
        padding: 10,
        backgroundColor: '#ffffff',
        borderColor: '#dddddd',
        borderBottomWidth: .5
    },
    listItemHeader: {
        flexDirection: 'row'
    },
    listItemBottom: {
        marginTop: 8,
        flexDirection: 'row'
    },
    listItemBottomRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    contentTitle: {
        flex: 1,
        fontSize: 16
    },
    avatarContainer: {
        width: 60,
        alignItems: 'flex-end'
    },
    postTime: {
        color: '#9f9f9f',
        fontSize: 12
    },
    userAvatar: {
        width: 30,
        height: 30,
        borderRadius: 5
    },
    userName: {
        color: '#75787c',
        fontSize: 12,
        marginRight: 8
    },
    contentClass: {
        color: '#75787c',
        backgroundColor: '#f9f9f9',
        fontSize: 13
    }
});

export default InfoListView;