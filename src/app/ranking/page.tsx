"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Home } from "lucide-react"
import { Button } from "@/components/button";
import Link from "next/link"


// Sample ranking data - replace with your actual data source
const sampleRankings = [
  { id: 1, username: "Mozart", score: 98 },
  { id: 2, username: "Beethoven", score: 95 },
  { id: 3, username: "Bach", score: 92 },
  { id: 4, username: "Chopin", score: 88 },
  { id: 5, username: "Liszt", score: 85 },
  { id: 6, username: "Debussy", score: 82 },
  { id: 7, username: "Tchaikovsky", score: 79 },
  { id: 8, username: "Brahms", score: 76 },
  { id: 9, username: "Schubert", score: 73 },
  { id: 10, username: "Handel", score: 70 },
]

export default function RankingPage() {
  const [rankings, setRankings] = useState(sampleRankings)

  // You can fetch actual rankings data here
  useEffect(() => {
    // Example fetch call (commented out)
    // const fetchRankings = async () => {
    //   const response = await fetch('/api/rankings')
    //   const data = await response.json()
    //   setRankings(data)
    // }
    // fetchRankings()
  }, [])

  return (
    <div className="min-h-screen bg-[#121c2d] text-white flex flex-col items-center p-4 relative">
       <div className='absolute top-2 left-12  '>
        <Link href='/'>
          <Button
            variant='ghost'
            className='rounded-full hover:bg-gray-100  h-12 w-12 p-0'
          >
            <Home className='' />
          </Button>
        </Link>
      </div>
      {/* Piano keys header decoration */}
      <div className="w-full flex justify-center mb-4">
        <div className="flex w-full max-w-4xl">
          {[...Array(16)].map((_, i) => (
            <div key={i} className={`h-8 flex-1 ${i % 2 === 0 ? "bg-white" : "bg-[#121c2d]"}`} />
          ))}
        </div>
      </div>

      <h1 className="text-5xl font-bold text-[#f0c14b] mb-2 text-center">Absolute Pitch</h1>
      <p className="text-gray-300 mb-8 text-center italic">Master your musical ear through practice and play</p>

      <Card className="w-full max-w-2xl bg-[#1a2942] border-none shadow-lg">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-3xl text-[#f0c14b] flex items-center justify-center gap-2">
            <Trophy className="h-8 w-8" />
            Ranking
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-[#1a2942]">
                <TableHead className="text-gray-300 w-16 text-center">Rank</TableHead>
                <TableHead className="text-gray-300">Username</TableHead>
                <TableHead className="text-gray-300 text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankings.map((rank, index) => (
                <TableRow
                  key={rank.id}
                  className={`border-gray-700 hover:bg-[#232f4a] ${index < 3 ? "bg-opacity-20" : ""}`}
                >
                  <TableCell className="font-medium text-center">
                    {index === 0 ? (
                      <div className="inline-flex items-center justify-center bg-[#f0c14b] text-[#121c2d] w-8 h-8 rounded-full">
                        <Trophy className="h-5 w-5" />
                      </div>
                    ) : index < 3 ? (
                      <div className="inline-flex items-center justify-center bg-gray-400 text-[#121c2d] w-8 h-8 rounded-full">
                        <Medal className="h-5 w-5" />
                      </div>
                    ) : (
                      index + 1
                    )}
                  </TableCell>
                  <TableCell>{rank.username}</TableCell>
                  <TableCell className="text-right font-bold text-[#f0c14b]">{rank.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Piano keys footer decoration */}
      <div className="w-full flex justify-center mt-8">
        <div className="flex w-full max-w-4xl">
          {[...Array(16)].map((_, i) => (
            <div key={i} className={`h-8 flex-1 ${i % 2 === 0 ? "bg-white" : "bg-[#121c2d]"}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

