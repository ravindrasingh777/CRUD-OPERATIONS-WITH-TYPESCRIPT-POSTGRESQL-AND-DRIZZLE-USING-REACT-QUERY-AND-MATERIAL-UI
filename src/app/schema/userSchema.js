import * as yup from "yup";

const passwordRules =
  /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const UserFormSchema = yup.object({
  name: yup.string().required("Name is required...").min(5).max(50),
  email: yup
    .string()
    .email("Please Enter a valid email id")
    .required("Email is required..."),
  age: yup.number().integer().positive().required("Age is required..."),
  gender: yup.string().required("Gender is required..."),
  password: yup
    .string()
    .required("Password is required...")
    .min(5)
    .matches(passwordRules, { message: "Please Insert a Strong Password" }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password Must Match..."),
});
