import { z } from "zod";
import AuthForm from "./AuthForm";
import { SignUpFormSchema } from "./formSchema";

const SignUp = () => {
  const handleSignUp = (values: z.infer<typeof SignUpFormSchema>) => {
    console.log(values);
  };

  return <AuthForm type="sign_up" handleSubmit={handleSignUp} />;
};

export default SignUp;
