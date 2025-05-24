import axios from "axios";

/* 
  역할 : 백엔드 소통 axios 객체 생성
  비고 : 
    json 패턴
    쿠키 포함 
*/

export const connectSpring = axios.create({    
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'https://localhost',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

