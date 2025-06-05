import { connectSpring } from "../preAxios";
import { responseStatus, errorStatus } from "../handleStatus"

/* 
  역할 : 서버 PresetController와 소통
*/
const presetController = (url,type='post',data=null) => {
    const baseUrl = '/api/preset';
    if(type==='get') return connectSpring.get(baseUrl+url,data);
}

// 언어 목록 반환 API
export const getLangList = async () => {
    try {
        const response = await presetController(`/lang`, 'get',);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 나라 목록 반환 API
export const getCounList = async () => {
    try {
        const response = await presetController(`/coun`, 'get',);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 멤버 상태코드 목록 반환 API
export const getMemStatus = async () => {
    try {
        const response = await presetController(`/mem/status`, 'get',);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 멤버 상태코드 목록 반환 API
export const getMemRole = async () => {
    try {
        const response = await presetController(`/mem/role`, 'get',);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};