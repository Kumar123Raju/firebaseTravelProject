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
      const response = await fetch("http://localhost:8080/api/bookings/count");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: CounterData = await response.json();
      console.log("Fetched counters:", data);
      console.log("Counters fetched successfully!");
      // Assuming API returns totalBookings and todaysBookings instead of totalData and todayData
      // If API keys are totalData and todayData, change data.totalBookings to data.totalData etc.
      setCounters({ totalBookings: data.totalBookings, todayBookings: data.todayBookings });
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred");
      }
      setCounters({ totalBookings: 0, todayBookings: 0}); // Fallback on error
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
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-center">
  {/* Total Bookings Counter */}
  <div className="relative p-5 bg-black rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-200 group">
    <div className="absolute -top-2 -right-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
      ★
    </div>
    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
      Total Bookings
    </p>
    {loading ? (
      <Skeleton className="h-9 w-20 mx-auto bg-gray-800 rounded-md" />
    ) : (
      <p className="text-3xl font-bold text-white">
        {error ? "N/A" : (counters?.totalBookings ?? 0).toLocaleString()}
        <span className="block w-10 h-0.5 bg-white/30 mx-auto mt-1 group-hover:bg-white/50 transition-all"></span>
      </p>
    )}
  </div>

  {/* Today's Bookings Counter */}
  <div className="relative p-5 bg-black rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-200 group">
    <div className="absolute -top-2 -right-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
      ↑
    </div>
    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
      Today's Bookings
    </p>
    {loading ? (
      <Skeleton className="h-9 w-20 mx-auto bg-gray-800 rounded-md" />
    ) : (
      <p className="text-3xl font-bold text-white">
        {error ? "N/A" : counters?.todayBookings ?? 0}
        {!error && counters?.todayBookings && counters.todayBookings > 0 && (
          <span className="ml-1 text-sm text-white/70">↑</span>
        )}
      </p>
    )}
  </div>

  {/* Error Message */}
  {error && (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black border border-gray-700 px-3 py-1 rounded-full text-xs text-gray-300 flex items-center gap-1">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      Data unavailable
    </div>
  )}
</div>
  );
};

export default HeaderCounters;
