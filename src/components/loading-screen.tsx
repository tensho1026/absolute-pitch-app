"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Piano keys data - alternating white and black keys
  const whiteKeys = Array.from({ length: 10 });
  const blackKeys = [0, 1, 3, 4, 5, 7, 8];

  const noteRotations = [5, -3, 8, -6];

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-[#111a2f] z-50'>
      {/* Logo */}
      <motion.h1
        className='text-5xl md:text-6xl font-serif text-[#f8d568] mb-4'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Absolute Pitch
      </motion.h1>

      <motion.p
        className='text-gray-300 mb-12 text-center px-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Master your musical ear through practice and play
      </motion.p>

      {/* Piano animation */}
      <div className='relative w-[280px] md:w-[400px] h-[120px] mb-8'>
        {/* White keys */}
        <div className='flex h-full'>
          {whiteKeys.map((_, i) => (
            <motion.div
              key={`white-${i}`}
              className='flex-1 bg-white rounded-b-md border border-gray-300 mr-[2px]'
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: progress > i * 10 ? [1, 0.97, 1] : 1,
              }}
              transition={{
                delay: i * 0.08,
                duration: 0.3,
                scale: {
                  duration: 0.2,
                  repeat: progress > i * 10 ? 1 : 0,
                  repeatDelay: 1.5,
                },
              }}
            />
          ))}
        </div>

        {/* Black keys */}
        <div className='absolute top-0 left-0 flex w-full'>
          {blackKeys.map((position) => (
            <motion.div
              key={`black-${position}`}
              className='absolute h-[70px] w-[24px] md:w-[32px] bg-[#111a2f] rounded-b-md z-10'
              style={{
                left: `calc(${position * 10 + 7}% + 4px)`,
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: progress > position * 12 ? [1, 0.95, 1] : 1,
              }}
              transition={{
                delay: position * 0.06 + 0.2,
                duration: 0.4,
                scale: {
                  duration: 0.15,
                  repeat: progress > position * 12 ? 1 : 0,
                  repeatDelay: 1.8,
                },
              }}
            />
          ))}
        </div>

        {/* // Musical notes animation */}

        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={`note-${i}`}
            className='absolute text-[#f8d568] text-2xl'
            initial={{
              y: 120,
              x: 40 * i,
              opacity: 0,
              rotate: noteRotations[i - 1],
            }}
            animate={{
              y: [-20, -80, -120],
              opacity: [0, 1, 0],
              rotate: noteRotations[i - 1],
            }}
            transition={{
              duration: 2,
              delay: i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: i * 0.3,
            }}
          >
            ♪
          </motion.div>
        ))}
      </div>

      {/* Loading progress */}
      <div className='w-[280px] md:w-[400px] bg-gray-700 rounded-full h-2 mb-4'>
        <motion.div
          className='bg-[#f8d568] h-2 rounded-full'
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.p
        className='text-gray-300 text-sm'
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 10 ? 1 : 0 }}
      >
        {isComplete ? "Ready!" : "Loading your musical experience..."}
      </motion.p>
    </div>
  );
}
