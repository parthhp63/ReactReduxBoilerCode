import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/routes/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { loginAsync } from '@/redux/action/authAction';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import './user-auth.css';
import { Loader } from '@/components/ui/loader';
const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const dispatch: any = useDispatch();
  const { toast } = useToast();
  const router = useRouter();
  // const [loading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    mode: 'onChange' // Enable validation on change
  });

  if (loading) {
    return <Loader />;
  }

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      dispatch(loginAsync(data)).then((res: any) => {
        if (res?.success === true) {
          setLoading(false);
          toast({
            description: res.message
          });
          router.push('/');
        } else {
          setLoading(false);
          toast({
            variant: 'destructive',
            description: res
          });
        }
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong. Please try again.'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-sm text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  disabled={loading}
                  {...field}
                  className="h-12 rounded-md border border-gray-300 p-2 transition duration-200 focus:border-[#675CD8] focus:outline-none focus:ring-2 focus:ring-[#5a53b1]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password <span className="text-sm text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                    className="h-12 rounded-md border border-gray-300 p-2 pr-10 transition duration-200 focus:border-[#675CD8] focus:outline-none focus:ring-2 focus:ring-[#5a53b1]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <Checkbox
              id="checkRemember"
              className="peer h-5 w-5 rounded-md border-gray-300 checked:bg-[#675cd8] focus:ring-[#675cd8]"
            />

            <label
              htmlFor="checkRemember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <a
            href="/forgot-password"
            className="text-sm text-[#675CD8] hover:underline"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={!form.formState.isValid || loading} // Button disabled until form is valid
          style={{ backgroundColor: '#675cd8', color: 'white' }}
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
