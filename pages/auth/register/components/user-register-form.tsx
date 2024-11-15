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
import { registerAsync } from '@/redux/action/authAction';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import { useToast } from '@/components/ui/use-toast';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Loader } from '@/components/ui/loader';

const formSchema = z
  .object({
    firstName: z.string().nonempty({ message: 'First name is required' }),
    lastName: z.string().nonempty({ message: 'Last name is required' }),
    email: z
      .string()
      .email({ message: 'Enter a valid email address' })
      .nonempty({ message: 'Email is required' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .nonempty({ message: 'Password is required' }),
    confirmPassword: z.string().min(6, {
      message: 'Password confirmation must be at least 6 characters'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type UserFormValue = z.infer<typeof formSchema>;

export default function UserRegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  });

  if (loading) {
    return <Loader />;
  }
  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      //   const res = await dispatch(registerAsync(data));
      dispatch(registerAsync(data)).then((res: any) => {
        if (res?.success) {
          setLoading(false);
          toast({ description: String(res.message) });
          router.push('/login');
        } else {
          setLoading(false);
          toast({ variant: 'destructive', description: String(res.message) });
        }
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                First Name<span className="text-sm text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your First Name..."
                  disabled={loading}
                  {...field}
                  className="h-12 rounded-md border border-gray-300 p-2 transition duration-200 focus:border-[#675CD8] focus:outline-none focus:ring-2 focus:ring-[#5a53b1]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Last Name <span className="text-sm text-red-500"></span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your Last Name..."
                  disabled={loading}
                  {...field}
                  className="h-12 rounded-md border border-gray-300 p-2 transition duration-200 focus:border-[#675CD8] focus:outline-none focus:ring-2 focus:ring-[#5a53b1]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-sm text-red-500"></span>
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

        {/* Other form fields (Last Name, Email, Password, Confirm Password) with similar structure */}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>
                Password <span className="text-sm text-red-500">*</span>
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="******"
                    disabled={loading}
                    {...field}
                    className="h-12 rounded-md border border-gray-300 p-2 transition duration-200 focus:border-[#675CD8] focus:outline-none focus:ring-2 focus:ring-[#5a53b1]"
                  />
                </FormControl>
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
              {/* confrimPassword */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password{' '}
                      <span className="text-sm text-red-500">*</span>
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="*******"
                          disabled={loading}
                          {...field}
                          className="h-12 rounded-md border border-gray-300 p-2 transition duration-200 focus:border-[#675CD8] focus:outline-none focus:ring-2 focus:ring-[#5a53b1]"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        disabled={loading}
                      >
                        {showConfirmPassword ? (
                          <EyeIcon className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
                            ? 'Hide password'
                            : 'Show password'}
                        </span>
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="ml-auto w-full"
          disabled={!form.formState.isValid || loading}
          style={{ backgroundColor: '#675cd8', color: 'white' }}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Form>
  );
}
