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
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { changePasswordAsync } from '@/redux/action/authAction';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useRouter } from '@/routes/hooks';

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    newpassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm password must be at least 6 characters' })
  })
  .refine((data) => data.newpassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

type UserFormValue = z.infer<typeof formSchema>;

export default function ChangePassword() {
  const dispatch = useDispatch<any>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);

    try {
      const userData = {
        oldPassword: data.currentPassword,
        newPassword: data.newpassword,
        confirmPassword: data.confirmPassword
      };
      const res = await dispatch(changePasswordAsync(userData));
      if (res?.success) {
        toast({
          description: res.message
        });
        router.push('/');
      } else {
        toast({
          variant: 'destructive',
          description: res.message || 'Password reset failed'
        });
      }
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 p-8"
      >
        {/* Current Password Field */}
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Current Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Enter current password"
                    disabled={loading}
                    {...field}
                    className="h-12 rounded-md border border-gray-300 p-2 pr-10 transition focus:border-[#675CD8] focus:outline-none focus:ring-2 focus:ring-[#5a53b1]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    disabled={loading}
                  >
                    {showCurrentPassword ? (
                      <EyeIcon className="h-4 w-4" />
                    ) : (
                      <EyeOffIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password Field */}
        <FormField
          control={form.control}
          name="newpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                New Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    disabled={loading}
                    {...field}
                    className="h-12 rounded-md border border-gray-300 p-2 pr-10 transition focus:border-[#675CD8] focus:outline-none focus:ring-2 focus:ring-[#5a53b1]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeIcon className="h-4 w-4" />
                    ) : (
                      <EyeOffIcon className="h-4 w-4" />
                    )}
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
                Confirm Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    disabled={loading}
                    {...field}
                    className="h-12 rounded-md border border-gray-300 p-2 pr-10 transition focus:border-[#675CD8] focus:outline-none focus:ring-2 focus:ring-[#5a53b1]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeIcon className="h-4 w-4" />
                    ) : (
                      <EyeOffIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-[#675cd8] text-white hover:bg-[#5a53b1]"
          disabled={!form.formState.isValid || loading}
        >
          {loading ? 'Processing...' : 'Change Password'}
        </Button>
      </form>
    </Form>
  );
}
