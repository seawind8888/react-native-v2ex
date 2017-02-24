/**
 * Created by haifeng on 16/12/27.
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

import {fetchList} from '../action/fetchListAction';
import {rightSliderOpen} from '../action/righSliderAction';


var {height, width} = Dimensions.get('window');


class InfoListView extends Component {

    constructor(props) {
        super(props);
        this.onPressItem = this.onPressItem.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onScrollDown = this.onScrollDown.bind(this);
        this.fetchInfoTransition = this.fetchInfoTransition.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            selectedItem: 'Collection',
            digAnim: new Animated.Value(0)
        }
    }

    componentDidMount() {

    }

    componentWillUpdate(nextProps, nextState){

    }

    componentDidUpdate(nextProps, nextState){
        const {RightSlider} = this.props;
        if(RightSlider.isOpen == 1){
            Animated.timing(
                this.state.digAnim, {
                    toValue: 130,
                    duration: 200
                },
            ).start();
        }else{
            Animated.timing(
                this.state.digAnim, {
                    toValue: 0,
                    duration: 200
                },
            ).start();
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
        dispatch(fetchList())
    }

    fetchInfoTransition(channel) {
        const {dispatch} = this.props;
        Animated.timing(
            this.state.digAnim, {
                toValue: 0,
                duration: 200
            },
        ).start();
        setTimeout(()=>{
            dispatch(fetchList(channel));
            dispatch(rightSliderOpen(false));
        },200)
    }


    render() {
        const {ListInfo} = this.props;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.listContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={ListInfo.isLoading}
                            onRefresh={() => this.onScrollDown() }
                            title="正在加载中……"
                            color="#ccc"/>
                    }>
                    {ListInfo.isLoading ? <View></View> :
                        <View style={{flex: 1, position: 'relative'}}>
                            <Animated.View
                                style={{
                                    position:'relative',
                                    right:this.state.digAnim,
                                    zIndex:100
                                }}>
                                {this.renderContent(this.state.dataSource.cloneWithRows(ListInfo.data))}
                            </Animated.View>
                            <View style={styles.rightSliderContainer}>
                                <TouchableWithoutFeedback onPress={()=> { this.fetchInfoTransition() }}>
                                    <View style={styles.rightSliderOptionsContainer}>
                                        <Text style={styles.rightSliderOptions}>最新</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={()=>{  this.fetchInfoTransition('hot')}}>
                                    <View style={styles.rightSliderOptionsContainer}>
                                        <Text style={styles.rightSliderOptions}>最热</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    }
                </ScrollView>

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
    },
    rightSliderContainer: {
        width: 130,
        height: height,
        position: 'absolute',
        right: 0,
        backgroundColor: '#fafafa',
        borderLeftWidth:1,
        borderColor:'#efefef',
        paddingTop:10,
        paddingLeft:18,
        flexWrap:'wrap'
    },
    rightSliderOptionsContainer:{
        height:36,
        justifyContent:'center'
    },
    rightSliderOptions:{
        color:'#8d8d8d',
        fontSize:18
    }
});

export default InfoListView;
