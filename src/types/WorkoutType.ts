export interface WorkoutType {
  id: string | number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number; 
  caloriesBurned: number;
  rating: number;
}