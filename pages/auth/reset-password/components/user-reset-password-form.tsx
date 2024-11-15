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
import { useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { resetPasswordAsync } from '@/redux/action/authAction';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useRouter } from '@/routes/hooks';
import { Loader } from '@/components/ui/loader';
const formSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Confirm password must be at least 6 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function ResetPassword() {
  const dispatch: any = useDispatch();
  const { toast } = useToast();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  //Token Get Query Parameters
  const token = new URLSearchParams(location.search).get('q');

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
      const userData = {
        ...data,
        token: token
      };

      dispatch(resetPasswordAsync(userData)).then((res: any) => {
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
        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                New Password <span className="text-sm text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="*******"
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

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Confirm Password <span className="text-sm text-red-500">*</span>
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
                    {showConfirmPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={!form.formState.isValid || loading} // Button disabled until form is valid
          style={{ backgroundColor: '#675cd8', color: 'white' }}
        >
          Set New Password
        </Button>
      </form>
    </Form>
  );
}
