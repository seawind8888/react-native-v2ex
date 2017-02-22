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

var {height,width} = Dimensions.get('window');

const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

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
                <View style={styles.avatarContainer}>
                    <TouchableWithoutFeedback>
                        <Image
                            style={styles.avatar}
                            source={{ uri, }}/>
                    </TouchableWithoutFeedback>
                    <Text style={styles.name}>Your name</Text>
                </View>
                <Text
                    onPress={() => this.props.onItemSelected('Collection')}
                    style={styles.item}>
                    收藏过的
                </Text>
                <Text
                    onPress={() => this.props.onItemSelected('Favorite')}
                    style={styles.item}>
                    点过赞的
                </Text>
                <Text
                    onPress={() => this.props.onItemSelected('Sitting')}
                    style={styles.item}>
                    设置
                </Text>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: width,
        height: height,
        padding:20,
        backgroundColor: '#e3e3e3'
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
});
export default Menu