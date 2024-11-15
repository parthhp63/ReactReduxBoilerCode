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
import { forgotPasswordAsync } from '@/redux/action/authAction';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { Loader } from '@/components/ui/loader';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const dispatch: any = useDispatch();
  const { toast } = useToast();
  const router = useRouter();
  // const [loading] = useState(false);
  const [loading, setLoading] = useState(false);
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
      dispatch(forgotPasswordAsync(data)).then((res: any) => {
        if (res?.success === true) {
          setLoading(false);
          toast({
            description: res.message
          });
          router.push('/login');
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

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={!form.formState.isValid || loading} // Button disabled until form is valid
          style={{ backgroundColor: '#675cd8', color: 'white' }}
        >
          Send Reset Link
        </Button>
      </form>
    </Form>
  );
}
