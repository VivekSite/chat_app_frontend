import { z } from "zod";
import AuthForm from "./AuthForm";
import { SignInFormSchema } from "./formSchema";

const SignIn = () => {
  const handleSignIn = (values: z.infer<typeof SignInFormSchema>) => {
    console.log(values);
  };

  return <AuthForm type="sign_in" handleSubmit={handleSignIn} />;
};

export default SignIn;
