import { connectSpring } from "../../common/hooks/preAxios";
import { responseStatus, errorStatus } from "../../common/hooks/handleStatus"

/* 
  역할 : 서버 HistoryController와 소통
*/
const historyController = (url, type='post', data=null) => {
    const baseUrl = '/api/v2/histories';
    if(type==='get')    return connectSpring.get(baseUrl+url,data);
    if(type==='post')   return connectSpring.post(baseUrl+url,data);
    if(type==='put')    return connectSpring.put(baseUrl+url,data);
    if(type==='patch')  return connectSpring.patch(baseUrl+url,data);
    if(type==='delete') return connectSpring.delete(baseUrl+url,data);
}

// 히스토리 데이터를 서버로 보내는 API
export const saveHistory = async (postId, histWord, histSentence) => {
    try {

        // 히스토리에서 id만 추출
        const wordIds = histWord.map(item => item.id).filter(id => id);
        const sentenceIds = histSentence.map(item => item.id).filter(id => id);
        const allIds = [...wordIds, ...sentenceIds];

        console.log("allIds", allIds);
        console.log("wordIds", wordIds);

        const requestDTO = {
            postId: postId,
            historyIds: allIds
        };
        const response = await historyController(``, 'post', requestDTO);
        console.log("saveHistory Active");
        return responseStatus(response, response.data);
    } catch (error) {
        return errorStatus(error);
    }
};

 