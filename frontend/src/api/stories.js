import axios from './axios'

export default {
    async getStories(page = 1, limit = 10, sort = 'createdAt:desc') {
        const response = await axios.get(`/stories`, {
            params: {
                'pagination[page]': page,
                'pagination[pageSize]': limit,
                sort
            }
        })
        return response.data
    },

    async getAllStories() {
        const response = await axios.get(`/stories`, {
            params: {
                'pagination[pageSize]': 10000 // Asumimos que no hay más de 10000 historias
            }
        })
        console.log(response.data.data)
        return response.data.data
    }
}