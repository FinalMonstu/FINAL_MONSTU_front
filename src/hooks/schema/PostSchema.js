import * as Yup from "yup";

const requiredMsg = "필수 항목입니다"

const whiteSpace = /^\S*$/

export const UpdateSchema = Yup.object().shape({
    status: Yup
        .string()
        .required(requiredMsg),
    isPublic: Yup
        .boolean()
        .required(requiredMsg),
    title: Yup
        .string().trim()
        .matches(whiteSpace, "공백은 허용되지 않습니다")
        .required(requiredMsg),
    content:  Yup
        .string().trim()
        .matches(whiteSpace, "공백은 허용되지 않습니다")
        .required(requiredMsg),
});