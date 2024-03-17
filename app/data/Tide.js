class TideManager {

    constructor(data) {
        this.data = data;
    }

    getTide() {
        return this.data;
    }

    getHighTidesForDate(date) {
        return this.data.find(entry => entry.date === date);
    }

    // Fonction pour calculer le score de pêche pour chaque jour
    calculateFishingScore(day) {
        // Score initialisé à 0
        let score = 0;

        // Ajouter le score basé sur les coefficients de marée
        if (day.coeff) {
            score += Math.min(...day.coeff);
        }

        // Ajouter le score basé sur les conditions météorologiques
        if (day.temperature && day.wind && day.wind.average && day.wind.gust) {
            // Calculer le score en fonction de la température, de la vitesse moyenne et des rafales de vent
            const windScore = (day.wind.average + day.wind.gust) / 2;
            const tempScore = 15 - Math.abs(12 - parseInt(day.temperature.metric, 10));
            score += tempScore + windScore;
        }

        return score;
    }

    // Fonction pour trouver le meilleur jour pour la pêche
    findBestFishingDay(data) {
        let bestDay = null;
        let maxScore = 0;
        console.log(data);
        // Parcourir les données pour chaque jour
        data.tide.forEach(tideDay => {
            // Trouver les données météorologiques correspondantes
            const weatherDay = data.weather.find(weather => weather.day === tideDay.day && weather.date === tideDay.date);

            // Calculer le score de pêche pour ce jour
            const score = this.calculateFishingScore({ tide: tideDay, weather: weatherDay });

            // Mettre à jour le meilleur jour si le score est plus élevé
            if (score > maxScore) {
                maxScore = score;
                bestDay = tideDay.day;
            }
        });

        return bestDay;
    }


}

export default TideManager;
