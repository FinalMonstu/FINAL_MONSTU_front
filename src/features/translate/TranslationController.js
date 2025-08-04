import { connectSpring } from "../../common/hooks/preAxios";
import { responseStatus, errorStatus } from "../../common/hooks/handleStatus"
import { mapTranslationRequest, mapTranslationResponse } from "./hooks/TranslationMapper";

/* 
  역할 : 서버 TranslationController와 소통
*/
const translationController = (url,type='post',data=null) => {
    const baseUrl = '/api/v2/translate';
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}

// 단어, 문장 번역 API
export const trans = async (translation) => {
    try {
        const requestData = mapTranslationRequest(translation);
        console.log(requestData);

        const response = await translationController(``, 'post', requestData);
        const mappedData = mapTranslationResponse(response.data);
        console.log("trans Active");
        return responseStatus(response, mappedData);
    }catch(error){
        return errorStatus(error);
    }     
};