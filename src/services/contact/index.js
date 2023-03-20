import api from '../api'

export const sendMensagem = async (data) => {

    return await api.post('/contact',data)
}