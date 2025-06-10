"use client";

import { Ticket } from "lucide-react";

const TravelLog = () => {
  const logItems = [
    "Popular Route: Hazaribagh to Ranchi - Book Now!",
    "Great Deal: Special Discount on Patna Trips this Weekend!",
    "Just Booked: SUV for a family trip to Netarhat.",
    "Testimonial: 'Smooth ride and professional driver!' - A. Kumar",
    "Explore Jharkhand: Local sightseeing packages available.",
  ];

  return (
    <section className="bg-secondary py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="marquee-container flex items-center">
          <Ticket className="w-6 h-6 text-accent mr-3 shrink-0" />
          <div className="marquee-content text-foreground font-medium">
            {logItems.map((item, index) => (
              <span key={index} className="mx-6">
                {item}
              </span>
            ))}
             {/* Duplicate for seamless loop */}
            {logItems.map((item, index) => (
              <span key={`dup-${index}`} className="mx-6">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelLog;
