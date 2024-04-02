import React, { useState, useEffect } from 'react'
import NotificationService from '../../services/NotificationService';
import { useSocket } from '../../context/Socket';
import ApiService from '../../services/ApiService';
import Tide from '../../data/Tide';
import Weather from '../../data/Weather';
import TideComponent from '../Tide/TideComponent';
import WeatherComponent from '../Weather/WeatherComponent';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native';

const Home = ({ navigation }) => {

    const socket = useSocket();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [tideDateArray, setTideDateArray] = useState([]);
    const [tideObject, setTideObject] = useState(null);
    const [weatherObject, setWeatherObject] = useState(null);
    const [isActive, setIsActive] = useState(0);
    const [activeDate, setActiveDate] = useState('');

    useEffect(() => {

        NotificationService.registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token)
        });

        ApiService.fetchTide()
            .then(data => {
                const tide = new Tide(data);
                const tideDate = tide.getTideDate();

                setTideObject(tide);
                setActiveDate(tideDate[0].date)
                setTideDateArray(tideDate);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        ApiService.fetchWeather()
            .then(data => {
                const weather = new Weather(data);
                setWeatherObject(weather);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, []);

    const pushToken = () => {
        if (socket && expoPushToken) {
            socket.emit('accessToken', expoPushToken);
        }
    }

    const handleIsActiveItem = (index, date) => {
        setIsActive(index);
        setActiveDate(date);
    }

    const weeklyNav = tideDateArray.map((tide, index) => {
        return (
            <TouchableOpacity
                key={tide.date}
                style={isActive === index ? [styles.navItemActive, styles.navItem] : styles.navItem}
                onPress={() => handleIsActiveItem(index, tide.date)}
            >
                <Text style={isActive === index ? [styles.navContentActive, styles.navItem] : styles.navContent}>{tide.date}</Text>
            </TouchableOpacity>
        )
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
            <Text style={styles.title}>Marées de la semaine</Text>
            <View style={styles.navContainer}>
                {weeklyNav}
            </View>
            <ScrollView>
                {tideObject && <TideComponent tide={tideObject} date={activeDate} />}
                {weatherObject && <WeatherComponent weather={weatherObject} date={activeDate} />}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        padding: 16
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        alignItems: 'center',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    navContent: {
        color: 'grey',
        fontSize: 10,
    },
    navContentActive: {
        color: '#fff',
        fontSize: 10,
    },
    navItemActive: {
        width: 48,
        height: 40,
        borderRadius: 32 / 2,
        backgroundColor: 'red',
        color: '#fff'
    }
});

export default Home;
