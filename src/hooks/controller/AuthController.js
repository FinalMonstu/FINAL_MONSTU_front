import { connectSpring } from "../preAxios";
import { responseStatus, errorStatus } from "../handleStatus"

const authController = (url,type='post',data=null) => {
    const baseUrl = '/api/auth';
    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}

// 이메일 중복 검사
export const emailAvail = async (text) => {
    console.log("text: "+text)
    try {
        const response = await authController(`/email/avail?email=${text}`, 'get');
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 이메일 인증 코드 전송
export const sendEmailCode = async (dto) => {
    try {
        const response = await authController(`/email/send`, 'post',dto);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 인증 코드 검증
export const verifyEmailCode = async (dto) => {
    try {
        const response = await authController(`/email/verify`, 'post',dto);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 회원가입
export const signup = async (dto) => {
    try {
        const response = await authController(`/signup`, 'post',dto);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};