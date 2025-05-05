import { connectSpring } from "../preAxios";
import { responseStatus, errorStatus } from "../handleStatus"

const memberController = (url,type='post',data=null) => {
    const baseUrl = '/api/mem';
    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
    if(type==='delete') return connectSpring.delete(baseUrl+url,data);
}

// 필터링된 멤버 데이터 반환 API
export const findMember = async ({filter,pageable}) => {
    console.log("filter:", JSON.stringify(filter, null, 2));
    console.log("pageable:", JSON.stringify(pageable, null, 2));
    try {
        const response = await memberController(`/find/filter`, 'post',filter,{params:{pageable}});
        console.log("Response.data:", JSON.stringify(response.data, null, 2));
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};


// Find Member By ID - API
export const getMemberAPI = async (id) => {
    console.log("id:", JSON.stringify(id, null, 2));
    try {
        const response = await memberController(`/get?id=${id}`, 'get');
        console.log("Response.data:", JSON.stringify(response.data, null, 2));
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};


export const deleteMembers = async (list) => {
    try {
        const response = await memberController(`/del`, 'post',list);
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};


