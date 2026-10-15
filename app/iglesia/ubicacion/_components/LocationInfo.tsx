'use client';

import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { FiPhone } from 'react-icons/fi';
import { LuMail, LuNavigation } from 'react-icons/lu';
import { ContactInfoItem } from '@/app/components/shared/ui/ContactInfoItem';
import { Button } from '@/app/components/shared/ui/Button';
import { churchInfo, telHref } from '@/app/constants/church';
import { formatServiceTime, servicesByWeekOrder } from '@/app/data/services';
import { useRevealOnScroll } from '@/app/hooks/shared/useRevealOnScroll';

const cardClassName =
  'rounded-3xl bg-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.10)] transition-shadow duration-300 hover:shadow-[0_18px_50px_rgba(15,23,42,0.16)] md:p-10';

const cardTitleClassName =
  'mb-8 flex items-center gap-4 font-playfair text-3xl font-bold text-navy-900 md:text-4xl';

export const LocationInfo = () => {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const { address, phones, emails, map } = churchInfo;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#fffaf3] px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="mx-auto grid w-full max-w-440 grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-10">
          {/* Información de contacto */}
          <div data-reveal className={cardClassName}>
            <h2 className={cardTitleClassName}>
              <IoLocationOutline className="shrink-0 text-gold-600" />
              Información de Contacto
            </h2>
            <div className="flex flex-col gap-8">
              <ContactInfoItem
                icon={<IoLocationOutline />}
                title="Dirección"
                content={[address.line1, address.line2]}
              />
              <ContactInfoItem
                icon={<FiPhone />}
                title="Teléfono"
                iconClassName="from-bronze-500 to-gold-400"
                content={[
                  <a
                    key="office"
                    href={telHref(phones.office)}
                    className="hover:text-gold-700"
                  >
                    {phones.office}
                  </a>,
                  <a
                    key="whatsapp"
                    href={telHref(phones.whatsapp)}
                    className="hover:text-gold-700"
                  >
                    {phones.whatsapp} (WhatsApp)
                  </a>,
                ]}
              />
              <ContactInfoItem
                icon={<LuMail />}
                title="Email"
                iconClassName="from-navy-600 to-navy-400"
                content={[emails.general, emails.pastoral].map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="break-all hover:text-gold-700"
                  >
                    {email}
                  </a>
                ))}
              />
            </div>
          </div>

          {/* Horarios */}
          <div data-reveal className={cardClassName}>
            <h2 className={cardTitleClassName}>
              <IoTimeOutline className="shrink-0 text-gold-600" />
              Horarios de Servicios
            </h2>
            <ul className="flex flex-col">
              {servicesByWeekOrder.map((service) => (
                <li
                  key={`${service.dayNumber}-${service.time}`}
                  className="flex items-center justify-between gap-4 border-b border-gray-100 py-4 last:border-b-0"
                >
                  <span className="text-2xl font-semibold text-navy-900">
                    {service.description}
                  </span>
                  <span className="shrink-0 text-2xl text-bronze-700">
                    {service.day} {formatServiceTime(service.time)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Acciones */}
          <div
            data-reveal
            className="flex flex-col gap-4 sm:flex-row sm:[&>*]:flex-1"
          >
            <Button href={map.directionsUrl} external icon={<LuNavigation />}>
              Cómo llegar
            </Button>
            <Button
              href={telHref(phones.office)}
              variant="navy"
              icon={<FiPhone />}
            >
              Llamar ahora
            </Button>
          </div>
        </div>

        {/* Mapa */}
        <div
          data-reveal
          className="relative rounded-3xl bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.10)] md:p-6 lg:sticky lg:top-28"
        >
          <iframe
            src={map.embedUrl}
            title="Mapa de la Iglesia Bautista Getsemaní"
            className="h-[42rem] w-full rounded-2xl border-0 md:h-[52rem]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-sm md:bottom-10 md:left-10 md:right-auto">
            <p className="font-playfair text-2xl font-bold text-navy-900">
              {churchInfo.name}
            </p>
            <p className="text-xl text-navy-700">{address.line1}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationInfo;
