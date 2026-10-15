interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  /** Clases del degradado del icono */
  iconClassName?: string;
  className?: string;
}

export const StatCard = ({
  icon,
  value,
  label,
  iconClassName = 'from-gold-400 to-bronze-500',
  className = '',
}: StatCardProps) => {
  return (
    <div
      className={`flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-[0_12px_32px_rgba(15,23,42,0.10)] transition-shadow duration-300 hover:shadow-[0_18px_50px_rgba(15,23,42,0.16)] md:p-10 ${className}`}
    >
      <div
        className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-r text-4xl text-white ${iconClassName}`}
      >
        {icon}
      </div>
      <p className="mb-2 font-playfair text-5xl font-bold text-navy-900">
        {value}
      </p>
      <p className="text-2xl text-navy-700">{label}</p>
    </div>
  );
};

export default StatCard;
