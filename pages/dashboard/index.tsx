import PageHead from '@/components/shared/page-head.jsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs.js';

import { getUserAsync } from '@/redux/action/authAction.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { MedalIcon, PlaneIcon, Star, TrophyIcon } from 'lucide-react';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);

  return (
    <>
      <PageHead title="Dashboard | App" />
      <div className="max-h-screen flex-1 space-y-6 overflow-y-auto p-6 pt-8 md:p-10">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold tracking-tight">
            Hi, {user?.user?.firstName}! 👋
          </h2>
          {/* {user?.plan && (
            <Badge className="bg-blue-500 text-lg font-semibold text-white">
              {user?.plan?.planId?.planName === 'Basic Plan'
                ? 'Free Plan'
                : user?.plan?.planId?.planName === 'pro'
                  ? 'Pro Plan'
                  : 'Enterprise'}
            </Badge>
          )} */}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {/* <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger> */}
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* User Plan Details */}
              <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <CardHeader className="flex justify-between">
                  <CardTitle>Current Plan</CardTitle>
                  <Star size={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {user?.plan?.planId?.planName || 'N/A'}
                  </div>
                  <p className="text-sm">Upgrade for more features</p>
                </CardContent>
              </Card>

              {/* Notes Stats */}
              <Card>
                <CardHeader className="flex justify-between">
                  <CardTitle>Active Notes</CardTitle>
                  <img
                    src="/images/notes.png"
                    alt="Notes Icon"
                    className="h-10 w-10"
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{0}</div>
                  <p className="text-muted-foreground text-xs">
                    You have active notes to review
                  </p>
                </CardContent>
              </Card>

              {/* Total Tasks */}
              <Card>
                <CardHeader className="flex justify-between">
                  <CardTitle>Total Tasks</CardTitle>
                  <TrophyIcon className="h-8 w-8  text-yellow-500 drop-shadow-lg" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    +{user?.tasksCount || 0}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Completed tasks this month
                  </p>
                </CardContent>
              </Card>

              {/* Stickers Achievements */}
              <Card className="bg-yellow-100">
                <CardHeader className="flex justify-between">
                  <CardTitle>Achievements</CardTitle>
                  <MedalIcon className="h-8 w-8 drop-shadow-lg [color:#FFD700]" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">New Stickers</div>
                  <p className="text-xs">Collect more by completing tasks!</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
