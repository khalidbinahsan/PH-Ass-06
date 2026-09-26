"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import {WorkoutType} from '../../types/WorkoutType';
interface WorkoutProps {
    data: WorkoutType
}
const WrokoutCard = ({data}: WorkoutProps) => {
    return (
        <Link 
              key={data.id} 
              href={`/workouts/${data.id}`}
              className="bg-[#151518] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-colors group flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-900">
                <Image
                  src={data.image || "/images/placeholder.jpg"} 
                  alt={data.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  {data.muscleGroups?.map((t, index) => (
                    <span 
                      key={index} 
                      className="bg-[#ccff00] text-black px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-oswald text-xl font-bold text-white uppercase leading-tight mb-1">
                  {data.name}
                </h3>
                <p className="text-zinc-500 text-sm mb-6 flex-grow">
                  {data.equipment}
                </p>
                <div className="flex items-center gap-5 text-zinc-400 text-xs font-medium pt-4 border-t border-zinc-800/50">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{data.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{data.calories} kcal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5" />
                    <span>{data.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
    );
};

export default WrokoutCard;