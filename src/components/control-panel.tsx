"use client"

import { Music } from "lucide-react"
import { Slider } from "./Slider"

interface ControlPanelProps {
  attack: number
  decay: number
  sustain: number
  release: number
  onAttackChange: (value: number) => void
  onDecayChange: (value: number) => void
  onSustainChange: (value: number) => void
  onReleaseChange: (value: number) => void
}

export function ControlPanel({
  attack,
  decay,
  sustain,
  release,
  onAttackChange,
  onDecayChange,
  onSustainChange,
  onReleaseChange,
}: ControlPanelProps) {
  return (
    <aside className="w-72 bg-gray-900 text-white p-6 shadow-lg">
      <div className="space-y-8">
        <h2 className="font-bold text-xl mb-6 flex items-center">
          <Music className="mr-2 h-5 w-5" />
          Sound Controls
        </h2>

        <div className="space-y-3">
          <label className="flex justify-between text-sm font-medium">
            <span>Attack:</span>
            <span>{attack.toFixed(2)}</span>
          </label>
          <Slider value={[attack]} onValueChange={(value) => onAttackChange(value[0])} min={0} max={1} step={0.01} />
        </div>

        <div className="space-y-3">
          <label className="flex justify-between text-sm font-medium">
            <span>Decay:</span>
            <span>{decay.toFixed(2)}</span>
          </label>
          <Slider value={[decay]} onValueChange={(value) => onDecayChange(value[0])} min={0} max={1} step={0.01} />
        </div>

        <div className="space-y-3">
          <label className="flex justify-between text-sm font-medium">
            <span>Sustain:</span>
            <span>{sustain.toFixed(2)}</span>
          </label>
          <Slider value={[sustain]} onValueChange={(value) => onSustainChange(value[0])} min={0} max={1} step={0.01} />
        </div>

        <div className="space-y-3">
          <label className="flex justify-between text-sm font-medium">
            <span>Release:</span>
            <span>{release.toFixed(2)}</span>
          </label>
          <Slider value={[release]} onValueChange={(value) => onReleaseChange(value[0])} min={0} max={1} step={0.01} />
        </div>
      </div>
    </aside>
  )
}

