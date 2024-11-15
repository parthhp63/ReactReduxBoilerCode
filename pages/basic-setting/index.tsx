import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import moment from 'moment-timezone'; // Import moment-timezone
import { getUserSettings, updateUserSettings } from '@/redux/action/userAction';
import { useRouter } from '@/routes/hooks';

// Validation schema using zod
const settingsSchema = z.object({
  backgroundColor: z.string().optional(),
  fontSize: z.number().min(8).max(60).optional(),
  fontColor: z.string().optional(),
  timezone: z.string().optional(),
});

// Generate timezone list using moment-timezone
const timezones = moment.tz.names();

// Get time zone offset
const getTimeZoneOffset = (timeZone: string) => {
  const now = new Date();
  const offset = moment.tz(now, timeZone).format('Z'); // Format the offset as "+hh:mm"
  return offset;
};

// Organize time zones by regions
const timeZoneRegions: { [key: string]: { label: string; value: string }[] } = {
  Africa: [],
  America: [],
  Asia: [],
  Australia: [],
  Europe: [],
  Pacific: [],
  Others: [],
};

timezones.forEach((tz) => {
  const offset = getTimeZoneOffset(tz);
  const label = `${tz.replace(/_/g, ' ')} (${offset})`; // Make the timezone readable with the offset
  const region = tz.split('/')[0]; // Get the region part (before '/')

  // Group timezones into regions
  if (timeZoneRegions[region]) {
    timeZoneRegions[region].push({ label, value: tz });
  } else {
    timeZoneRegions['Others'].push({ label, value: tz });
  }
});

export default function BasicSettings() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const userSettings = useSelector((state: any) => state.user.userSettings);

  const defaultTimezone = localStorage.getItem('selectedTimezone') || 'Asia/Calcutta';

  const { register, handleSubmit, setValue, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      backgroundColor: '#000000',
      fontSize: 8,
      fontColor: '#000000',
      timezone: defaultTimezone,
    },
  });

  // Fetch user settings on component mount
  useEffect(() => {
    dispatch(getUserSettings());
  }, [dispatch]);

  // Update form values when userSettings are fetched
  useEffect(() => {
    if (userSettings?.userSettings) {
      reset({
        backgroundColor: userSettings.userSettings.backgroundColor || '#000000',
        fontSize: userSettings.userSettings.fontSize || 8,
        fontColor: userSettings.userSettings.fontColor || '#000000',
        timezone: userSettings.userSettings.timezone || defaultTimezone,
      });
    }
  }, [userSettings, reset, defaultTimezone]);

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await dispatch(updateUserSettings(data));
      if (res?.success) {
        setLoading(false);
        toast({ description: res.message as string });
        router.push('/');
      } else {
        setLoading(false);
        toast({ variant: 'destructive', description: String(res.message) || 'Profile update failed' });
      }
    } catch (error) {
      setLoading(false);
      toast({ variant: 'destructive', description: 'Something went wrong. Please try again.' });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 py-8">
      <Card className="w-full max-w-xl rounded-lg shadow-2xl">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-[#7367F0] to-[#5F4B8B] p-6">
          <div className="text-white">
            <CardTitle className="text-2xl font-semibold">Basic Settings for Notes App</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Background Color</label>
                <Input type="color" {...register('backgroundColor')} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Font Size</label>
                <Input
    type="number"
    min="8"
    max="60"
    {...register('fontSize', {
      setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10)), // Ensure the value is parsed as a number
    })}
  />
                {errors.fontSize && <span className="text-red-600">{String(errors.fontSize.message)}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Font Color for Heading</label>
                <Input type="color" {...register('fontColor')} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Timezone</label>
                <Controller
                  name="timezone"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(timeZoneRegions).map(([region, timezonesInRegion], index) => (
                          <div key={index}>
                            <p className="font-semibold text-gray-700">{region}</p>
                            {timezonesInRegion.map((timezone, idx) => (
                              <SelectItem key={idx} value={timezone.value}>
                                {timezone.label}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.timezone && <span className="text-red-600">{String(errors.timezone.message)}</span>}
              </div>

              <Button type="submit" className="w-full mt-4">Save Settings</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
