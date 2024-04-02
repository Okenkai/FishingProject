class Tide {

    constructor(data) {
        this.data = data;
    }

    getTide() {
        return this.data;
    }

    getTideDate() {
        const tideDates = [];
        this.data.map(entry => {
            const tideDay = {
                date: entry.day + '.' + entry.date
            };
            tideDates.push(tideDay);
        });

        return tideDates;

    }

    getTideByDate(date) {
        return this.data.find(entry => `${entry.day}.${entry.date}` === date);
    }

}

export default Tide;
