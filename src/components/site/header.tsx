import Image from "next/image";
import HeaderCounters from "./header-counters";

const Header = () => {
  return (
    <header className="relative text-primary-foreground py-16 sm:py-24 md:py-32 bg-primary overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://placehold.co/1920x600.png"
          alt="Scenic travel background"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="opacity-30"
          data-ai-hint="travel landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-primary/90"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-md">
          Raju Travels - Hazaribagh
        </h1>
        <p className="text-lg sm:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto drop-shadow-sm">
          Your reliable partner for comfortable and affordable journeys.
        </p>
        <HeaderCounters />
      </div>
    </header>
  );
};

export default Header;
