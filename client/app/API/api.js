import axios from "axios";

export async function checkAuth() {
    axios.defaults.withCredentials = true;
    try {
        const response = await axios.post('http://localhost:5050/auth/authenticated');
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function getUsername() {
    axios.defaults.withCredentials = true;
    try {
        const response = await axios.get('http://localhost:5050/auth/user');
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function getContent(user) {
    try {
        const response = await axios.get(`http://localhost:5050/img?user=${user}`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function postContent(form) {
    try {
        const response = await axios.post('http://localhost:5050/img', form)
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function deleteContent(id) {
    try {
        const response = await axios.delete(`http://localhost:5050/img/${id}`)
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function logout() {
    try {
        const response = await axios.post(`http://localhost:5050/auth/logout`)
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}