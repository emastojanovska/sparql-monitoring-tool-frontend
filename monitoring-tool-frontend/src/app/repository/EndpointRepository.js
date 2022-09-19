import axios from '../axios/axios'

const EndpointRepository = {
    getAllEndpoints: (queryDTO) => {
        return axios.get('/endpoints')
    },

    createEndpoint: (dto) => {
        return axios.post('/endpoints/create', dto)
    },

    removeEndpoint: (dto) => {
        return axios.post(`/endpoints/remove`, dto)
    }
}

export default EndpointRepository;