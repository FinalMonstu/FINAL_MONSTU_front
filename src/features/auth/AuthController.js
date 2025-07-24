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
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 이메일 인증 코드 전송
export const sendEmailCode = async (request) => {
    try {
        const response = await authController(`/email-code`, 'post',request);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 인증 코드 검증
export const verifyEmailCode = async (request) => {
    try {
        const response = await authController(`/email-code/verify`, 'post',request);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 회원가입
export const signupAPI = async (request) => {
    try {
        const response = await authController(`/signup`, 'post', request);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 회원탈퇴
export const signOutAPI = async () => {
    try {
        const response = await authController(`/signout`, 'post');
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

export const loginAPI = async (request) => {
    try {
        const response = await authController(`/login`, 'post', request);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 비밀번호 재설정
export const resetPwAPI = async (request) => {
    try {
        const response = await authController(`/password`, 'post', request);
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

// ID 찾기 -> 전화번호, 닉네임을 사용해서 ID찾기
export const findIdAPI = async (request) => {
    try {
        const response = await authController(`/email-find`, 'post', request);
        return responseStatus(response,response.data.email);
    }catch(error){
        return errorStatus(error);
    }     
};

// 로그인한 사용자 정보 반환환
// export const meAPI = async () => {
//     try {
//         const response = await authController(`/me`, 'get');
//         return responseStatus(response,response.data);
//     }catch(error){
//         return errorStatus(error);
//     }     
// };