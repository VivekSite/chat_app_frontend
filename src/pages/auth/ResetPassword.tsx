import { z } from "zod";
import { ResetPasswordFormSchema } from "./formSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { handleClipboardEvents } from "@/lib/formUtils";

const ResetPassword = () => {
  const ResetPasswordForm = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
      otp: 0,
    },
  });

  const handleResetPassword = (
    values: z.infer<typeof ResetPasswordFormSchema>
  ) => {
    console.log(values);
  };
  return (
    <Form {...ResetPasswordForm}>
      <form
        onSubmit={ResetPasswordForm.handleSubmit(handleResetPassword)}
        className="flex flex-col gap-5 sm:w-[25rem] sm:ml-[50%] sm:translate-x-[-50%] sm:mt-16"
      >

        {/* Field for Password */}
        <FormField
          control={ResetPasswordForm.control}
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

        {/* Field for Confirm Password */}
        <FormField
          control={ResetPasswordForm.control}
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

        {/* Field for OTP */}
        <FormField
          control={ResetPasswordForm.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start mb-5">
              <FormLabel>OTP</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your OTP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Reset Password</Button>
      </form>
    </Form>
  );
};

export default ResetPassword;
