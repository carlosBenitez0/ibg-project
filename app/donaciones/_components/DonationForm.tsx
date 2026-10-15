'use client';

import { useState } from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import { LuHammer, LuHandCoins } from 'react-icons/lu';
import {
  donationPurposes,
  MAX_DONATION_AMOUNT,
  predefinedAmounts,
  type DonationPurposeId,
} from '@/app/data/donations';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';
import { PaymentOptions } from './PaymentOptions';

const purposeIcons: Record<DonationPurposeId, React.ReactNode> = {
  offering: <IoHeartOutline />,
  missions: <LuHandCoins />,
  construction: <LuHammer />,
};

/** Valida el monto libre; devuelve el error o null. */
const validateCustomAmount = (value: string) => {
  if (!value) return null;
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0)
    return 'Ingresa un monto mayor a $0';
  if (amount > MAX_DONATION_AMOUNT)
    return `Para montos mayores a $${MAX_DONATION_AMOUNT.toLocaleString('en-US')}, contáctanos directamente`;
  return null;
};

export const DonationForm = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const [purposeId, setPurposeId] = useState<DonationPurposeId>('offering');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState('');

  const customError = validateCustomAmount(customAmount);
  const amount = customAmount
    ? customError
      ? null
      : Number(customAmount)
    : selectedAmount;
  const purpose =
    donationPurposes.find((item) => item.id === purposeId) ??
    donationPurposes[0];

  return (
    <section
      ref={sectionRef}
      id="donar"
      className="w-full bg-[#fffaf3] px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div
        data-reveal
        className="mx-auto w-full max-w-[100rem] rounded-3xl bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.12)] md:p-14"
      >
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-playfair text-4xl font-bold text-navy-900 md:text-5xl">
            Realizar Donación
          </h2>
          <p className="text-2xl text-navy-700">
            Selecciona el propósito y el monto de tu donación
          </p>
        </div>

        {/* Propósito */}
        <fieldset className="mb-12">
          <legend className="mb-6 font-playfair text-3xl font-bold text-navy-900">
            Propósito de la Donación
          </legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {donationPurposes.map((item) => {
              const isActive = item.id === purposeId;
              return (
                <label
                  key={item.id}
                  className={`cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 has-focus-visible:outline-2 has-focus-visible:outline-gold-500 ${
                    isActive
                      ? 'border-gold-500 bg-gold-50'
                      : 'border-gray-200 hover:border-gold-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="purpose"
                    value={item.id}
                    checked={isActive}
                    onChange={() => setPurposeId(item.id)}
                    className="sr-only"
                  />
                  <span
                    className={`mb-4 block text-4xl ${isActive ? 'text-gold-600' : 'text-gray-400'}`}
                  >
                    {purposeIcons[item.id]}
                  </span>
                  <span className="mb-2 block text-2xl font-semibold text-navy-900">
                    {item.title}
                  </span>
                  <span className="block text-xl leading-relaxed text-navy-600">
                    {item.description}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Monto */}
        <fieldset className="mb-10">
          <legend className="mb-6 font-playfair text-3xl font-bold text-navy-900">
            Monto de Donación
          </legend>
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {predefinedAmounts.map((value) => {
              const isActive = !customAmount && selectedAmount === value;
              return (
                <label
                  key={value}
                  className={`cursor-pointer rounded-2xl border-2 p-5 text-center text-3xl font-bold transition-all duration-300 has-focus-visible:outline-2 has-focus-visible:outline-gold-500 ${
                    isActive
                      ? 'border-gold-500 bg-gold-50 text-gold-700'
                      : 'border-gray-200 text-navy-900 hover:border-gold-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="amount"
                    value={value}
                    checked={isActive}
                    onChange={() => {
                      setSelectedAmount(value);
                      setCustomAmount('');
                    }}
                    className="sr-only"
                  />
                  ${value}
                </label>
              );
            })}
          </div>

          <label
            htmlFor="custom-amount"
            className="mb-2 block text-2xl font-semibold text-navy-900"
          >
            Otro monto (USD)
          </label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-navy-500">
              $
            </span>
            <input
              id="custom-amount"
              type="number"
              inputMode="decimal"
              min="1"
              step="0.01"
              placeholder="0.00"
              value={customAmount}
              onChange={(event) => setCustomAmount(event.target.value)}
              aria-invalid={Boolean(customError)}
              aria-describedby={customError ? 'custom-amount-error' : undefined}
              className={`w-full rounded-2xl border-2 py-4 pl-12 pr-6 text-2xl text-navy-900 outline-none transition focus:border-gold-500 ${
                customError ? 'border-red-400' : 'border-gray-200'
              }`}
            />
          </div>
          {customError && (
            <p
              id="custom-amount-error"
              role="alert"
              className="mt-2 text-xl text-red-600"
            >
              {customError}
            </p>
          )}
        </fieldset>

        {/* Resumen */}
        <div
          aria-live="polite"
          className="rounded-2xl bg-navy-900 p-6 text-center text-2xl text-white"
        >
          {amount ? (
            <>
              Vas a donar{' '}
              <strong className="text-gold-300">
                ${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </strong>{' '}
              para <strong className="text-gold-300">{purpose.title}</strong>
            </>
          ) : (
            'Selecciona o ingresa un monto válido'
          )}
        </div>

        <PaymentOptions amount={amount} purposeTitle={purpose.title} />
      </div>
    </section>
  );
};

export default DonationForm;
