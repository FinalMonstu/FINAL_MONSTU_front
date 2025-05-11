import { connectSpring } from "../preAxios";
import { responseStatus, errorStatus } from "../handleStatus"

/* 
  역할 : 서버 AiController와 소통
*/
const aiController = (url,type='post',data=null) => {
    const baseUrl = '/api/ai';
    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}

// 단어, 문장 번역 API
export const trans = async (translation) => {
    try {
        const response = await aiController(`/trans`, 'post',translation);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};