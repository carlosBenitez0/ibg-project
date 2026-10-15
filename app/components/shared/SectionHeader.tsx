'use client';

import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  showLine?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  showLine = true,
}) => {
  return (
    <div className="w-full flex flex-col items-center text-center">
      <h3 className="mb-4 [font-family:var(--font-playfair-display)] text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1f3551]">
        {title}
      </h3>
      {subtitle && (
        <p className="mb-4 max-w-2xl text-lg md:text-2xl lg:text-3xl text-[#274b78]">
          {subtitle}
        </p>
      )}
      {showLine && <div className="h-1 w-20 rounded-full bg-[#d7a119]" />}
    </div>
  );
};

export default SectionHeader;
