
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStudent } from '@/contexts/StudentContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Award, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { isAuthenticated, user, profile, subscription, logout, loading } = useStudent();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, loading, navigate]);
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  // Check if subscription is active
  const isSubscriptionActive = subscription && new Date(subscription.expiry_date) > new Date() && subscription.status === 'active';
  
  return (
    <div className="container mx-auto p-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{profile?.full_name || user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Student ID</p>
                  <p className="font-medium">{profile?.student_id || 'Not assigned yet'}</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center ${isSubscriptionActive ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                  <CreditCard size={28} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">
                    {isSubscriptionActive ? 'Active Subscription' : 'No Active Subscription'}
                  </h3>
                  {isSubscriptionActive ? (
                    <p className="text-gray-600">Your subscription is active until {new Date(subscription.expiry_date).toLocaleDateString()}</p>
                  ) : (
                    <p className="text-gray-600">You don't have an active subscription. Please make a payment to access courses.</p>
                  )}
                </div>
              </div>
              
              {!isSubscriptionActive && (
                <Button asChild className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                  <Link to="/payment">
                    <CreditCard className="h-4 w-4 mr-2" /> Make Payment
                  </Link>
                </Button>
              )}
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">My Certificates</h2>
            <div className="space-y-4">
              <div className="text-center py-8">
                <Award size={40} className="mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">You haven't earned any certificates yet.</p>
                <p className="text-gray-500 text-sm mt-1">Complete courses to earn certificates!</p>
              </div>
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/certificates">
                  <Award className="h-4 w-4 mr-2" /> View All Certificates
                </Link>
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Courses Enrolled</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Courses Completed</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Quizzes Completed</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Score</span>
                <span className="font-medium">-</span>
              </div>
              
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/">
                  Explore Courses
                </Link>
              </Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <p className="text-center text-gray-500 py-8">No recent activity</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
