
import React from 'react';
import { Card } from '@/components/ui/card';
import { BookOpen, Users, Award, CreditCard, CircleHelp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Mock data for dashboard
  const stats = [
    { title: 'Total Courses', value: '8', icon: BookOpen, color: 'bg-blue-500', link: '/admin/courses' },
    { title: 'Total Students', value: '24', icon: Users, color: 'bg-green-500', link: '/admin/students' },
    { title: 'Total Quizzes', value: '15', icon: CircleHelp, color: 'bg-purple-500', link: '/admin/quizzes' },
    { title: 'Fee Payments', value: '18', icon: CreditCard, color: 'bg-yellow-500', link: '/admin/payments' },
    { title: 'Certificates Issued', value: '12', icon: Award, color: 'bg-pink-500', link: '/admin/certificates' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link to={stat.link} key={stat.title}>
            <Card className="p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{stat.title}</h3>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">Recent Activities</h3>
      <Card className="p-4 space-y-4">
        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
          <div>
            <p className="font-medium">New course added: Advanced Python</p>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
          <Link to="/admin/courses" className="text-blue-500 text-sm">View</Link>
        </div>

        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
          <div>
            <p className="font-medium">Quiz results updated: JavaScript Basics</p>
            <p className="text-sm text-gray-500">Yesterday</p>
          </div>
          <Link to="/admin/quizzes" className="text-blue-500 text-sm">View</Link>
        </div>

        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
          <div>
            <p className="font-medium">5 new students enrolled</p>
            <p className="text-sm text-gray-500">3 days ago</p>
          </div>
          <Link to="/admin/students" className="text-blue-500 text-sm">View</Link>
        </div>

        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
          <div>
            <p className="font-medium">4 certificates issued</p>
            <p className="text-sm text-gray-500">Last week</p>
          </div>
          <Link to="/admin/certificates" className="text-blue-500 text-sm">View</Link>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
