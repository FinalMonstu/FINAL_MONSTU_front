import * as Yup from "yup";

const requiredMsg = "필수 항목입니다"


export const UpdateSchema = Yup.object().shape({
    isPublic: Yup
        .boolean()
        .required(requiredMsg),
    title: Yup
        .string().trim()
        .required(requiredMsg),
    content:  Yup
        .string().trim()
        .required(requiredMsg),
});