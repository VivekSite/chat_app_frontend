import { z } from "zod";
import { SignInFormSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "@/services/auth.service";
import { toast } from "@/hooks/use-toast";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts";

const SignIn = () => {
  const navigate = useNavigate();
  const { checkAuthStatus, isLoggedIn } = useAuth()

  if (isLoggedIn) {
    return <Navigate to="/" replace  />
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const SignInForm = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof SignInFormSchema>) => {
    const response = await signIn(values);

    if (response.success) {
      toast({
        title: "Sign In Success",
        description: response.message,
        style: {
          backgroundColor: "green"
        }
      });
      await checkAuthStatus();
      navigate("/");
      SignInForm.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: response.message,
      });
    }
  };

  return (
    <Form {...SignInForm}>
      <form
        onSubmit={SignInForm.handleSubmit(handleSignIn)}
        className="flex flex-col gap-5 sm:w-[25rem] sm:ml-[50%] sm:translate-x-[-50%] sm:mt-16"
      >
        {/* Field for Email */}
        <FormField
          control={SignInForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start mb-5">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Field for Password */}
        <FormField
          control={SignInForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start mb-5">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="off"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div
          className={`${SignInForm.formState.isSubmitting && "cursor-wait"}`}
        >
          <Button
            type="submit"
            disabled={SignInForm.formState.isSubmitting}
            className="w-full"
          >
            {SignInForm.formState.isSubmitting ? "Please wait..." : "Sign In"}
          </Button>
        </div>

        <div>
          <hr className="border-[#3c3c3c] mb-2 mt-2" />

          <p>
            Didn't have an account?
            <Link
              to={"/sign_up"}
              className="hover:underline hover:cursor-pointer"
            >
              {" "}
              Sign Up Here
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default SignIn;
