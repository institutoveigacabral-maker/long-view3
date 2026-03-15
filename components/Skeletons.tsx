
import React from 'react';

export const SectionSkeleton: React.FC = () => (
  <div className="w-full py-40 px-6 animate-pulse">
    <div className="max-w-4xl mx-auto">
      <div className="h-4 w-32 bg-gray-100 mx-auto mb-8"></div>
      <div className="h-20 w-full bg-gray-100 mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 bg-gray-50"></div>
        ))}
      </div>
    </div>
  </div>
);
