import { connectSpring } from "../preAxios";
import { responseStatus, errorStatus } from "../handleStatus"

/* 
  역할 : 서버 PostController와 소통
*/
const postController = (url,type='post',data=null) => {
    const baseUrl = '/api/post';
    if(type==='get') return connectSpring.get(baseUrl+url,data);
    if(type==='post') return connectSpring.post(baseUrl+url,data);
    if(type==='put') return connectSpring.put(baseUrl+url,data);
    if(type==='delete') return connectSpring.delete(baseUrl+url,data);
}

// 게시물 데이터 DB에 저장 API
export const savePost = async (post) => {
    console.log("Request :", JSON.stringify(post, null, 2));
    try {
        const response = await postController(`/save`, 'post',post);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 유저가 작성한 게시물 목록 반환 API
export const myPosts = async ({page,size,sortValue, sortOrder}) => {
    try {
        const response = await postController(
            `/me/posts`,'get',
            { params: { page, size, sort: `${sortValue},${sortOrder}` }}
        )
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// Public 게시물 목록 반환 API
export const getPublicPosts = async ({page,size,sortValue, sortOrder}) => {
    try {
        const response = await postController(
            `/posts`, 'get', 
            { params: { page, size, sort: `${sortValue},${sortOrder}` }}
        );
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 게시물 ID를 이용하여 삭제 API
export const deletePostAPI = async (id) => {
    try {
        const response = await postController(`/${id}`, 'delete');
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

// 게시물 ID를 이용하여 게시글 받아오는는 API
export const getPostById = async (id) => {
    try {
        const response = await postController(`/${id}`, 'get');
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 필터링된 게시물 데이터 반환 API
export const filterPostAPI = async ({filter,pageable}) => {
    try {
        const response = await postController(
            `/filter?page=${pageable.page}&size=${pageable.size}`, 
            'post',
            filter
        )
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }       
};


// Find Post By ID - API
export const getDetailPostAPI = async (id) => {
    try {
        const response = await postController(`/detail/${id}`, 'get');
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};


// Update Post - API
export const updatePostAPI = async (dto) => {
    try {
        const response = await postController(`/update`, 'put', dto);
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};


// Set Post's Status to 'Delete' - API
export const deletePosts = async (list) => {
    try {
        const response = await postController(`/delete`, 'post', list);
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

