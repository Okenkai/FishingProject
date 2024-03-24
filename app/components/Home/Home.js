import React from 'react';
import { View, StyleSheet, ImageBackground, Text, StatusBar } from 'react-native';
import headerImg from '../../assets/images/header.jpeg'

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
            <ImageBackground source={headerImg} resizeMethod='scale' resizeMode="cover" style={styles.banner}>
                <Text style={styles.text}
                    onPress={() =>
                        navigation.navigate('List')
                    }
                >Start</Text>
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
        minHeight: '100%'
    },
    text: {
        flex: 1,
        top: '40%',
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Home;
