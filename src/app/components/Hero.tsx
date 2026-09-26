import React from 'react';
import Image from "next/image";
const Hero = () => {
    return (
        <section className="pt-8 pb-12 max-w-[1232px] mx-auto w-full px-[15px] md:px-8">
      <div className="bg-[#15171D] rounded-[32px] flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16 gap-10">
        <div className="w-full md:w-3/5 flex flex-col items-start gap-6">
          <span className="text-[#C2F800] text-sm font-bold tracking-widest uppercase">
            Workout Library
          </span>
          
          <h1 className="font-oswald text-4xl md:text-6xl lg:text-[60px]} font-bold text-white uppercase leading-[1.1]">
            Train with intent. Log <br className="hidden md:block" /> every set.
          </h1>
          
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed md:max-w-[550px]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          
          <a 
            href="#library" 
            className="mt-2 bg-[#C2F800] hover:bg-[#bce600] text-black text-sm font-bold uppercase tracking-wide px-8 py-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            Browse Workouts
          </a>
        </div>

        <div className="w-full md:w-2/5 flex justify-center md:justify-end">
          <Image 
            src="/images/hero-machine.png" 
            alt="3D anatomy figure on a preacher curl machine" 
            width={334} 
            height={334} 
            priority
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>
        
      </div>
    </section>
    );
};

export default Hero;