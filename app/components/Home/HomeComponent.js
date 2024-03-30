import React, { useState, useEffect } from 'react'
import NotificationService from '../../services/NotificationService';
import { useSocket } from '../../context/Socket';
import {
    View,
    StyleSheet,
    ImageBackground,
    Text,
    StatusBar,
    Image,
    TouchableOpacity
} from 'react-native';
import logo from '../../assets/icons/SABLC2.png'
import headerImg from '../../assets/images/sky-cloud.jpg'

const Home = ({ navigation }) => {

    const socket = useSocket();
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {

        NotificationService.registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token)
        });
    }, []);

    const pushToken = () => {
        if (socket && expoPushToken) {
            socket.emit('accessToken', expoPushToken);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
            <ImageBackground source={headerImg} resizeMethod='scale' resizeMode="cover" style={styles.banner}>
                <TouchableOpacity onPress={() => {
                    pushToken();
                    navigation.navigate('List');
                }}>
                    <Image style={styles.logo} source={logo} />
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    banner: {
        flex: 1,
        justifyContent: 'center',
        minHeight: '100%',
        position: 'relative'
    },
    logo: {
        flex: 1,
        position: 'absolute',
        bottom: -100,
        left: -65,
    },
});

export default Home;
