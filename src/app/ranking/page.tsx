"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Home } from "lucide-react";
import { Button } from "@/components/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

type Ranking = {
  username: string;
  score: number;
};

export default function RankingPage() {
  const { user } = useUser(); // ← Clerkのユーザー情報
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

      {/* 装飾 */}
      <div className='w-full flex justify-center mb-4'>
        <div className='flex w-full max-w-4xl'>
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={`h-8 flex-1 ${
                i % 2 === 0 ? "bg-white" : "bg-[#121c2d]"
              }`}
            />
          ))}
        </div>
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
          <Table>
            <TableHeader>
              <TableRow className='border-gray-700 hover:bg-[#1a2942]'>
                <TableHead className='text-gray-300 w-16 text-center'>
                  Rank
                </TableHead>
                <TableHead className='text-gray-300'>Username</TableHead>
                <TableHead className='text-gray-300 text-right'>
                  Score
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rankings.map((rank, index) => {
                const isCurrentUser = rank.username === user?.fullName;

                return (
                  <TableRow
                    key={index}
                    className={`border-gray-700 hover:bg-[#232f4a] ${
                      index < 3 ? "bg-opacity-20" : ""
                    }`}
                  >
                    <TableCell className='font-medium text-center'>
                      {index === 0 ? (
                        <div className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f0c14b] text-[#121c2d]'>
                          <Trophy className='h-5 w-5' />
                        </div>
                      ) : index < 3 ? (
                        <div className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-[#121c2d]'>
                          <Medal className='h-5 w-5' />
                        </div>
                      ) : (
                        index + 1
                      )}
                    </TableCell>
                    <TableCell
                      className={
                        isCurrentUser ? "font-bold text-[#f0c14b]" : ""
                      }
                    >
                      {rank.username}
                    </TableCell>
                    <TableCell className='text-right font-bold text-[#f0c14b]'>
                      {rank.score}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* フッター装飾 */}
      <div className='w-full flex justify-center mt-8'>
        <div className='flex w-full max-w-4xl'>
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={`h-8 flex-1 ${
                i % 2 === 0 ? "bg-white" : "bg-[#121c2d]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
