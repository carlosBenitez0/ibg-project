import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { HeroVH } from './HeroVH';

interface HeaderProps {
  withHeroVH?: boolean;
  image?: string;
  alt?: string;
}

export const Header = ({ withHeroVH = false, image, alt }: HeaderProps) => {
  return (
    <div className="relative h-dvh w-full overflow-hidden flex justify-center">
      <Navbar inHeroSection={withHeroVH} />
      {withHeroVH && image && alt ? (
        <HeroVH image={image} alt={alt} />
      ) : (
        <Hero />
      )}
    </div>
  );
};
