import {
  IoLocationOutline,
  IoLogoWhatsapp,
  IoTimeOutline,
} from 'react-icons/io5';
import { FiPhone } from 'react-icons/fi';
import { LuMail } from 'react-icons/lu';
import { ContactInfoItem } from '@/app/components/shared/ui/ContactInfoItem';
import { Button } from '@/app/components/shared/ui/Button';
import { churchInfo, telHref, whatsappHref } from '@/app/constants/church';

const linkClassName = 'hover:text-gold-700';

export const ContactDetails = () => {
  const { address, phones, emails, officeHours } = churchInfo;

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-3xl bg-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.10)] md:p-10">
        <h2 className="mb-8 font-playfair text-4xl font-bold text-navy-900">
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
            title="Teléfonos"
            iconClassName="from-bronze-500 to-gold-400"
            content={[
              <a
                key="office"
                href={telHref(phones.office)}
                className={linkClassName}
              >
                Oficina: {phones.office}
              </a>,
              <a
                key="whatsapp"
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                WhatsApp: {phones.whatsapp}
              </a>,
              <a
                key="emergencies"
                href={telHref(phones.emergencies)}
                className={linkClassName}
              >
                Emergencias: {phones.emergencies}
              </a>,
            ]}
          />
          <ContactInfoItem
            icon={<LuMail />}
            title="Correos Electrónicos"
            iconClassName="from-navy-600 to-navy-400"
            content={[
              ['General', emails.general],
              ['Pastoral', emails.pastoral],
              ['Jóvenes', emails.youth],
            ].map(([label, email]) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className={`break-all ${linkClassName}`}
              >
                {label}: {email}
              </a>
            ))}
          />
          <ContactInfoItem
            icon={<IoTimeOutline />}
            title="Horarios de Atención"
            iconClassName="from-navy-800 to-navy-600"
            content={[
              ...officeHours.map((item) => `${item.days}: ${item.hours}`),
              'Domingos: servicios religiosos',
            ]}
          />
        </div>
      </div>

      <div className="rounded-3xl bg-linear-to-br from-gold-50 to-gold-100 p-8 md:p-10">
        <h3 className="mb-3 flex items-center gap-3 font-playfair text-3xl font-bold text-navy-900">
          <IoLogoWhatsapp className="text-[#25d366]" />
          Contacto Rápido
        </h3>
        <p className="mb-6 text-2xl leading-relaxed text-navy-700">
          Para consultas urgentes o inmediatas, escríbenos por WhatsApp.
        </p>
        <Button
          href={whatsappHref(
            'Hola, me gustaría obtener más información sobre la iglesia.'
          )}
          external
          icon={<IoLogoWhatsapp />}
          className="w-full"
        >
          Escribir por WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default ContactDetails;
