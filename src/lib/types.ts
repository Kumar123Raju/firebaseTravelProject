export interface CounterData {
  totalBookings: number;
  todaysBookings: number;
}

export interface Car {
  id: string;
  imageUrl: string;
  model: string;
  capacity: number;
  features: string[];
  availability: string;
  pricePerKm?: number; // Optional, if API provides it
  hourlyRate?: number; // Optional
}

export interface BookingFormData {
  name: string;
  contact: string;
  email: string;
  pickupLocation: string;
  dropLocation: string;
  bookingDate: Date;
  numPeople: number;
}
