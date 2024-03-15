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
}

export default TideManager;
