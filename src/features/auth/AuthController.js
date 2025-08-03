import { connectSpring } from "../../common/hooks/preAxios";
import { responseStatus, errorStatus } from "../../common/hooks/handleStatus"

/* 
  역할 : 서버 AuthController와 소통
*/
const authController = (url,type='post',data=null) => {
    const baseUrl = '/api/v2/auth';
    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
    if(type==='put') return connectSpring.put(baseUrl+url,data);
    if(type==='patch') return connectSpring.patch(baseUrl+url,data);
    if(type==='delete') return connectSpring.delete(baseUrl+url,data);
}

// 이메일 중복 검사
export const emailAvail = async (email) => {
    try {
        const response = await authController(`/email-avail?email=${email}`, 'get');
        console.log("emailAvail Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 이메일 인증 코드 전송
export const sendEmailCode = async (request) => {
    try {
        const response = await authController(`/email-code`, 'post',request);
        console.log("sendEmailCode Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 인증 코드 검증
export const verifyEmailCode = async (request) => {
    try {
        const response = await authController(`/email-code/verify`, 'post',request);
        console.log("verifyEmailCode Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 회원가입
export const signupAPI = async (request) => {
    try {
        const response = await authController(`/signup`, 'post', request);
        console.log("signupAPI Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 회원탈퇴
export const signOutAPI = async () => {
    try {
        const response = await authController(`/signout`, 'post');
        console.log("signOutAPI Active");
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

export const loginAPI = async (request) => {
    try {
        const response = await authController(`/login`, 'post', request);
        console.log("loginAPI Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 비밀번호 재설정
export const resetPwAPI = async (request) => {
    try {
        const response = await authController(`/password`, 'post', request);
        console.log("resetPwAPI Active");
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

// ID 찾기 -> 전화번호, 닉네임을 사용해서 ID찾기
export const findIdAPI = async (request) => {
    try {
        const response = await authController(`/email-find`, 'post', request);
        console.log("findIdAPI Active");
        return responseStatus(response,response.data.email);
    }catch(error){
        return errorStatus(error);
    }     
};