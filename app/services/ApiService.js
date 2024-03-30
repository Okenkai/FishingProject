import axios from 'axios';

class ApiService {

    static async fetchTide() {
        try {
            const response = await fetch('http://192.168.1.11:8080/API/V1/tide/82');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            return data;

        } catch (error) {

            console.error('Error fetching Tide data:', error);
            throw error;
        }
    }

    static async fetchWeather() {
        try {
            const response = await fetch('http://192.168.1.11:8080/API/V1/weather/9478');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            return data;

        } catch (error) {

            console.error('Error fetching weather data:', error);
            throw error;
        }
    }

}

export default ApiService;
