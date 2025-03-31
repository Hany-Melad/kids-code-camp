
import React from 'react';
import { Award, Download, Share2 } from 'lucide-react';

interface CertificateCardProps {
  id: number;
  title: string;
  course: string;
  date: string;
  imageUrl?: string;
}

const CertificateCard = ({
  id,
  title,
  course,
  date,
  imageUrl,
}: CertificateCardProps) => {
  return (
    <div className="certificate-card bg-white">
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <Award size={32} className="text-blue-500" />
          )}
        </div>
        <div className="flex-grow">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-gray-500">{course}</p>
          <p className="text-xs text-gray-400 mt-1">Awarded on: {date}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button className="flex items-center gap-1 bg-blue-50 text-blue-500 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-100">
          <Download size={16} />
          <span>Download</span>
        </button>
        <button className="flex items-center gap-1 bg-orange-50 text-orange-500 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-orange-100">
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;
