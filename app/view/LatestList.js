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
    InteractionManager,
    StyleSheet,
    ListView
} from 'react-native';
import WebViewContainer from '../components/WebViewContainer';
import SideMenu from 'react-native-side-menu';
import Menu from '../view/Menu';

var {height, width} = Dimensions.get('window');


class LatestList extends Component {
    constructor(props) {
        super(props);
        const {Latest, route} = this.props;
        this.onPressItem = this.onPressItem.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            list: Latest.data,
            isOpen: route.rightIsOpen
        }
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

    onPressItem(item) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: WebViewContainer,
                name: 'WebViewContainer'
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

    renderItem(listContent, rowID) {
        let postTime = Math.floor((Date.parse(new Date()) / 1000 - listContent.last_modified) / 60);
        return (
            <View>
                <TouchableWithoutFeedback onPress={()=> {
                    this.onPressItem(rowID)
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

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                    {this.renderContent(this.state.dataSource.cloneWithRows(this.state.list))}
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height
    },
    listContainer: {
        flex: 1,
    },
    listItemContainer: {
        paddingTop: 13,
        padding: 10,
        backgroundColor: '#ffffff',
        borderColor: '#dddddd',
        borderTopWidth: .5,
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

export default LatestList;
