import { z } from "zod";
import AuthForm from "./AuthForm";
import { ResetPasswordFormSchema } from "./formSchema";

const ResetPassword = () => {
  const handleResetPassword = (
    values: z.infer<typeof ResetPasswordFormSchema>
  ) => {
    console.log(values);
  };
  return <AuthForm type="reset_password" handleSubmit={handleResetPassword} />;
};

export default ResetPassword;
