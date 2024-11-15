import UserChangePassword from './components/changePasswordForm';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function ChangePasswordPage() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 py-8">
      <Card className="w-full max-w-xl rounded-lg shadow-2xl">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-[#7367F0] to-[#5F4B8B] p-6">
          <div className="text-white">
            <CardTitle className="text-2xl font-semibold">
              Change Password 🔒
            </CardTitle>
            <p className="text-sm">Update your password below</p>
          </div>
        </CardHeader>

        {/* Form */}
        <UserChangePassword />
      </Card>
    </div>
  );
}
