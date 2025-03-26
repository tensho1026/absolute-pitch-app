"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface SongSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function SongSelector({ value, onChange }: SongSelectorProps) {
  return (
    <div className='w-64 relative'>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className='border-gray-300 focus:ring-2 focus:ring-blue-500'>
          <SelectValue placeholder='Select a song'>
            {value === "twinkle" && "Twinkle Twinkle Little Star"}
            {value === "mary" && "Mary Had a Little Lamb"}
            {value === "happy" && "Happy Birthday"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='twinkle'>Twinkle Twinkle Little Star</SelectItem>
          <SelectItem value='mary'>Mary Had a Little Lamb</SelectItem>
          <SelectItem value='happy'>Happy Birthday</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
