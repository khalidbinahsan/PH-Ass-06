"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useFitLog } from "@/context/FitLogContext";
import { CalendarPlus, Bookmark, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function WorkoutDetailsPage() {
  const { slug } = useParams();
  const [workout, setWorkout] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { addToPlan, saveWorkout, isWorkoutInPlan, isWorkoutSaved, planWorkouts } = useFitLog();

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const response = await fetch(`https://api.api-store.workers.dev/api/fitlog/${slug}`);
        if (!response.ok) throw new Error("Workout not found");
        const data = await response.json();
        setWorkout(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (slug) fetchWorkoutDetails();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-[#ccff00] animate-spin" />
        <p className="text-zinc-400">Loading workout details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-white mb-2">Workout Not Found</h1>
        <p className="text-zinc-400">The workout you are looking for doesn't exist.</p>
      </div>
    );
  }

  const inPlan = isWorkoutInPlan(workout.id);
  const isSaved = isWorkoutSaved(workout.id);

  const handleAddToPlan = () => {
    if (inPlan) {
      toast("Already in today's plan", {
        icon: 'ℹ️',
        style: { background: '#3f3f46', color: '#fff' }
      });
      return;
    }
    if (planWorkouts.length >= 5) {
      toast.error("Cap of 5 lifts reached for today!");
      return;
    }
    addToPlan(workout);
    toast.success("Added to today's plan");
  };

  const handleSaveForLater = () => {
    if (isSaved) {
      toast("Already in saved list", {
        icon: 'ℹ️',
        style: { background: '#3f3f46', color: '#fff' }
      });
      return;
    }
    saveWorkout(workout);
    toast.success("Saved for later");
  };

  return (
    <div className="max-w-[1232px] mx-auto w-full px-[15px] md:px-8 py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Left Side: Large Image */}
        <div className="relative w-full aspect-square md:aspect-[4/5] bg-zinc-900 rounded-3xl overflow-hidden">
          <Image 
            src={workout.image || "/images/placeholder.jpg"} 
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side: Details */}
        <div className="flex flex-col">
          
          <h1 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white mb-4">
            {workout.name}
          </h1>
          
          {/* Subtitle / Description */}
          <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
            {workout.description || "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
          </p>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {workout.muscleGroups?.map((cat: string, index: number) => (
              <span 
                key={index} 
                className="bg-[#ccff00] text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Key Specs Table Panel */}
          <div className="bg-[#151518] border border-zinc-800 rounded-2xl p-6 mb-8">
            <div className="flex flex-col gap-4">
              <SpecRow label="Equipment" value={workout.equipment} />
              <SpecRow label="Difficulty" value={workout.difficulty || "Intermediate"} />
              <SpecRow label="Sets" value={workout.sets || "4"} />
              <SpecRow label="Reps" value={workout.reps || "6-8"} />
              <SpecRow label="Duration" value={`${workout.duration} min`} />
              <SpecRow label="Calories" value={`${workout.caloriesBurned} kcal`} />
              <SpecRow label="Rating" value={workout.rating} borderBottom={false} />
            </div>
          </div>

          {/* Instructions List */}
          <div className="mb-10">
            <h3 className="text-white font-bold uppercase tracking-wide mb-4">Instructions</h3>
            <ol className="list-decimal list-outside ml-5 text-zinc-400 space-y-3">
              {workout.instructions?.map((step: string, i: number) => (
                <li key={i} className="pl-2">{step}</li>
              )) || (
                <>
                  <li className="pl-2">Lie on the bench with eyes under the bar and feet planted.</li>
                  <li className="pl-2">Unrack with locked elbows and lower the bar to mid-chest.</li>
                  <li className="pl-2">Press up in a slight arc until elbows lock without bouncing.</li>
                  <li className="pl-2">Keep shoulder blades pinched and a natural arch in the back.</li>
                </>
              )}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button 
              onClick={handleAddToPlan}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wide transition-colors ${
                inPlan 
                  ? "bg-[#2d3a00] text-[#ccff00] hover:bg-[#384700]" 
                  : "bg-[#ccff00] hover:bg-[#bce600] text-black"
              }`}
            >
              <CalendarPlus className="w-5 h-5" />
              {inPlan ? "Added to Plan" : "Add to today's plan"}
            </button>
            
            <button 
              onClick={handleSaveForLater}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wide transition-colors border ${
                isSaved
                  ? "bg-[#27272a] border-zinc-700 text-zinc-400 hover:bg-[#3f3f46]" 
                  : "border-zinc-700 hover:bg-zinc-900 text-white"
              }`}
            >
              <Bookmark className="w-5 h-5" />
              {isSaved ? "Saved" : "Save for later"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function SpecRow({ label, value, borderBottom = true }: { label: string, value: string | number, borderBottom?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${borderBottom ? "border-b border-zinc-800/60 pb-4" : ""}`}>
      <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{label}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  );
}