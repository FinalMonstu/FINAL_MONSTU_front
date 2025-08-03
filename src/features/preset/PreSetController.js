import { connectSpring } from "../../common/hooks/preAxios";
import { responseStatus, errorStatus } from "../../common/hooks/handleStatus"

/* 
  역할 : 서버 PresetController와 소통
*/
const presetController = (url,type='post',data=null) => {
    const baseUrl = '/api/v2/presets';
    if(type==='get') return connectSpring.get(baseUrl+url,data);
}

// 언어 목록 반환 API
export const getLangList = async () => {
    try {
        const response = await presetController(`/languages`, 'get',);
        console.log("getLangList Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 나라 목록 반환 API
export const getCounList = async () => {
    try {
        const response = await presetController(`/countries`, 'get',);
        console.log("getCounList Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 멤버 상태코드 목록 반환 API
export const getMemStatus = async () => {
    try {
        const response = await presetController(`/member-statuses`, 'get',);
        console.log("getMemStatus Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 멤버 상태코드 목록 반환 API
export const getMemRole = async () => {
    try {
        const response = await presetController(`/member-roles`, 'get',);
        console.log("getMemRole Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};