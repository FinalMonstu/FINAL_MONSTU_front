
const myBaseURL = "/my";
const adminURL = "/admin";
const authBaseURL = "/auth";
const postBaseURL = "/post";

export const mainPath = "/";

export const myPath = {
    my:   `${myBaseURL}`,
    posts:   `${myBaseURL}/posts`,
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

export const postPath = {
  post: `${postBaseURL}/:id`,
  to: (id = 1) => `${postBaseURL}/${id}`,
};