import { z } from "zod";
import {
  ResetPasswordFormSchema,
  SignInFormSchema,
  SignUpFormSchema,
} from "./formSchema";
import { Control, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
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
import { Link } from "react-router-dom";

type AuthFormProps = {
  type: "sign_up" | "sign_in" | "reset_password";
  handleSubmit: (
    values: z.infer<
      | typeof SignUpFormSchema
      | typeof SignInFormSchema
      | typeof ResetPasswordFormSchema
    >
  ) => void;
};

const CustomFormField = ({
  name,
  label,
  placeholder,
  control,
}: {
  name: string;
  label: string;
  placeholder: string;
  control: Control<FieldValues>;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start mb-5">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const AuthForm = ({ type, handleSubmit }: AuthFormProps) => {
  const SignUpForm = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const ResetPasswordForm = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
      otp: 0,
    },
  });

  const SignInForm = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  let form:
    | typeof SignUpForm
    | typeof SignInForm
    | typeof ResetPasswordForm
    | undefined;

  switch (type) {
    case "sign_in":
      form = SignInForm;
      break;
    case "sign_up":
      form = SignUpForm;
      break;
    case "reset_password":
      form = ResetPasswordForm;
      break;
    default:
      toast({
        description: "Please provide a valid form type!",
      });
      return;
  }

  const handleClipboardEvents = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    toast({
      description: "Copying and pasting is not allowed in this field.",
      variant: "destructive",
      className: "p-5",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-5 sm:w-[25rem] sm:ml-[50%] sm:translate-x-[-50%] sm:mt-16"
      >
        {type === "sign_up" && (
          <CustomFormField
            control={form.control}
            name="username"
            label="Username"
            placeholder="Username"
          />
        )}

        {(type === "sign_up" || type === "sign_in") && (
          <CustomFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email"
          />
        )}

        <FormField
          control={form.control}
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

        {(type === "sign_up" || type === "reset_password") && (
          <FormField
            control={form.control}
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
        )}

        {type === "reset_password" && (
          <>
            <CustomFormField
              control={form.control}
              name="otp"
              label="OTP"
              placeholder="Enter Your OTP"
            />
          </>
        )}

        <Button>
          {type === "sign_up" && "Sign Up"}
          {type === "sign_in" && "Sign In"}
          {type === "reset_password" && "Reset Password"}
        </Button>

        <div>
          <hr className="border-[#3c3c3c] mb-2 mt-2" />

          {type === "sign_in" && (
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
          )}
          {type === "sign_up" && (
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
          )}
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;
