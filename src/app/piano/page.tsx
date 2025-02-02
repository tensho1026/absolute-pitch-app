import Piano from "./Piano";

export default function PianoPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        🎹 ピアノ演奏
      </h1>
      <Piano />
    </main>
  );
}
