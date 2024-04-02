import React, { useState, useEffect } from 'react'
import ApiService from '../../services/ApiService';
import Weather from '../../data/Weather'
import {
    SafeAreaView,
    ScrollView,
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native';

const WeatherComponent = ({ weather, date }) => {

    const [averageTemperature, setAverageTemperature] = useState([]);

    useEffect(() => {
        if (weather) {

            const weatherActive = weather.getWeatherByDate(date);
            const weatherObject = new Weather(weatherActive);
            const averageTemperature = weatherObject.getAverageTemperature();
            console.log(averageTemperature);
            setAverageTemperature(averageTemperature);

        }
    }, [date, weather]);

    return (
        <View style={styles.container}>
            <Text style={styles.weatherTitle}>Météo</Text>
            <View>
                <Text style={styles.averageTemperature}>{averageTemperature}°C</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
    },
    weatherTitle: {
        color: '#fff',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    averageTemperature: {
        color: '#fff',
        fontSize: 32,
        textAlign: 'center',
        marginTop: 24,
    }
});

export default WeatherComponent;
