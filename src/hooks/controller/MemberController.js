import { connectSpring } from "../preAxios";
import { responseStatus, errorStatus } from "../handleStatus"

/* 
  역할 : 서버 MemberController와 소통
*/
const memberController = (url,type='post',data=null) => {
    const baseUrl = '/api/mem';
    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
    if(type==='put') return connectSpring.put(baseUrl+url,data);
    if(type==='delete') return connectSpring.delete(baseUrl+url,data);
}

// 필터링된 멤버 데이터 반환 API
export const filterMemberAPI = async ({filter,pageable}) => {
    console.log("filter:", JSON.stringify(filter, null, 2));
    console.log("pageable:", JSON.stringify(pageable, null, 2));
    try {
        const response = await memberController(
            `/filter?page=${pageable.page}&size=${pageable.size}`, 
            'post',
            filter
        )
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


// Update Member - API
export const updateMemberAPI = async (dto) => {
    console.log("dto:", JSON.stringify(dto, null, 2));
    try {
        const response = await memberController(`/update`, 'put', dto);
        console.log("Response.data:", JSON.stringify(response.data, null, 2));
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};


// Set Member's Status to 'Delete' - API
export const deleteMembers = async (list) => {
    try {
        const response = await memberController(`/delete`, 'post', list);
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};


// Get My Infomation - API
export const myInfo = async () => {
    try {
        const response = await memberController(`/me`, 'get');
        console.log("Response.data:", JSON.stringify(response.data, null, 2));
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};





