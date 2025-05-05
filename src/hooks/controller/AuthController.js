import { connectSpring } from "../preAxios";
import { responseStatus, errorStatus } from "../handleStatus"


const authController = (url,type='post',data=null) => {
    const baseUrl = '/api/auth';
    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
    if(type==='delete') return connectSpring.delete(baseUrl+url,data);
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
export const signupAPI = async (dto) => {
    try {
        const response = await authController(`/signup`, 'post',dto);
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

export const loginAPI = async (dto) => {
    try {
        const response = await authController(`/login`, 'post',dto);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 비밀번호 재설정
export const resetPwAPI = async (dto) => {
    try {
        const response = await authController(`/email/repass`, 'post',dto);
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

// ID 찾기 -> 전화번호, 닉네임을 사용해서 ID찾기
export const findIdAPI = async (dto) => {
    try {
        const response = await authController(`/email/find`, 'post',dto);
        console.log("response:", JSON.stringify(response, null, 2));
        return responseStatus(response,response.data.email);
    }catch(error){
        return errorStatus(error);
    }     
};

// 로그인한 사용자 정보 반환환
export const meAPI = async () => {
    try {
        const response = await authController(`/me`, 'get');
        console.log("response:", JSON.stringify(response, null, 2));
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};