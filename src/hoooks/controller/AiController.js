import { connectSpring } from "../preAxios";
import { responseStatus, errorStatus } from "../handleStatus"

const aiController = (url,type='post',data=null) => {
    const baseUrl = '/api/ai';
    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}

// 단어, 문장 번역 API
export const trans = async () => {
    try {
        const response = await aiController(`/trans`, 'post',);
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};