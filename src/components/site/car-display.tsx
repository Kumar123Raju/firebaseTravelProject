"use client";

import type { Car } from "@/lib/types";
import { useEffect, useState } from "react";
import CarCard from "./car-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ServerCrash } from "lucide-react";
import { dummyCars } from "@/lib/dummy-cars"; // 👈 Add this


const CARS_PER_PAGE = 8;

const CarDisplay = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCars = async (pageNum: number) => {
    setLoading(true);
    try {
      // In a real app, you'd pass pagination params like ?page=${pageNum}&limit=${CARS_PER_PAGE}
      // For now, we simulate pagination if the API doesn't support it directly.
      // const response = await fetch(`http://localhost:8081/getCarList`);
    const response: { ok: boolean; json: () => Promise<Car[]> } = {
                    ok: true,
                 json: async () => dummyCars, // dummyCars must be imported
        };
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      let allCars: Car[] = await response.json();


      // ✅ Fallback to dummy data if API returns empty or fails silently
       allCars = allCars.length ? allCars : dummyCars;
      
      // Simulate pagination client-side if API doesn't support it
      const newCars = allCars.slice((pageNum - 1) * CARS_PER_PAGE, pageNum * CARS_PER_PAGE);

      if (pageNum === 1) {
        setCars(newCars);
      } else {
        setCars((prevCars) => [...prevCars, ...newCars]);
      }
      
      setHasMore(allCars.length > pageNum * CARS_PER_PAGE);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred while fetching cars.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(page);
  }, [page]);

  const loadMoreCars = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && cars.length === 0) {
    return (
      <section className="py-8">
        <h2 className="text-3xl font-headline font-bold mb-8 text-center text-foreground">Our Fleet</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: CARS_PER_PAGE }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-48 w-full bg-muted" />
              <Skeleton className="h-6 w-3/4 bg-muted" />
              <Skeleton className="h-4 w-1/2 bg-muted" />
              <Skeleton className="h-10 w-full bg-muted" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-8">
        <ServerCrash className="h-4 w-4" />
        <AlertTitle>Error Fetching Cars</AlertTitle>
        <AlertDescription>{error} Please try refreshing the page.</AlertDescription>
      </Alert>
    );
  }
  
  if (cars.length === 0 && !loading) {
     return (
      <section className="py-8 text-center">
        <h2 className="text-3xl font-headline font-bold mb-8 text-foreground">Our Fleet</h2>
        <p className="text-muted-foreground">No cars available at the moment. Please check back later.</p>
      </section>
     );
  }

  return (
    <section className="py-8">
      <h2 className="text-3xl font-headline font-bold mb-8 text-center text-foreground">Our Fleet</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      {loading && cars.length > 0 && (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`loader-${index}`} className="space-y-3">
              <Skeleton className="h-48 w-full bg-muted" />
              <Skeleton className="h-6 w-3/4 bg-muted" />
              <Skeleton className="h-4 w-1/2 bg-muted" />
              <Skeleton className="h-10 w-full bg-muted" />
            </div>
          ))}
        </div>
      )}
      {hasMore && !loading && (
        <div className="text-center mt-8">
          <Button onClick={loadMoreCars} variant="outline" size="lg">
            Load More Cars
          </Button>
        </div>
      )}
    </section>
  );
};

export default CarDisplay;
