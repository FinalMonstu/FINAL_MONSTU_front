import * as Yup from "yup";

const requiredMsg = "필수 항목입니다"

const passwordRule = /[!@#$%*?]/
const phoneNumberRule = /(\d{3})-(\d{4})-(\d{4})/

export const SignUpSchema = Yup.object().shape({
    email: Yup
        .string()
        .email("유효한 이메일을 입력하세요")
        .required(requiredMsg),

    password: Yup
        .string()
        .min(6, "6자 이상 입력하세요")
        .matches(passwordRule, "특수문자를 하나 이상 포함해야 합니다")
        .required(requiredMsg),

    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
        .required(requiredMsg),

    nickName: Yup
        .string()
        .required(requiredMsg),

    phoneNumber: Yup
        .string()
        .length(13, "전화번호를 다시 확인해주세요")
        .matches(/^\d{3}-\d{4}-\d{4}$/, "전화번호는 010-1234-5678 형식으로 입력해주세요")
        .required(requiredMsg),

    country: Yup
        .string()
        .required(requiredMsg),
});