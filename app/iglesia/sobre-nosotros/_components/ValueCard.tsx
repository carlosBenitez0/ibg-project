'use client';

import React from 'react';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  innerRef?: (el: HTMLDivElement | null) => void;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  icon,
  title,
  description,
  innerRef,
}) => {
  return (
    <div
      ref={innerRef}
      className="relative flex flex-col items-start gap-6 rounded-3xl bg-white p-10 md:p-12 lg:p-14 shadow-[0_18px_50px_rgba(15,23,42,0.12)]"
    >
      <div className="">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-r from-[#e9bd00] to-[#d88a2d] p-3 text-white md:h-22 md:w-22">
          {icon}
        </div>
      </div>

      <h4 className="[font-family:var(--font-playfair-display)] text-2xl md:text-3xl lg:text-3xl font-semibold text-[#1f3551]">
        {title}
      </h4>
      <p className="text-base md:text-lg lg:text-lg text-[#274b78] leading-7">
        {description}
      </p>
    </div>
  );
};

export default ValueCard;
