"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import WrokoutCard from "./WrokoutCard";
import {WorkoutType} from '../../types/WorkoutType';


export default function Library() {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!response.ok) throw new Error("Failed to fetch workouts");
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="max-w-[1232px] mx-auto w-full px-[15px] md:px-8 py-16">
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white uppercase mb-2">
          The Library
        </h2>
        <p className="text-zinc-400 text-sm md:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Loading Animation */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-[#ccff00] animate-spin" />
          <p className="text-zinc-400 font-medium animate-pulse">Loading workouts...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout, index) => <WrokoutCard key={index} data={workout} />)}
        </div>
      )}
    </section>
  );
}