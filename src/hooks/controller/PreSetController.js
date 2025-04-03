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
        console.log("response.data: "+response.data.langList)
        return responseStatus(response,response.data.langList);
    }catch(error){
        return errorStatus(error);
    }     
};