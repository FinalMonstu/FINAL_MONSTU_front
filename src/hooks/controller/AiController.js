import { connectSpring } from "../preAxios";
import { responseStatus, errorStatus } from "../handleStatus"

const aiController = (url,type='post',data=null) => {
    const baseUrl = '/api/ai';
    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}

// 단어, 문장 번역 API
export const trans = async (translation) => {
    try {
        const response = await aiController(`/trans`, 'post',translation);
        console.log("response: "+ response.data)
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};