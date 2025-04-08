import TechShowcase from "@/components/tech-showcase";
import type { Metadata } from "next";

export default function TechnologiesPage() {
  return (
    <div className='min-h-screen bg-[#0f172a] text-white'>
      <main className='container mx-auto px-4 py-12'>
        <h1 className='text-5xl font-bold text-center mb-4 text-[#f7c948]'>
          Technologies
        </h1>
        <p className='text-center text-xl mb-12 text-gray-300'>
          Technologies Empowering This App
        </p>
        <TechShowcase />
      </main>
    </div>
  );
}
