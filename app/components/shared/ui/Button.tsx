import Link from 'next/link';

type ButtonVariant = 'primary' | 'navy' | 'outline' | 'white';
type ButtonSize = 'md' | 'lg';

interface BaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  /** Abre en otra pestaña (enlaces externos) */
  external?: boolean;
}

interface NativeButtonProps extends BaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const baseStyles =
  'inline-flex items-center justify-center gap-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-linear-to-r from-gold-400 to-bronze-500 text-white hover:shadow-lg hover:shadow-gold-400/40',
  navy: 'bg-navy-900 text-white hover:bg-navy-800',
  outline:
    'border-2 border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-white',
  white: 'bg-white text-navy-900 hover:bg-gold-50',
};

const sizes: Record<ButtonSize, string> = {
  md: 'px-8 py-4 text-2xl',
  lg: 'px-10 py-5 text-[1.8rem]',
};

/**
 * Botón de la marca. Con `href` renderiza un enlace (interno con next/link
 * o externo con `external`); sin `href`, un `<button>`.
 */
export const Button = (props: ButtonProps) => {
  const {
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    className = '',
  } = props;

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  );

  if (props.href !== undefined) {
    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  const { onClick, type = 'button', disabled = false } = props;
  const disabledStyles = disabled
    ? 'cursor-not-allowed opacity-50 hover:translate-y-0'
    : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
    >
      {content}
    </button>
  );
};

export default Button;
