
/* 
  역할 : 프론트 URL 지정
*/

const myBaseURL = "/my";
const adminURL = "/admin";
const authBaseURL = "/auth";
const postBaseURL = "/post";

export const mainPath = "/";

export const myPath = {
    my:   `${myBaseURL}`,
};

export const adminPath = {
  admin:   `${adminURL}`,
  members: `${adminURL}/members`,
};

export const authPath = {
  login:  `${authBaseURL}/login`,
  signup: `${authBaseURL}/signup`,
  find:   `${authBaseURL}/find`,
  resetPw:   `${authBaseURL}/pw/reset`,
  foundEmail:   `${authBaseURL}/email/found`,

  signout:   `${authBaseURL}/signout`,
};

// id가 -1 -> 새로운 게시물 작성
export const postPath = {
  post: `${postBaseURL}/:id`,
  to: (id = null) => `${postBaseURL}/${id}`,
};