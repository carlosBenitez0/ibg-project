import type { Metadata } from 'next';
import { PageHeader } from '@/app/components/shared/general/PageHeader';
import { Footer } from '@/app/components/shared/general/Footer';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';
import { ContactForm } from './_components/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto | Iglesia Bautista Getsemaní',
  description:
    'Escríbenos, pide oración o planifica tu visita a la Iglesia Bautista Getsemaní.',
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        title="Contacto"
        subtitle="Estamos aquí para ti. Escríbenos, pide oración o planifica tu visita."
        icon={pageHeaderIconsMap['Contacto']}
      />
      <section className="w-full bg-[#fffaf3] px-5 py-20 sm:px-8 md:px-12 md:py-28">
        <div className="mx-auto w-full max-w-440">
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
