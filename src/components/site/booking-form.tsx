"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, User, Phone, Mail, MapPin, Users, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { BookingFormData } from "@/lib/types";
import { useState } from "react";

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().regex(/^\d{10}$/, { message: "Contact number must be 10 digits." }),
  email: z.string().email({ message: "Invalid email address." }),
  pickupLocation: z.string().min(3, { message: "Pickup location is required." }),
  dropLocation: z.string().min(3, { message: "Drop location is required." }),
  bookingDate: z.date({ required_error: "Booking date is required." }),
  numPeople: z.coerce.number().min(1, { message: "At least 1 person." }).max(20, { message: "Maximum 20 people."}),
});

const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      pickupLocation: "",
      dropLocation: "",
      bookingDate: undefined, 
      numPeople: 1,
    },
  });

  async function onSubmit(values: BookingFormData) {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8081/saveForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Submission failed with status " + response.status }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      // const result = await response.json(); // Assuming server sends back a confirmation
      toast({
        title: "Booking Submitted!",
        description: "We've received your request and will contact you shortly.",
        variant: "default", 
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-2xl font-headline font-semibold mb-6 text-center text-foreground">Book Your Ride</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><User className="w-4 h-4 mr-2 text-primary" />Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><Phone className="w-4 h-4 mr-2 text-primary" />Contact Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="10-digit Mobile Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><Mail className="w-4 h-4 mr-2 text-primary" />Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pickupLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-primary" />Pickup Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Hazaribagh Bus Stand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dropLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-primary" />Drop Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Ranchi Airport" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bookingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center"><CalendarIcon className="w-4 h-4 mr-2 text-primary" />Booking Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } // Disable past dates
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numPeople"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center"><Users className="w-4 h-4 mr-2 text-primary" />Number of People</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6" disabled={isSubmitting}>
            <Send className="w-5 h-5 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Booking"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
