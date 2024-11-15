import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync, updateAvatarAsync } from '@/redux/action/userAction';
import { getUserAsync } from '@/redux/action/authAction';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from '@/routes/hooks';
import { Loader } from '@/components/ui/loader';

// Validation schema using zod
const profileSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email address')
});

export default function Profile() {
  const dispatch = useDispatch<any>();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch user data from Redux store
  const user = useSelector((state: any) => state.auth.user);

  // Initialize form methods
  const methods = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      status: '',
      image: ''
    }
  });

  const {
    handleSubmit,
    reset,
    formState: { errors }
  } = methods;

  // Fetch user data on component mount
  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);

  // Update form values when user data is fetched
  useEffect(() => {
    if (user) {
      setLoading(true);
      reset({
        firstName: user?.user?.firstName || '',
        lastName: user?.user?.lastName || '',
        email: user?.user?.email || '',
        status: user?.user?.status || 'Active'
      });
      // Set the avatar preview
      if (user?.user?.profilePhoto) {
        setAvatarPreview(user?.user?.profilePhoto?.url); // Set the user's avatar from the database
      }
      setLoading(false);
    }
  }, [user, reset]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file); // Store the file in state for later upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string); // Update the preview
      };
      reader.readAsDataURL(file); // Read the file as a URL for the preview
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    if (!user || !user.user._id) {
      toast({
        variant: 'destructive',
        description: 'User ID is missing or invalid.'
      });
      setLoading(false);
      return;
    }

    try {
      const userData = {
        _id: user.user._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      };
      const res = await dispatch(updateUserAsync(userData)); // Update user profile
      if (res?.success) {
        setLoading(false);
        toast({
          description: res.message
        });
        router.push('/'); // Redirect to homepage after success
      } else {
        setLoading(false);
        toast({
          variant: 'destructive',
          description: res.message || 'Profile update failed'
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        variant: 'destructive',
        description: 'Something went wrong. Please try again.'
      });
    }

    // If avatar file is updated, upload the avatar
    if (avatarFile) {
      setLoading(true); // Set loading state to true while uploading avatar
      try {
        // Append file to form data
        const avatarRes = await dispatch(
          updateAvatarAsync(user.user._id, avatarFile)
        );
        if (avatarRes?.success) {
          setLoading(false);
          toast({
            title: 'Profile Updated',
            description: 'Your avatar has been updated successfully.'
          });
        } else {
          setLoading(false);
          toast({
            title: 'Update Failed',
            description: avatarRes.message || 'Avatar update failed',
            variant: 'destructive'
          });
        }
      } catch (error) {
        setLoading(false);
        toast({
          title: 'Avatar Update Failed',
          description: 'Something went wrong. Please try again later.',
          variant: 'destructive'
        });
      }
    }

    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 py-8">
      <Card className="w-full max-w-xl rounded-lg shadow-2xl">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-[#7367F0] to-[#5F4B8B] p-6">
          <div className="text-white">
            <CardTitle className="text-2xl font-semibold">
              Manage your account details 🙎🏻‍♂️
            </CardTitle>
            <p className="text-sm">Update your information below</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setEditMode(!editMode)}
            className="border-[#7367F0] bg-white text-[#7367F0] transition-colors hover:bg-[#7367F0] hover:text-white"
          >
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 rounded-b-lg  p-6">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              {/* Image Preview and Upload */}
              <div className="flex justify-center">
                <img
                  src={avatarPreview || '/images/avatar.png'} // Show user avatar if available, else default
                  alt="User Avatar"
                  className="h-24 w-24 rounded-full"
                />
              </div>

              {editMode && (
                <FormField
                  control={methods.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload a new avatar</FormLabel>
                      <FormControl>
                        {/* Don't bind value to file input, handle file changes with onChange */}
                        <Input
                          {...field} // Ensure other form values are handled
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange} // File selection logic
                          className="mt-2"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              {/* First Name Field */}
              <FormField
                control={methods.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your first name"
                        disabled={!editMode}
                        className="border-gray-300 transition focus:border-[#7367F0]"
                      />
                    </FormControl>
                    <FormMessage>{errors.firstName?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Last Name Field */}
              <FormField
                control={methods.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your last name"
                        disabled={!editMode}
                        className="border-gray-300 transition focus:border-[#7367F0]"
                      />
                    </FormControl>
                    <FormMessage>{errors.lastName?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        disabled={!editMode}
                        className="border-gray-300 transition focus:border-[#7367F0]"
                      />
                    </FormControl>
                    <FormMessage>{errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Status Field */}
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={user.user.status || 'Active'}
                    disabled={true}
                    className="bg-gray-200"
                  />
                </FormControl>
              </FormItem>

              {/* Save Changes Button */}
              {editMode && (
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="mt-4 w-full border border-[#7367F0] bg-white text-black hover:bg-[#7367F0] hover:text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
