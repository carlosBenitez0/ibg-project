'use client';

import { toast } from 'react-toastify';
import { IoCopyOutline } from 'react-icons/io5';
import { SectionHeader } from '@/app/components/shared/SectionHeader';
import { churchInfo, whatsappHref } from '@/app/constants/church';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

const copyToClipboard = async (value: string, label: string) => {
  try {
    await navigator.clipboard.writeText(value);
    toast.success(`${label} copiado`);
  } catch {
    toast.error('No se pudo copiar, cópialo manualmente');
  }
};

export const BankInfo = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const { bankAccounts } = churchInfo.donations;

  return (
    <section
      ref={sectionRef}
      id="datos-bancarios"
      className="w-full scroll-mt-24 bg-white px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-12">
        <div data-reveal>
          <SectionHeader
            title="Información Bancaria"
            subtitle="Para donaciones por transferencia o depósito directo"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {bankAccounts.map((account) => (
            <article
              key={account.bank}
              data-reveal
              className="rounded-3xl bg-linear-to-br from-[#fffaf3] to-gold-50 p-8 shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
            >
              <h3 className="mb-6 font-playfair text-3xl font-bold text-navy-900">
                {account.bank}
              </h3>
              <dl className="flex flex-col gap-4 text-2xl">
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-semibold text-navy-700">Cuenta:</dt>
                  <dd className="flex items-center gap-2 font-mono text-navy-900">
                    {account.accountNumber}
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          account.accountNumber,
                          'Número de cuenta'
                        )
                      }
                      aria-label={`Copiar número de cuenta de ${account.bank}`}
                      className="cursor-pointer rounded-lg p-2 text-gold-700 transition hover:bg-gold-100"
                    >
                      <IoCopyOutline />
                    </button>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-navy-700">Titular:</dt>
                  <dd className="text-right text-navy-900">{account.holder}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-navy-700">Tipo:</dt>
                  <dd className="text-navy-900">{account.accountType}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <p
          data-reveal
          className="rounded-2xl border border-gold-200 bg-gold-50 p-6 text-2xl leading-relaxed text-navy-800"
        >
          <strong>Importante:</strong> después de realizar tu depósito, envía el
          comprobante por{' '}
          <a
            href={whatsappHref(
              'Hola, envío el comprobante de mi donación a la iglesia.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold-800 underline"
          >
            WhatsApp al {churchInfo.phones.whatsapp}
          </a>{' '}
          o por email a{' '}
          <a
            href={`mailto:${churchInfo.emails.donations}`}
            className="font-semibold text-gold-800 underline"
          >
            {churchInfo.emails.donations}
          </a>{' '}
          para registrar tu donación.
        </p>
      </div>
    </section>
  );
};

export default BankInfo;
