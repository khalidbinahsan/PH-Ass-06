"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";
import { Clock, Flame, Star, Check, X, ChevronDown, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type SortOption = "Duration" | "Calories" | "Rating";

export default function MyPlanPage() {
  const { planWorkouts, savedWorkouts, removeFromPlan, removeSaved } = useFitLog();
  
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortOption>("Duration");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const listToRender = activeTab === "plan" ? planWorkouts : savedWorkouts;
  
  const totalExercises = listToRender.length;
  const totalMinutes = listToRender.reduce((acc, w) => acc + (w.duration || 0), 0);
  const totalCalories = listToRender.reduce((acc, w) => acc + (w.caloriesBurned || 0), 0);

  const sortedList = [...listToRender].sort((a, b) => {
    if (sortBy === "Duration") return (b.duration || 0) - (a.duration || 0);
    if (sortBy === "Calories") return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    if (sortBy === "Rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const handleMarkAsDone = (id: string | number, name: string) => {
    removeFromPlan(id);
    toast.success(`${name} marked as done! Great job!`, {
      icon: '💪',
      style: { background: '#2d3a00', color: '#ccff00' }
    });
  };

  const handleRemove = (id: string | number, listType: "plan" | "saved") => {
    if (listType === "plan") {
      removeFromPlan(id);
      toast("Removed from today's plan", { icon: '🗑️', style: { background: '#3f3f46', color: '#fff' } });
    } else {
      removeSaved(id);
      toast("Removed from saved", { icon: '🗑️', style: { background: '#3f3f46', color: '#fff' } });
    }
  };

  return (
    <div className="max-w-[1232px] mx-auto w-full px-[15px] md:px-8 py-10">
      
      <div className="mb-8">
        <h1 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-2">
          My Plan
        </h1>
        <p className="text-zinc-400 text-sm md:text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="grid grid-cols-3 bg-[#151518] border border-zinc-800 rounded-2xl p-6 md:p-8 mb-8 divide-x divide-zinc-800">
        <div className="flex flex-col pr-4">
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Exercises</span>
          <span className="font-oswald text-4xl md:text-5xl font-bold text-[#ccff00] leading-none">
            {totalExercises}
          </span>
        </div>
        <div className="flex flex-col px-4 md:px-8">
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Minutes</span>
          <span className="font-oswald text-4xl md:text-5xl font-bold text-white leading-none">
            {totalMinutes}
          </span>
        </div>
        <div className="flex flex-col pl-4 md:pl-8">
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Calories</span>
          <span className="font-oswald text-4xl md:text-5xl font-bold text-white leading-none">
            {totalCalories}
          </span>
        </div>
      </div>


      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        
        <div className="flex p-1 bg-[#151518] border border-zinc-800 rounded-xl">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "plan" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "saved" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Saved
          </button>
        </div>


        <div className="flex items-center gap-3">
          <span className="text-zinc-500 text-sm font-medium">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-[#151518] border border-zinc-800 text-white text-sm font-medium py-2 pl-4 pr-10 rounded-xl outline-none focus:border-zinc-600 cursor-pointer"
            >
              <option value="Duration">Duration</option>
              <option value="Calories">Calories</option>
              <option value="Rating">Rating</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 border border-zinc-800 border-dashed rounded-3xl bg-[#0a0a0a]">
          <Loader2 className="w-10 h-10 text-[#ccff00] animate-spin mb-4" />
          <p className="text-zinc-400 font-medium">Loading workouts...</p>
        </div>
      ) : sortedList.length === 0 ? (
        
        <div className="flex flex-col items-center justify-center py-24 border border-zinc-800 border-dashed rounded-3xl bg-[#0a0a0a]">
          <h3 className="font-oswald text-2xl font-bold uppercase text-white mb-2">Nothing Here Yet</h3>
          <p className="text-zinc-500 mb-6 text-sm text-center max-w-[250px]">
            Browse the library and add a lift to get today moving.
          </p>
          <Link 
            href="/" 
            className="bg-[#ccff00] hover:bg-[#bce600] text-black font-bold uppercase text-sm tracking-wide px-6 py-3 rounded-xl transition-colors"
          >
            Go to workouts
          </Link>
        </div>

      ) : (

        <div className="flex flex-col gap-4">
          {sortedList.map((workout) => (
            <div 
              key={workout.id} 
              className="flex flex-col md:flex-row items-center gap-6 bg-[#151518] border border-zinc-800 rounded-2xl p-4 md:p-5"
            >
              <div className="relative w-full md:w-32 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0">
                <Image 
                  src={workout.image || "/images/placeholder.jpg"} 
                  alt={workout.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col w-full md:flex-grow">
                <h3 className="font-oswald text-xl font-bold uppercase text-white leading-tight mb-1">
                  {workout.name}
                </h3>
                <p className="text-zinc-500 text-xs mb-3">{workout.equipment}</p>             
                <div className="flex items-center gap-4 text-zinc-400 text-xs font-medium">
                  <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#ccff00]" /> {workout.duration} min</div>
                  <div className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-[#ccff00]" /> {workout.caloriesBurned} kcal</div>
                  <div className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-[#ccff00]" /> {workout.rating}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-zinc-800/50 mt-2 md:mt-0 justify-between md:justify-end">
                
                <Link 
                  href={`/workouts/${workout.id}`}
                  className="px-4 py-2 border border-zinc-700 hover:bg-zinc-800 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                >
                  View Details
                </Link>

                <div className="flex items-center gap-2">
                  {activeTab === "plan" && (
                    <button 
                      onClick={() => handleMarkAsDone(workout.id, workout.name)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#ccff00] hover:bg-[#bce600] text-black text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Mark as Done
                    </button>
                  )}
                  
                  <button 
                    onClick={() => handleRemove(workout.id, activeTab)}
                    className="p-2 text-zinc-500 hover:bg-zinc-800 hover:text-red-400 rounded-lg transition-colors"
                    aria-label="Remove workout"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}