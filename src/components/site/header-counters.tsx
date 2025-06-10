"use client";

import type { CounterData } from "@/lib/types";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HeaderCounters = () => {
  const [counters, setCounters] = useState<CounterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/getData");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: CounterData = await response.json();
      // Assuming API returns totalBookings and todaysBookings instead of totalData and todayData
      // If API keys are totalData and todayData, change data.totalBookings to data.totalData etc.
      setCounters({ totalBookings: data.totalBookings, todaysBookings: data.todaysBookings });
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred");
      }
      setCounters({ totalBookings: 0, todaysBookings: 0}); // Fallback on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-center">
      <div>
        <p className="text-sm uppercase tracking-wider text-primary-foreground/80">Total Bookings</p>
        {loading ? (
          <Skeleton className="h-8 w-20 mx-auto mt-1 bg-primary-foreground/20" />
        ) : (
          <p className="text-3xl font-bold text-primary-foreground">
            {error ? "N/A" : counters?.totalBookings ?? 0}
          </p>
        )}
      </div>
      <div>
        <p className="text-sm uppercase tracking-wider text-primary-foreground/80">Today's Bookings</p>
        {loading ? (
          <Skeleton className="h-8 w-20 mx-auto mt-1 bg-primary-foreground/20" />
        ) : (
          <p className="text-3xl font-bold text-primary-foreground">
            {error ? "N/A" : counters?.todaysBookings ?? 0}
          </p>
        )}
      </div>
      {error && <p className="text-xs text-red-200 col-span-full sm:col-span-2">Failed to load booking data. Displaying fallback.</p>}
    </div>
  );
};

export default HeaderCounters;
