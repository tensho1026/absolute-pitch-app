"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getFullNoteStats } from "@/features/getFullNoteStats";
import NoteStatsChart from "@/components/NoteStatsChart";
import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/button";

type Stat = {
  note: string;
  correct_count: number;
  wrong_count: number;
};

export default function StatsPage() {
  const { user } = useUser();
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    if (user) {
      (async () => {
        const data = await getFullNoteStats(user.id);
        setStats(data);
      })();
    }
  }, [user]);

  return (
    <div className='relative w-screen h-screen flex items-center justify-center bg-[#121c2d] text-white p-4'>
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
      <NoteStatsChart stats={stats} />
    </div>
  );
}
