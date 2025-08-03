import { connectSpring } from "../../common/hooks/preAxios";
import { responseStatus, errorStatus } from "../../common/hooks/handleStatus"

/* 
  역할 : 서버 PostController와 소통
*/
const postController = (url,type='post',data=null) => {
    const baseUrl = '/api/v2/posts';
    if(type==='get')    return connectSpring.get(baseUrl+url,data);
    if(type==='post')   return connectSpring.post(baseUrl+url,data);
    if(type==='put')    return connectSpring.put(baseUrl+url,data);
    if(type==='patch')  return connectSpring.patch(baseUrl+url,data);
    if(type==='delete') return connectSpring.delete(baseUrl+url,data);
}

// 게시물 데이터 DB에 저장 API
export const savePost = async (post) => {
    try {
        const response = await postController(``, 'post',post);
        console.log("savePost Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 유저가 작성한 게시물 목록 반환 API
export const myPosts = async ({page,size,sortValue, sortOrder}) => {
    try {
        const response = await postController(
            `/me`,'get',
            { params: { page, size, sort: `${sortValue},${sortOrder}` }}
        )
        console.log("myPosts Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// view 쿼리 타입으로 같이 보내기기
// Public 게시물 목록 반환 API
export const getPublicPosts = async ({page,size,sortValue, sortOrder}) => {
    const view = 'summary';
    try {
        const response = await postController(
            ``, 'get', 
            { params: { page, size, sort: `${sortValue},${sortOrder}` }}
        );
        console.log("getPublicPosts Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 게시물 ID를 이용하여 삭제 API
export const deletePostAPI = async (id) => {
    try {
        const response = await postController(`/${id}`, 'delete');
        console.log("deletePostAPI Active");
        return responseStatus(response);
    }catch(error){
        return errorStatus(error);
    }     
};

// 게시물 ID를 이용하여 게시글 받아오는는 API
export const getPostById = async (id) => {
    try {
        const response = await postController(`/${id}`, 'get');
        console.log("getPostById Active");
        return responseStatus(response,response.data);
    }catch(error){
        return errorStatus(error);
    }     
};

// 필터링된 게시물 데이터 반환 API
export const filterPostAPI = async ({filter, pageable}) => {
    // filter 객체의 각 필드를 쿼리 파라미터로 변환
    const params = {
        page: pageable.page,
        size: pageable.size,
        ...filter
    };

    // null 또는 빈 문자열인 값은 쿼리에서 제외
    Object.keys(params).forEach(key => {
        if (params[key] === null || params[key] === '') {
            delete params[key];
        }
    });
    console.log("filterPostAPI params",params);
    try {
        const response = await postController(`/search`, 'get',{ params });
        console.log("filterPostAPI Active");
        return responseStatus(response, response.data);
    } catch (error) {
        return errorStatus(error);
    }
};






