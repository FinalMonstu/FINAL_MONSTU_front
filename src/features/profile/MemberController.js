import { connectSpring } from "../../common/hooks/preAxios";
import { responseStatus, errorStatus } from "../../common/hooks/handleStatus"

/* 
  역할 : 서버 MemberController와 소통
*/
const memberController = (url,type='post',data=null) => {
    const baseUrl = '/api/v2/members';
    if(type==='get')    return connectSpring.get(baseUrl+url,data);
    if(type==='post')   return connectSpring.post(baseUrl+url,data);
    if(type==='put')    return connectSpring.put(baseUrl+url,data);
    if(type==='patch')  return connectSpring.patch(baseUrl+url,data);
    if(type==='delete') return connectSpring.delete(baseUrl+url,data);
}



// Reactivate Member - API
export const setReactivateAPI = async () => {
    try {
        const response = await memberController(`/me/activate`, 'patch');
        console.log("setReactivateAPI Active");
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

// Get My Infomation - API
export const myInfo = async () => {
    try {
        const response = await memberController(`/me`, 'get');
        console.log("myInfo Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};





