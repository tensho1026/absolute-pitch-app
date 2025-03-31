import * as Tone from "tone";

export const playRandomNote = async () => {
  await Tone.start();

  const synth = new Tone.Synth().toDestination();

  const notesInC4ToB4 = [
    "C4", "C#4", "D4", "D#4", "E4", "F4",
    "F#4", "G4", "G#4", "A4", "A#4", "B4",
  ];

  const randomNote =
    notesInC4ToB4[Math.floor(Math.random() * notesInC4ToB4.length)];

  synth.triggerAttackRelease(randomNote, "8n");

  console.log("Played:", randomNote);
};
