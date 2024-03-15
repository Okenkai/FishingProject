import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import headerImg from '../../assets/images/header.jpeg'

const Header = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={headerImg} resizeMode="cover" style={styles.banner}>
                <Text style={styles.text}>Fishing Tools</Text>
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
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    text: {
        flex: 1,
        top: '4%',
        color: 'white',
        opacity: .5,
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Header;
