import { connectSpring } from "../preAxios";
import { responseStatus, errorStatus } from "../handleStatus"

const presetController = (url,type='post',data=null) => {
    const baseUrl = '/api/preset';
    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}

// 언어 목록 반환 API
export const getLangList = async () => {
    try {
        const response = await presetController(`/lang`, 'get',);
        console.log("Response.data:", JSON.stringify(response.data.langList, null, 2));
        return responseStatus(response,response.data.langList);
    }catch(error){
        return errorStatus(error);
    }     
};

// 나라라 목록 반환 API
export const getCounList = async () => {
    try {
        const response = await presetController(`/coun`, 'get',);
        console.log("Response.data:", JSON.stringify(response.data.langList, null, 2));
        return responseStatus(response,response.data.counList);
    }catch(error){
        return errorStatus(error);
    }     
};