"use client";

import { useState } from "react";
import { Home, Music } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Button } from "@/components/button";
import PianoKeyboard from "@/components/Piano";
import SheetMusic from "@/components/sheetScore";

import Link from "next/link";
import { Slider } from "@/components/Slider";

export default function PianoPage() {
  const [currentSong, setCurrentSong] = useState("twinkle");
  const [attack, setAttack] = useState(0.02);
  const [decay, setDecay] = useState(0.1);
  const [sustain, setSustain] = useState(0.3);
  const [release, setRelease] = useState(0.5);
  const [currentNote, setCurrentNote] = useState<string | null>(null);

  return (
    <div className='flex flex-col h-screen bg-gray-50'>
      {/* Header with home button */}
      <header className='p-4 bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <Link href='/'>
            <Button
              variant='ghost'
              size='icon'
              className='rounded-full hover:bg-gray-100'
            >
              <Home className='h-6 w-6' />
              <span className='sr-only'>Home</span>
            </Button>
          </Link>
          <div className='w-64'>
            <Select value={currentSong} onValueChange={setCurrentSong}>
              <SelectTrigger className='border-gray-300 focus:ring-2 focus:ring-blue-500'>
                <SelectValue placeholder='Select a song' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='twinkle'>
                  Twinkle Twinkle Little Star
                </SelectItem>
                <SelectItem value='mary'>Mary Had a Little Lamb</SelectItem>
                <SelectItem value='happy'>Happy Birthday</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='w-6'></div> {/* Spacer for balance */}
        </div>
      </header>

      <div className='flex flex-1 overflow-hidden'>
        {/* Main content area */}
        <main className='flex-1 flex flex-col items-center p-6'>
          {/* Sheet music display */}
          <div className='w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6 flex-1 border border-gray-200'>
            <SheetMusic currentSong={currentSong} currentNote={currentNote} />
          </div>

          {/* Piano keyboard */}
          <div className='w-full max-w-6xl mt-auto'>
            <PianoKeyboard
              onNotePlay={setCurrentNote}
              adsr={{ attack, decay, sustain, release }}
            />
          </div>
        </main>

        {/* Right sidebar with controls */}
        <aside className='w-72 bg-gray-900 text-white p-6 shadow-lg'>
          <div className='space-y-8'>
            <h2 className='font-bold text-xl mb-6 flex items-center'>
              <Music className='mr-2 h-5 w-5' />
              Sound Controls
            </h2>

            <div className='space-y-3'>
              <label className='flex justify-between text-sm font-medium'>
                <span>Attack:</span>
                <span>{attack.toFixed(2)}</span>
              </label>
              <Slider
                value={[attack]}
                onValueChange={(value) => setAttack(value[0])}
                max={1}
                step={0.01}
                className='[&>span:first-child]:bg-blue-400 [&>span:first-child]:h-2 [&>span:first-child]:rounded-md [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-blue-500'
              />
            </div>

            <div className='space-y-3'>
              <label className='flex justify-between text-sm font-medium'>
                <span>Decay:</span>
                <span>{decay.toFixed(2)}</span>
              </label>
              <Slider
                value={[decay]}
                onValueChange={(value) => setDecay(value[0])}
                max={1}
                step={0.01}
                className='[&>span:first-child]:bg-blue-400 [&>span:first-child]:h-2 [&>span:first-child]:rounded-md [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-blue-500'
              />
            </div>

            <div className='space-y-3'>
              <label className='flex justify-between text-sm font-medium'>
                <span>Sustain:</span>
                <span>{sustain.toFixed(2)}</span>
              </label>
              <Slider
                value={[sustain]}
                onValueChange={(value) => setSustain(value[0])}
                max={1}
                step={0.01}
                className='[&>span:first-child]:bg-blue-400 [&>span:first-child]:h-2 [&>span:first-child]:rounded-md [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-blue-500'
              />
            </div>

            <div className='space-y-3'>
              <label className='flex justify-between text-sm font-medium'>
                <span>Release:</span>
                <span>{release.toFixed(2)}</span>
              </label>
              <Slider
                value={[release]}
                onValueChange={(value) => setRelease(value[0])}
                max={1}
                step={0.01}
                className='[&>span:first-child]:bg-blue-400 [&>span:first-child]:h-2 [&>span:first-child]:rounded-md [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-blue-500'
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
