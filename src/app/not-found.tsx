import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-[1232px] mx-auto w-full px-[15px] md:px-8 flex flex-col items-center justify-center min-h-[70vh] text-center py-10">
      
      <div className="bg-[#151518] p-6 rounded-full border border-zinc-800 mb-8">
        <Dumbbell className="w-12 h-12 text-[#ccff00] -rotate-45" />
      </div>
      
      <h1 className="font-oswald text-7xl md:text-9xl font-bold text-white leading-none mb-4 uppercase">
        404
      </h1>
      
      <h2 className="font-oswald text-2xl md:text-3xl font-bold uppercase tracking-wider text-zinc-300 mb-4">
        Lost your way?
      </h2>
      
      <p className="text-zinc-500 text-sm md:text-base max-w-md mb-10 leading-relaxed">
        The page you are looking for doesn't exist or has been moved. Let's get you back to the library to load up your next set.
      </p>
      
      <Link 
        href="/"
        className="bg-[#ccff00] hover:bg-[#bce600] text-black font-bold uppercase text-sm tracking-wide px-8 py-4 rounded-xl transition-colors"
      >
        Back to workouts
      </Link>
      
    </div>
  );
}