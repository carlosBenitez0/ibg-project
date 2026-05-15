import { Footer } from './components/shared/general/Footer';
import { Header } from './components/shared/general/Header';
import { HomePage } from './Home/HomePage';

export default function Home() {
  return (
    <>
      <Header
        withHeroVH={true}
        image="/images/predicacion1.jpg"
        alt="iglesia-ibg"
      />
      <HomePage />
      <Footer />
    </>
  );
}
