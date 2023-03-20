import api from '../api'

export const registerParner = async (data) => {

    return await api.post('/signuppartner',data);
}