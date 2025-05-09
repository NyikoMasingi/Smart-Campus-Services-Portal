
import React from 'react';

export function TutLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="bg-[#9b87f5] text-white font-bold text-xl px-2 py-1 rounded">
        TUT
      </div>
      <span className="ml-2 font-semibold text-lg hidden sm:inline">Student Portal</span>
    </div>
  );
}
