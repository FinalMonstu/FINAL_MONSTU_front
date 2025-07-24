import { connectSpring } from "../../common/hooks/preAxios";
import { responseStatus, errorStatus } from "../../common/hooks/handleStatus"

const adminController = (url,type='post',data=null) => {
    const baseUrl = '/api/v2/admin';
    if(type==='get')    return connectSpring.get(baseUrl+url,data);
    if(type==='post')   return connectSpring.post(baseUrl+url,data);
    if(type==='put')    return connectSpring.put(baseUrl+url,data);
    if(type==='patch')  return connectSpring.patch(baseUrl+url,data);
    if(type==='delete') return connectSpring.delete(baseUrl+url,data);
}

/*------------------------------------Member---------------------------------------*/
// Update Member - API
export const updateMemberAPI = async (dto) => {
    try {
        const response = await adminController(`/members/${dto.id}`, 'patch', dto);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};


// Delete One/Many Members - API
export const deleteMembers = async (list) => {
    try {
        const params = { ids: list.join(',') };
        const response = await adminController(`/members`, 'delete', { params });
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

// 필터링된 멤버 데이터 반환 API
export const filterMemberAPI = async ({filter,pageable}) => {
    try {
        const response = await adminController(
            `/members/search?page=${pageable.page}&size=${pageable.size}`, 
            'post',
            filter
        )
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};


// Find Member By ID - API
export const getMemberAPI = async (id) => {
    try {
        // const response = await memberController(`/members/{id}?id=${id}`, 'get');
        const response = await adminController(`/members/${id}`, 'get');
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// [Admin] Create Member - API
export const createMemberAPI = async (request) => {
    try {
        const response = await adminController(`/members`, 'post', request);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

/*------------------------------------Post---------------------------------------*/

// Find Post By ID - API
export const getDetailPostAPI = async (id) => {
    try {
        const response = await adminController(`/posts/${id}/logs`, 'get');
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};


// Set Post's Status to 'Delete' - API
export const deletePosts = async (list) => {
    const params = { ids: list.join(',') };
    try {
        const response = await adminController(`/posts`, 'delete', {params});
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

// Update Post - API
export const updatePostAPI = async (dto) => {
    try {
        const response = await adminController(`/posts/${dto.id}`, 'patch', dto);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};