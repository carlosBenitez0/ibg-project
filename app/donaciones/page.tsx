import type { Metadata } from 'next';
import { PageHeader } from '@/app/components/shared/general/PageHeader';
import { Footer } from '@/app/components/shared/general/Footer';
import { pageHeaderIconsMap } from '@/app/constants/pageIcons';
import { DonationForm } from './_components/DonationForm';
import { BankInfo } from './_components/BankInfo';
import { DonationImpact } from './_components/DonationImpact';

export const metadata: Metadata = {
  title: 'Donaciones | Iglesia Bautista Getsemaní',
  description:
    'Apoya la obra de la Iglesia Bautista Getsemaní con tu ofrenda, misiones o construcción.',
};

export default function DonationsPage() {
  return (
    <main>
      <PageHeader
        title="Donaciones"
        subtitle="Tu generosidad ayuda a extender el Reino de Dios y bendecir a nuestra comunidad."
        icon={pageHeaderIconsMap['Donaciones']}
      />

      {/* Fundamento bíblico */}
      <section className="w-full bg-white px-5 py-16 sm:px-8 md:py-20">
        <figure className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <blockquote className="mb-4 font-playfair text-3xl italic leading-relaxed text-navy-800 md:text-4xl">
            &quot;Cada uno dé como propuso en su corazón: no con tristeza, ni
            por necesidad, porque Dios ama al dador alegre.&quot;
          </blockquote>
          <figcaption className="text-2xl font-semibold text-bronze-700">
            2 Corintios 9:7
          </figcaption>
        </figure>
      </section>

      <DonationForm />
      <BankInfo />
      <DonationImpact />
      <Footer />
    </main>
  );
}
