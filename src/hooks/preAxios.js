import axios from "axios";

// axios.defaults.withCredentials = true; // 모든 요청에 쿠키 포함

export const connectSpring = axios.create({    
    baseURL: 'https://localhost',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 쿠키 포함
});

