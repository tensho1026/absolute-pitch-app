"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value = [0],
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      ...props
    },
    ref
  ) => {
    const trackRef = React.useRef<HTMLDivElement>(null);
    const thumbRef = React.useRef<HTMLDivElement>(null);
    const rangeRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [currentValue, setCurrentValue] = React.useState(value[0]);

    // Calculate percentage for positioning
    const percentage = ((currentValue - min) / (max - min)) * 100;

    // Update the range and thumb position
    React.useEffect(() => {
      if (rangeRef.current && thumbRef.current) {
        rangeRef.current.style.width = `${percentage}%`;
        thumbRef.current.style.left = `${percentage}%`;
      }
    }, [percentage]);

    // Handle value changes from props
    React.useEffect(() => {
      setCurrentValue(value[0]);
    }, [value]);

    // Handle mouse/touch events
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      updateValue(e.clientX);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateValue(e.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const updateValue = (clientX: number) => {
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const position = clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, position / rect.width));
        const newValue = min + percentage * (max - min);
        const steppedValue = Math.round(newValue / step) * step;
        const clampedValue = Math.max(min, Math.min(max, steppedValue));

        setCurrentValue(clampedValue);
        onValueChange([clampedValue]);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <div
          ref={trackRef}
          className='relative h-2 w-full grow overflow-hidden rounded-full bg-gray-700'
          onMouseDown={handleMouseDown}
        >
          <div
            ref={rangeRef}
            className='absolute h-full bg-blue-500'
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          ref={thumbRef}
          className='absolute h-4 w-4 rounded-full border-2 border-blue-500 bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
          style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
          onMouseDown={handleMouseDown}
        />
      </div>
    );
  }
);

Slider.displayName = "Slider";
