import axios from 'axios';

class ApiService {
    static async fetchTide() {
        try {
            const response = await axios.get('http://192.168.1.2:8080/tide/');

            return response.data;

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

export default ApiService;
