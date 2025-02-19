import axios from 'axios'

const API_URL = 'http://localhost:1337/api'

export default {
    async getStories(page = 1, limit = 10, sort = 'createdAt:desc') {
        const response = await axios.get(`${API_URL}/stories`, {
            params: {
                'pagination[page]': page,
                'pagination[pageSize]': limit,
                sort
            }
        })
        return response.data
    },

    async getAllStories() {
        const response = await axios.get(`${API_URL}/stories`, {
            params: {
                'pagination[pageSize]': 10000 // Asumimos que no hay más de 10000 historias
            }
        })
        console.log(response.data.data)
        return response.data.data
    }
}