"use client";

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

export default function Slider({
  label,
  value,
  min = 0,
  max = 1,
  step = 0.01,
  onChange,
}: SliderProps) {
  return (
    <div className='w-64 min-w-[300px] mb-4'>
      <label className='block text-lg font-semibold mb-1 text-white'>
        {label}: {value.toFixed(2)}
      </label>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className='w-full cursor-pointer bg-gray-300 rounded-lg accent-blue-500'
      />
    </div>
  );
}
