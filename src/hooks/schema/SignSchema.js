import * as Yup from "yup";


const requiredMsg = "필수 항목입니다"

const passwordRule = /[!@#$%*?]/
const phoneNumberRule = /(\d{3})-(\d{4})-(\d{4})/

export const SignSchema = Yup.object().shape({
    email: Yup
        .string().trim()
        .email("유효한 이메일을 입력하세요")
        .required(requiredMsg),

    password: Yup
        .string().trim()
        .min(6, "6자 이상 입력하세요")
        .matches(passwordRule, "특수문자를 하나 이상 포함해야 합니다")
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
        .length(13, "전화번호를 다시 확인해주세요")
        .matches(phoneNumberRule, "전화번호는 010-1234-5678 형식으로 입력해주세요")
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
