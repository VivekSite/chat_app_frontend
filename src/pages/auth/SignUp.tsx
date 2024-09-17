import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignUpFormSchema } from "./formSchema";
import { handleClipboardEvents } from "@/lib/formUtils";
import { signUp } from "@/services/auth.service";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts";

const SignUp = () => {
  const navigate = useNavigate();
  const { checkAuthStatus, isLoggedIn } = useAuth()

  if (isLoggedIn) {
    return <Navigate to="/" replace  />
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const SignUpForm = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof SignUpFormSchema>) => {
    console.log(values);
    const response = await signUp(values);

    if (response.success) {
      toast({
        title: "Sign Up Success",
        description: response.message,
        style: {
          backgroundColor: "green",
        },
      });
      await checkAuthStatus();
      navigate("/");
      SignUpForm.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: response.message,
      });
    }
  };

  return (
    <Form {...SignUpForm}>
      <form
        onSubmit={SignUpForm.handleSubmit(handleSignUp)}
        className="flex flex-col gap-5 sm:w-[25rem] sm:ml-[50%] sm:translate-x-[-50%] sm:mt-16"
      >
        {/* Field for Username */}
        <FormField
          control={SignUpForm.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start mb-5">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Field for Email */}
        <FormField
          control={SignUpForm.control}
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
          control={SignUpForm.control}
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

        {/* Field for confirm password */}
        <FormField
          control={SignUpForm.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start mb-5">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  {...field}
                  type="password"
                  onCopy={handleClipboardEvents}
                  onPaste={handleClipboardEvents}
                  onCut={handleClipboardEvents}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div
          className={`${SignUpForm.formState.isSubmitting && "cursor-wait"}`}
        >
          <Button
            type="submit"
            disabled={SignUpForm.formState.isSubmitting}
            className="w-full"
          >
            {SignUpForm.formState.isSubmitting ? "Please wait..." : "Sign Up"}
          </Button>
        </div>

        <div>
          <hr className="border-[#3c3c3c] mb-2 mt-2" />
          <p>
            Already have an account?
            <Link
              to={"/sign_in"}
              className="hover:underline hover:cursor-pointer"
            >
              {" "}
              Sign In Here
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default SignUp;
