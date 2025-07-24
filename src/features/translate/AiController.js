import { connectSpring } from "../../common/hooks/preAxios";
import { responseStatus, errorStatus } from "../../common/hooks/handleStatus"
import { mapTranslationRequest, mapTranslationResponse } from "./hooks/TranslationMapper";

/* 
  역할 : 서버 AiController와 소통
*/
const aiController = (url,type='post',data=null) => {
    const baseUrl = '/api/v2/translate';
    if(type==='post') return connectSpring.post(baseUrl+url,data);
}

// 단어, 문장 번역 API
export const trans = async (translation) => {
    try {
        console.log("translation.data:", JSON.stringify(translation, null, 2));
        // 프론트 데이터를 백엔드 요청 형태로 매핑
        const requestData = mapTranslationRequest(translation);
        console.log("requestData.data:", JSON.stringify(requestData, null, 2));
        const response = await aiController(``, 'post', requestData);
        // 백엔드 응답을 프론트 형태로 매핑
        const mappedData = mapTranslationResponse(response.data);
        console.log("response.data:", JSON.stringify(response.data, null, 2));
        return responseStatus(response, mappedData);
    }catch(error){
        return errorStatus(error);
    }     
};