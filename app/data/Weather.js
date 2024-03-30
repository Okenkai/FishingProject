class WeatherManager {

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
        return this.data.find(entry => entry.date === date);
    }

    browseData(dataName) {

        const weatherArray = [];

        this.data.forEach(day => {
            const dailyWeather = {
                date: `${day.day}.${day.date}`,
                weather: []
            };

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

export default WeatherManager;
