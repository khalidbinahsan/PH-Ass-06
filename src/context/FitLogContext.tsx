"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { WorkoutType } from "../types/WorkoutType";

interface FitLogContextType {
  planWorkouts: WorkoutType[];
  savedWorkouts: WorkoutType[];
  addToPlan: (workout: WorkoutType) => void;
  removeFromPlan: (id: string | number) => void;
  saveWorkout: (workout: WorkoutType) => void;
  removeSaved: (id: string | number) => void;
  isWorkoutInPlan: (id: string | number) => boolean;
  isWorkoutSaved: (id: string | number) => boolean;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [planWorkouts, setPlanWorkouts] = useState<WorkoutType[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<WorkoutType[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      
      if (storedPlan) {
        setPlanWorkouts(JSON.parse(storedPlan));
      }
      if (storedSaved) {
        setSavedWorkouts(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error("Failed to load from localStorage", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const addToPlan = (workout: WorkoutType) => {
    if (!planWorkouts.some((item) => item.id === workout.id)) {
      const newPlan = [...planWorkouts, workout];
      setPlanWorkouts(newPlan);
      localStorage.setItem("fitlog_plan", JSON.stringify(newPlan));
    }
  };

  const removeFromPlan = (id: string | number) => {
    const newPlan = planWorkouts.filter((item) => item.id !== id);
    setPlanWorkouts(newPlan);
    localStorage.setItem("fitlog_plan", JSON.stringify(newPlan));
  };

  const saveWorkout = (workout: WorkoutType) => {
    if (!savedWorkouts.some((item) => item.id === workout.id)) {
      const newSaved = [...savedWorkouts, workout];
      setSavedWorkouts(newSaved);
      localStorage.setItem("fitlog_saved", JSON.stringify(newSaved));
    }
  };

  const removeSaved = (id: string | number) => {
    const newSaved = savedWorkouts.filter((item) => item.id !== id);
    setSavedWorkouts(newSaved);
    localStorage.setItem("fitlog_saved", JSON.stringify(newSaved));
  };

  const isWorkoutInPlan = (id: string | number) => planWorkouts.some((item) => item.id === id);
  const isWorkoutSaved = (id: string | number) => savedWorkouts.some((item) => item.id === id);

  if (!isInitialized) {
    return null; 
  }

  return (
    <FitLogContext.Provider
      value={{
        planWorkouts,
        savedWorkouts,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSaved,
        isWorkoutInPlan,
        isWorkoutSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }
  return context;
}