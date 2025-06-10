import Image from "next/image";
import HeaderCounters from "./header-counters";

const Header = () => {
  return (
    <header className="relative text-primary-foreground py-12 sm:py-16 md:py-20 bg-primary overflow-hidden">
  <div className="absolute inset-0">
    <Image
      src="https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80"
      alt="Scenic travel background"
      layout="fill"
      objectFit="cover"
      quality={80}
      className="opacity-60" // Increased opacity for better visibility
      priority // Ensures quick loading
    />
    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-primary/90"></div>
  </div>
  <div className="container mx-auto px-4 relative z-10 text-center">
    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
      Raju Travels - Hazaribagh
    </h1>
    <p className="text-base sm:text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto drop-shadow-sm">
      Your reliable partner for comfortable and affordable journeys.
    </p>
    <HeaderCounters />
  </div>
</header>
  );
};

export default Header;
