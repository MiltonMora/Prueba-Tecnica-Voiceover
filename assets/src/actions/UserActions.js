import axios from 'axios';

const baseUri = 'http://prueba-tecnica-voiceover.test/api/'; 

export function Login(data) {
    try {
       return axios.post(`${baseUri}login`, data )
    }
    catch(error) {
        console.log(error.message);
    }
}

export function getUsers() {
    try {
        const auth = localStorage.getItem('tk');
       return axios.get(`${baseUri}users?api_token=${auth}`)
    }
    catch(error) {
        console.log(error.message);
    }
}

export function getRoles() {
    try {
        const auth = localStorage.getItem('tk');
       return axios.get(`${baseUri}roles?api_token=${auth}`)
    }
    catch(error) {
        console.log(error.message);
    }
}

export function setRoles(data) {
    try {
        const auth = localStorage.getItem('tk');
       return axios.post(`${baseUri}user/roles?api_token=${auth}`, data)
    }
    catch(error) {
        console.log(error.message);
    }
}