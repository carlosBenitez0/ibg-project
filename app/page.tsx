import { Footer } from './components/shared/Footer';
import { Header } from './components/shared/Header';
import { HomePage } from './Home/HomePage';

export default function Home() {
  return (
    <>
      <Header
        withHeroVH={true}
        image="/images/ibg_images/bgibg2.jpeg"
        alt="iglesia-ibg"
      />
      <HomePage />
      <Footer />
    </>
  );
}
