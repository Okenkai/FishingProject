import React, { useState, useEffect } from 'react'
import ApiService from '../../services/ApiService';
import Weather from '../../data/Weather'
import {
    SafeAreaView,
    ScrollView,
    View,
    StyleSheet,
    Text,
    StatusBar,
    Image,
} from 'react-native';

const WeatherComponent = ({ navigation }) => {
    const [weatherTemperature, setWeatherTemperature] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await ApiService.fetchWeather();
                const weather = new Weather(data);
                const temperature = weather.getWeatherTemperature();
                setWeatherTemperature(temperature);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();

    }, []);

    const Temperature = weatherTemperature.map((item, index) => {

        return (
            <View key={`${item.date}_${index}`} style={styles.item}>

                <View key={`${item.date}_${item.day}`} style={styles.item}>
                    <Text style={styles.text}>{item.date}</Text>
                    <View style={styles.cell}>
                        {item.weather.map(weather => {
                            const isCelcius = weather.temperature.type === 'celcius';
                            return (
                                <View style={styles.item} key={`${weather.hour}_${item.index}`}>
                                    <Text style={styles.text}>{weather.hour}</Text>
                                    <Text style={styles.text}>{weather.temperature.metric}{isCelcius ? '°C' : '°F'}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>
        )
    })

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
            <ScrollView>
                {Temperature}
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 4,
    },
    cell: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        margin: 4,
    },
    title: {
        flex: 1,
        margin: 16,
        textAlign: 'center',
        color: '#000',
        fontSize: 28,
    },
});

export default WeatherComponent;
