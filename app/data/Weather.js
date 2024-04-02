class Weather {

    constructor(data) {
        this.data = data;
    }

    getWeather() {
        return this.data;
    }

    getWeatherDate() {
        const weatherDates = [];
        this.data.map(entry => {
            let wheatherDay = entry.day + '.' + entry.date;
            weatherDates.push(wheatherDay);
        });

        return weatherDates;

    }

    getWeatherTemperature() {
        const weatherTemperature = this.browseData('temperature');
        return weatherTemperature;
    }


    getWeatherByDate(date) {
        return this.data.filter(entry => `${entry.day}.${entry.date}` === date);
    }

    getAverageTemperature() {

        if (!Array.isArray(this.data)) {
            throw new Error(`Data in Weather Object is not an array.`, 400);
        }
        const weatherTemperatureObject = this.data.flatMap(entry => entry.weather.map(weather => weather.temperature.metric));

        const sum = + weatherTemperatureObject.map(temperature => parseInt(temperature)).reduce((acc, val) => acc + val, 0)

        const average = weatherTemperatureObject.length > 0 ? sum / weatherTemperatureObject.length : 0;

        return average;

    }

    browseData(dataName) {
        const weatherArray = [];

        if (!Array.isArray(this.data)) {
            throw new Error(`Data in Weather Object is not an array.`, 400);
        }
        this.data.forEach(day => {
            const dailyWeather = {
                date: `${day.day}.${day.date}`,
                weather: []
            };

            if (!Array.isArray(day.weather)) {
                throw new Error(`Data in Weather Object is not an array.`, 400);
            }
            day.weather.forEach(hour => {
                dailyWeather.weather.push({
                    hour: hour.hour,
                    [dataName]: hour[dataName]
                });
            });

            weatherArray.push(dailyWeather);
        });

        return weatherArray;
    }
}

export default Weather;
