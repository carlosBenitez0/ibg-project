'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { IoMailOutline } from 'react-icons/io5';
import { Button } from '@/app/components/shared/ui/Button';
import {
  combineRules,
  commonValidationRules,
} from '@/app/hooks/shared/useFormValidation';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

const validateEmail = combineRules(
  commonValidationRules.required,
  commonValidationRules.email
);

export const NewsletterForm = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateEmail(email);
    setError(validationError);
    if (validationError) return;

    // TODO: conectar con el proveedor de newsletter cuando exista backend
    toast.success('¡Gracias por suscribirte! Pronto recibirás novedades.');
    setEmail('');
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-navy-900 px-5 py-20 text-white sm:px-8 md:px-10 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <IoMailOutline data-reveal className="mb-6 text-6xl text-gold-400" />
        <h2
          data-reveal
          className="font-playfair text-4xl font-bold sm:text-5xl md:text-6xl"
        >
          Suscríbete a Nuestro Blog
        </h2>
        <p
          data-reveal
          className="mt-6 text-2xl leading-relaxed text-gold-300 md:text-3xl"
        >
          Recibe las últimas reflexiones y enseñanzas directamente en tu correo.
        </p>

        <form
          data-reveal
          onSubmit={handleSubmit}
          noValidate
          className="mt-10 flex w-full flex-col gap-4 sm:flex-row"
        >
          <div className="flex flex-1 flex-col text-left">
            <label htmlFor="newsletter-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError(null);
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'newsletter-error' : undefined}
              className="w-full rounded-full border-2 border-transparent bg-white px-8 py-4 text-2xl text-navy-900 outline-none placeholder:text-navy-400 focus:border-gold-400"
            />
            {error && (
              <p
                id="newsletter-error"
                role="alert"
                className="mt-2 px-6 text-xl text-red-300"
              >
                {error}
              </p>
            )}
          </div>
          <Button type="submit" size="lg" className="self-start sm:self-auto">
            Suscribirse
          </Button>
        </form>

        <p data-reveal className="mt-6 text-xl text-white/60">
          No spam. Puedes darte de baja en cualquier momento.
        </p>
      </div>
    </section>
  );
};

export default NewsletterForm;
