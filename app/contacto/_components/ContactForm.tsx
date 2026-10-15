'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { IoLogoWhatsapp, IoMailOutline, IoSend } from 'react-icons/io5';
import { Button } from '@/app/components/shared/ui/Button';
import { whatsappHref } from '@/app/constants/church';
import {
  contactReasons,
  initialContactForm,
  type ContactChannel,
  type ContactFormData,
} from '@/app/data/contact';
import {
  combineRules,
  commonValidationRules as rules,
  useFormValidation,
  type ValidationRules,
} from '@/app/hooks/shared/useFormValidation';

type Field = keyof ContactFormData;

const validationRules: ValidationRules<Field> = {
  name: combineRules(rules.required, rules.minLength(3)),
  email: combineRules(rules.required, rules.email),
  phone: rules.phone,
  subject: rules.required,
  message: combineRules(
    rules.required,
    rules.minLength(10),
    rules.maxLength(1500)
  ),
};

const inputClassName = (hasError: boolean) =>
  `w-full rounded-2xl border-2 bg-white px-5 py-4 text-2xl text-navy-900 outline-none transition placeholder:text-navy-300 focus:border-gold-500 ${
    hasError ? 'border-red-400' : 'border-gray-200'
  }`;

const labelClassName = 'mb-2 block text-2xl font-semibold text-navy-900';

/** Arma el texto del mensaje con los datos del formulario. */
const buildMessage = (data: ContactFormData, reasonLabel: string) =>
  [
    `Motivo: ${reasonLabel}`,
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Teléfono: ${data.phone}` : null,
    `Asunto: ${data.subject}`,
    '',
    data.message,
  ]
    .filter((line) => line !== null)
    .join('\n');

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialContactForm);
  const [channel, setChannel] = useState<ContactChannel>('whatsapp');
  const {
    errors,
    touched,
    validateField,
    validateAllFields,
    markFieldAsTouched,
    resetValidation,
  } = useFormValidation<Field>(validationRules);

  const showError = (field: Field) =>
    touched[field] && errors[field] ? errors[field] : null;

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const field = event.target.name as Field;
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) validateField(field, value);
  };

  const handleBlur = (field: Field) => {
    markFieldAsTouched(field);
    validateField(field, formData[field]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    (Object.keys(validationRules) as Field[]).forEach(markFieldAsTouched);

    if (!validateAllFields(formData)) {
      toast.error('Por favor, corrige los campos marcados.');
      return;
    }

    const reason =
      contactReasons.find((item) => item.value === formData.reason) ??
      contactReasons[0];
    const message = buildMessage(formData, reason.label);

    // TODO: enviar desde un Route Handler o servicio de email (fase 2).
    // Por ahora se abre WhatsApp o el cliente de correo con el mensaje listo.
    if (channel === 'whatsapp') {
      window.open(whatsappHref(message), '_blank', 'noopener,noreferrer');
    } else {
      const params = new URLSearchParams({
        subject: `[${reason.label}] ${formData.subject}`,
        body: message,
      });
      window.location.href = `mailto:${reason.email}?${params
        .toString()
        .replace(/\+/g, '%20')}`;
    }

    toast.success('¡Gracias por tu mensaje! Te responderemos pronto.');
    setFormData(initialContactForm);
    resetValidation();
  };

  const fieldProps = (field: Field) => ({
    id: `contact-${field}`,
    name: field,
    value: formData[field],
    onChange: handleChange,
    onBlur: () => handleBlur(field),
    'aria-invalid': Boolean(showError(field)),
    'aria-describedby': showError(field) ? `contact-${field}-error` : undefined,
    className: inputClassName(Boolean(showError(field))),
  });

  const errorMessage = (field: Field) =>
    showError(field) && (
      <p
        id={`contact-${field}-error`}
        role="alert"
        className="mt-2 text-xl text-red-600"
      >
        {showError(field)}
      </p>
    );

  return (
    <div className="rounded-3xl bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.12)] md:p-12">
      <h2 className="mb-8 font-playfair text-4xl font-bold text-navy-900 md:text-5xl">
        Envíanos un Mensaje
      </h2>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <div>
          <label htmlFor="contact-reason" className={labelClassName}>
            Motivo de Contacto
          </label>
          <select {...fieldProps('reason')}>
            {contactReasons.map((reason) => (
              <option key={reason.value} value={reason.value}>
                {reason.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelClassName}>
              Nombre Completo *
            </label>
            <input
              {...fieldProps('name')}
              type="text"
              autoComplete="name"
              placeholder="Tu nombre"
            />
            {errorMessage('name')}
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClassName}>
              Email *
            </label>
            <input
              {...fieldProps('email')}
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
            />
            {errorMessage('email')}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="contact-phone" className={labelClassName}>
              Teléfono
            </label>
            <input
              {...fieldProps('phone')}
              type="tel"
              autoComplete="tel"
              placeholder="+503 1234-5678"
            />
            {errorMessage('phone')}
          </div>
          <div>
            <label htmlFor="contact-subject" className={labelClassName}>
              Asunto *
            </label>
            <input
              {...fieldProps('subject')}
              type="text"
              placeholder="¿En qué podemos ayudarte?"
            />
            {errorMessage('subject')}
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClassName}>
            Mensaje *
          </label>
          <textarea
            {...fieldProps('message')}
            rows={6}
            placeholder="Escribe tu mensaje aquí..."
          />
          {errorMessage('message')}
        </div>

        <fieldset>
          <legend className={labelClassName}>Enviar por</legend>
          <div className="grid grid-cols-2 gap-4">
            {(
              [
                {
                  value: 'whatsapp',
                  label: 'WhatsApp',
                  icon: <IoLogoWhatsapp className="text-[#25d366]" />,
                },
                {
                  value: 'email',
                  label: 'Correo',
                  icon: <IoMailOutline className="text-navy-700" />,
                },
              ] as const
            ).map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 p-4 text-2xl font-semibold transition has-focus-visible:outline-2 has-focus-visible:outline-gold-500 ${
                  channel === option.value
                    ? 'border-gold-500 bg-gold-50 text-navy-900'
                    : 'border-gray-200 text-navy-600 hover:border-gold-300'
                }`}
              >
                <input
                  type="radio"
                  name="channel"
                  value={option.value}
                  checked={channel === option.value}
                  onChange={() => setChannel(option.value)}
                  className="sr-only"
                />
                {option.icon}
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <Button type="submit" size="lg" icon={<IoSend />} className="w-full">
          Enviar Mensaje
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
