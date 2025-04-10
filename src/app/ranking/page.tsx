"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Home } from "lucide-react";
import { Button } from "@/components/button";
import Link from "next/link";
import BarsStripe from "@/components/BarsStripe";
import RankingTable from "@/components/RankingTable";

type Ranking = {
  username: string;
  score: number;
};

export default function RankingPage() {
  const [rankings, setRankings] = useState<Ranking[]>([]);

  useEffect(() => {
    const fetchRankings = async () => {
      const res = await fetch("/api/rankings");
      const data = await res.json();
      const sorted = data.sort((a: Ranking, b: Ranking) => b.score - a.score);
      setRankings(sorted);
    };

    fetchRankings();
  }, []);

  return (
    <div className='min-h-screen bg-[#121c2d] text-white flex flex-col items-center p-4 relative'>
      <div className='absolute top-2 left-12'>
        <Link href='/'>
          <Button
            variant='ghost'
            className='rounded-full hover:bg-gray-100 h-12 w-12 p-0'
          >
            <Home />
          </Button>
        </Link>
      </div>

      {/* // 上部 */}
      <div className='w-full flex justify-center mb-4'>
        <BarsStripe />
      </div>

      <h1 className='text-5xl font-bold text-[#f0c14b] mb-2 text-center'>
        Absolute Pitch
      </h1>
      <p className='text-gray-300 mb-8 text-center italic'>
        Master your musical ear through practice and play
      </p>

      <Card className='w-full max-w-2xl bg-[#1a2942] border-none shadow-lg'>
        <CardHeader className='border-b border-gray-700'>
          <CardTitle className='text-3xl text-[#f0c14b] flex items-center justify-center gap-2'>
            <Trophy className='h-8 w-8' />
            Ranking
          </CardTitle>
        </CardHeader>
        <CardContent className='p-6'>
          <RankingTable rankings={rankings} />
        </CardContent>
      </Card>

      {/* // 下部 */}
      <div className='w-full flex justify-center mt-8'>
        <BarsStripe />
      </div>
    </div>
  );
}
