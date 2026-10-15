interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  /** Una o varias líneas; acepta nodos para incluir enlaces */
  content: React.ReactNode | React.ReactNode[];
  /** Clases del degradado del icono */
  iconClassName?: string;
}

export const ContactInfoItem = ({
  icon,
  title,
  content,
  iconClassName = 'from-gold-400 to-bronze-500',
}: ContactInfoItemProps) => {
  const lines = Array.isArray(content) ? content : [content];

  return (
    <div className="flex items-start gap-5">
      <div
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-r text-3xl text-white ${iconClassName}`}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="mb-1 text-2xl font-bold text-navy-900">{title}</h3>
        {lines.map((line, index) => (
          <p key={index} className="text-2xl leading-relaxed text-navy-700">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoItem;
