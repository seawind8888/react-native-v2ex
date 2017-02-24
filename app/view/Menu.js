/**
 * Created by haifeng on 16/12/29.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    InteractionManager,
    View,
    Image,
    Text,
    TouchableWithoutFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

var {height,width} = Dimensions.get('window');

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onItemSelected: React.PropTypes.func.isRequired,
        }
    }

    render() {
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.leftSliderHeader}>
                    <TouchableWithoutFeedback>
                        <View style={styles.avatarContainer}>
                        <Image
                            style={styles.avatar}
                            source={require('../imgs/user.png')}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.leftSliderMain}>
                    <View style={styles.leftSliderItem}>
                        <Icon name="md-time" size={20} color="#737373"/>
                        <Text
                            onPress={() => this.props.onItemSelected('Collection')}
                            style={styles.leftItemText}>
                            最新
                        </Text>
                    </View>
                    <View style={styles.leftSliderItem}>
                        <Icon name="md-book" size={20} color="#737373"/>
                        <Text
                            onPress={() => this.props.onItemSelected('Favorite')}
                            style={styles.leftItemText}>
                            分类
                        </Text>
                    </View>
                    <View style={styles.leftSliderItem}>
                        <Icon name="md-share" size={20} color="#737373"/>
                        <Text
                            onPress={() => this.props.onItemSelected('Sitting')}
                            style={styles.leftItemText}>
                            节点
                        </Text>
                    </View>
                    <View style={styles.leftSliderItem}>
                        <Icon name="md-star-outline" size={20} color="#737373"/>
                        <Text
                            onPress={() => this.props.onItemSelected('Sitting')}
                            style={styles.leftItemText}>
                            收藏
                        </Text>
                    </View>
                    <View style={styles.leftSliderItem}>
                        <FontAwesome name="bell-o" size={20} color="#737373"/>
                        <Text
                            onPress={() => this.props.onItemSelected('Sitting')}
                            style={styles.leftItemText}>
                            提醒
                        </Text>
                    </View>
                    <View style={styles.leftSliderItem}>
                        <FontAwesome name="user-o" size={20} color="#737373"/>
                        <Text
                            onPress={() => this.props.onItemSelected('Sitting')}
                            style={styles.leftItemText}>
                            个人
                        </Text>
                    </View>
                </View>

            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    menu: {
        height:height,
        width:width,
        flex:1,
        backgroundColor: '#fafafa',
        position:'relative',
        zIndex:300
    },
    leftSliderHeader:{
        paddingTop:30,
        paddingBottom:20,
        paddingLeft:30,
        borderBottomWidth:.5,
        borderColor:'#dddddd'
    },
    avatarContainer: {
        padding:10,
        width:68,
        borderWidth:1,
        borderColor:'#757575',
        borderRadius:5,
    },
    avatar: {
        width: 48,
        height: 48
    },
    leftSliderMain: {
        padding:10
    },
    leftSliderItem: {
        height:60,
        paddingLeft:20,
        flexDirection:'row',
        alignItems:'center'
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    leftItemText: {
        fontSize: 16,
        marginLeft:30,
        color:'#727272',
        fontWeight: 'bold',
        paddingBottom:3,
        flex:1
    },
});
export default Menu