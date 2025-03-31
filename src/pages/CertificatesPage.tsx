
import React from 'react';
import { Award } from 'lucide-react';
import CertificateCard from '@/components/CertificateCard';
import BottomNav from '@/components/BottomNav';

// Mock data for certificates
const certificates = [
  {
    id: 1,
    title: "Python Basics",
    course: "Python for Beginners",
    date: "July 15, 2023",
    imageUrl: "https://img.icons8.com/color/48/000000/python.png"
  },
  {
    id: 2,
    title: "HTML & CSS Fundamentals",
    course: "Web Development Basics",
    date: "August 23, 2023",
    imageUrl: "https://img.icons8.com/color/48/000000/html-5.png"
  }
];

const CertificatesPage = () => {
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold flex items-center justify-center gap-2">
          <Award size={20} className="text-orange-500" />
          My Certificates
        </h1>
      </header>

      {/* Certificates */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Earned Certificates</h2>
        
        {certificates.length > 0 ? (
          <div className="space-y-4">
            {certificates.map((certificate) => (
              <CertificateCard key={certificate.id} {...certificate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border">
            <Award size={48} className="text-gray-300 mx-auto" />
            <h3 className="mt-4 text-lg font-medium">No Certificates Yet</h3>
            <p className="text-gray-500 mt-2">Complete courses to earn certificates</p>
          </div>
        )}
      </div>

      {/* In Progress */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">In Progress</h2>
        
        <div className="bg-white rounded-xl border p-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award size={32} className="text-orange-500" />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold">Game Development</h3>
              <p className="text-sm text-gray-500">Game Development with Scratch</p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500" style={{ width: "15%" }} />
              </div>
              <p className="text-xs text-gray-400 mt-1">15% completed</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default CertificatesPage;
