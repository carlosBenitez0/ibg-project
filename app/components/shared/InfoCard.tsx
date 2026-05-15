interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  message: string;
}

export const InfoCard = ({ icon, title, subtitle, message }: InfoCardProps) => {
  return (
    <div
      className="flex flex-col items-center justify-start gap-3 w-full min-h-64 bg-linear-to-b from-white to-amber-50 rounded-2xl px-5 py-8 md:px-6 md:py-8 lg:px-8 lg:py-10
    shadow-md hover:shadow-2xl border border-amber-100 transform transition-all duration-300 hover:scale-105"
    >
      <div
        className="text-4xl md:text-5xl lg:text-6xl text-white bg-linear-to-br from-amber-400 to-yellow-500 p-4 md:p-5 rounded-2xl 
      shadow-lg"
      >
        {icon}
      </div>
      <h3 className="text-3xl md:text-2xl lg:text-3xl [font-family:var(--font-playfair-display)] font-bold text-amber-900 text-center">
        {title}
      </h3>
      <h4 className="text-[14px] md:text-lg lg:text-xl font-semibold text-amber-600 text-center">
        {subtitle}
      </h4>
      <p className="text-xl md:text-lg lg:text-2xl text-gray-700 text-center leading-relaxed">
        {message}
      </p>
    </div>
  );
};
