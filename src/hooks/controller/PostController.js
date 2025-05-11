import { connectSpring } from "../preAxios";
import { responseStatus, errorStatus } from "../handleStatus"

/* 
  역할 : 서버 PostController와 소통
*/
const postController = (url,type='post',data=null) => {
    const baseUrl = '/api/post';
    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
    if(type==='delete') return connectSpring.delete(baseUrl+url,data);
}

// 게시물 데이터 DB에 저장 API
export const savePost = async (post) => {
    console.log("post.data:", JSON.stringify(post, null, 2));
    try {
        const response = await postController(`/save`, 'post',post);
        console.log("Response.data:", JSON.stringify(response.data, null, 2));
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 유저가 작성한 게시물 목록 반환 API
export const getUserPosts = async (pageable) => {
    try {
        const response = await postController(`/mine/all?page=${pageable.page}&size=${pageable.size}&sort=${encodeURIComponent(pageable.sort)}`, 'get');
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// Public 게시물 목록 반환 API
export const getPublicPosts = async (pageable) => {
    try {
        const response = await postController(`/posts?page=${pageable.page}&size=${pageable.size}&sort=${encodeURIComponent(pageable.sort)}`, 'get');
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 게시물 ID를 이용하여 삭제 API
export const deletePostById = async (id) => {
    console.log("id: "+id);
    try {
        const response = await postController(`/${id}`, 'delete');
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

// 게시물 ID를 이용하여 게시글 받아오는는 API
export const getPostById = async (id) => {
    console.log("id: "+id);
    try {
        const response = await postController(`/${id}`, 'get');
        console.log("Response.data:", JSON.stringify(response.data, null, 2));
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

