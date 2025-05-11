import * as Yup from "yup";

/* 
  역할 : Formik에서 사용할 조건문 정의
  비고: 라이브러리 Yup 사용
*/

const requiredMsg = "필수 항목입니다"

const passwordRule = /[!@#$%*?]/
const phoneNumberRule = /(\d{3})-(\d{4})-(\d{4})/
const whiteSpace = /^\S*$/

export const SignSchema = Yup.object().shape({
    email: Yup
        .string().trim()
        .email("유효한 이메일을 입력하세요")
        .required(requiredMsg),

    password: Yup
        .string().trim()
        .min(6, "6자 이상 입력하세요")
        .matches(whiteSpace, "공백은 허용되지 않습니다")
        .matches(passwordRule, "특수문자 !@#$%*? 를 하나 이상 포함해야 합니다")
        .required(requiredMsg),

    confirmPassword: Yup
        .string().trim()
        .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
        .required(requiredMsg),

    nickName: Yup
        .string().trim()
        .required(requiredMsg),

    phoneNumber: Yup
        .string().trim()
        .matches(phoneNumberRule, "전화번호는 010-1234-5678 형식으로 입력해주세요")
        .length(13, "전화번호를 다시 확인해주세요")
        .required(requiredMsg),

    country: Yup
        .string().trim()
        .required(requiredMsg),
});

export const UpdateSchema = Yup.object().shape({
    email: Yup
        .string().trim()
        .email("유효한 이메일을 입력하세요")
        .required(requiredMsg),

    nickName: Yup
        .string().trim()
        .required(requiredMsg),

    phoneNumber: Yup
        .string().trim()
        .matches(phoneNumberRule, "전화번호는 010-1234-5678 형식으로 입력해주세요")
        .length(13, "전화번호를 다시 확인해주세요")
        .required(requiredMsg),

    country: Yup
        .string().trim()
        .required(requiredMsg),
});

export const LoginSchema = Yup.object().shape({
    email: Yup
        .string().trim()
        .email("유효한 이메일이 아닙니다")
        .required("이메일을 입력해주세요"),
    password: Yup
        .string().trim()
        .required("비밀번호를 입력해주세요"),
});

export const emailAuthSchema = Yup.object().shape({
    email: Yup
        .string().trim()
        .email("유효한 이메일이 아닙니다")
        .required("이메일을 입력해주세요"),
    authCode: Yup
        .string().trim()
        .required("전달 받은 코드를 입력해주세요"),
});

export const findEmailSchema = Yup.object().shape({
    phoneNumber: Yup
        .string().trim()
        .length(13, "전화번호를 다시 확인해주세요")
        .matches(phoneNumberRule, "전화번호는 010-1234-5678 형식으로 입력해주세요")
        .required("전화번호를 입력해주세요"),
    nickName: Yup
        .string().trim()
        .required("닉네임을 입력해주세요"),
});

export const confirmPwSchema = Yup.object().shape({
    password: Yup
        .string()
        .min(6, "6자 이상 입력하세요")
        .matches(whiteSpace, "공백은 허용되지 않습니다")
        .matches(passwordRule, "특수문자 !@#$%*? 중 하나를 포함해야 합니다")
        .required(requiredMsg),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
        .required(requiredMsg)
  });
