import Header from "@/components/site/header";
import TravelLog from "@/components/site/travel-log";
import CarDisplay from "@/components/site/car-display";
import BookingForm from "@/components/site/booking-form";
import PricingSection from "@/components/site/pricing-section";
import Footer from "@/components/site/footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <TravelLog />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Left Side: Car Display */}
            <div className="lg:w-2/3">
              <CarDisplay />
            </div>

            {/* Right Side: Booking Form (Sticky on larger screens) */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div id="booking-form-section" className="lg:sticky lg:top-24 bg-card p-6 rounded-xl shadow-xl border">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
        <PricingSection />
      </main>
      
      <Footer />
    </div>
  );
}
