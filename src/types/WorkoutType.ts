export interface WorkoutType {
  id: string | number;
  name: string;
  image: string;
  muscleGroups: string[]; // Adjust if the API uses a different key like 'categories' or 'tags'
  equipment: string;
  duration: number; // in minutes
  calories: number;
  rating: number;
}