
import React, { useEffect, useRef, useState } from 'react';
// import { Button } from '@headlessui/react';
import Feature from './Feature';
import Button from '../Button/Button';
// import './Card.css';
import { Link } from 'react-router-dom';

const Card = () => {
    const features = [
        {
          title: "Code Editor with Test Cases",
          description: "Practice problems with real-time code execution and test case validation.",
          icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>
        ,
          color: "text-green-400 ",
        },
        {
          title: "Interactive DSA Animations",
          description: "Learn how algorithms work under the hood with visual demonstrations.",
          icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        ,
          color: "text-yellow-400 ",
        },
        {
          title: "Structured Problem Sets",
          description: "Tackle challenges sorted by difficulty, topics, and patterns.",
          icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
        </svg>
        ,
          color: "text-blue-300",
        },
        {
          title: "Beginner-Friendly Interface",
          description: "Designed to help students transition smoothly from learning to problem-solving.",
          icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        ,
          color: "text-pink-400",
        },
    ];
    const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  const extendedFeatures = [
    features[features.length - 1],
    ...features,
    features[0]
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const current = container.children[index + 1];
    if (current) {
      const containerHeight = container.clientHeight;
      const scrollTop = current.offsetTop - containerHeight / 2 + current.clientHeight / 2;
      container.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }, [index]);


    return (
      <div className="flex flex-col [@media(min-width:450px)]:flex-row flex-wrap">



            {/* Text Section */}
            <div className='relative m-6 lg:m-20  h-fit  overflow-hidden rounded-xl border border-gray-800 p-[1px] backdrop-blur-3xl'>
      <span className='absolute inset-[-1000%]  animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
      <div className='inline-flex h-full  flex-col sm:flex-row flex-wrap lg:flex-nowrap  items-center justify-center rounded-xl bg-gray-950 px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl' >
    
            <div className="m-5 relative p-3  w-full md:w-1/2 text-center md:text-left text-white">
                <p className="text-red-400">Why We're Your</p>
                <h3 className="text-3xl md:text-5xl font-bold">Best Code Learning Choice?</h3>
                <p className="text-gray-300 mb-8">Choose CodeHelp for an unparalleled coding experience</p>
                <Button label="Start Learning"  to="/dsa" className="mt-8 relative bg-gradient-to-r from-blue-500 to-sky-500" />
            </div>

            {/* Features Section */}
            <div className="relative m-5 p-4 w-full md:w-1/2 h-[400px] overflow-hidden rounded-md text-white">
      <div
        className="relative h-full overflow-y-scroll no-scrollbar snap-y snap-mandatory"
        ref={containerRef}
      >
        {extendedFeatures.map((feature, i) => {
          const realIndex = (index + 1) % extendedFeatures.length;
          const isActive = i === realIndex;
          const blurClass = isActive ? 'blur-0 opacity-100 scale-100 z-10' : 'opacity-40 scale-95 z-1 border-gray-300';

          return (
            <div
              key={i}
              className={`h-[180px]  mt-3 mb-3 border-sky-300 snap-center transition-all duration-500 ease-in-out flex-shrink-0 ${blurClass}`}
            >
              <Feature {...feature} />
            </div>
          );
        })}
      </div>
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
      </div>
      </div>
    );
};

export default Card;
