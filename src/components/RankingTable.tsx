// components/RankingTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy, Medal } from "lucide-react";
import { useUser } from "@clerk/nextjs";

type Ranking = {
  username: string;
  score: number;
  userId: string;
};

type Props = {
  rankings: Ranking[];
};

export default function RankingTable({ rankings }: Props) {
  const { user } = useUser();

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-gray-700 hover:bg-[#1a2942]'>
          <TableHead className='text-gray-300 w-16 text-center'>Rank</TableHead>
          <TableHead className='text-gray-300'>Username</TableHead>
          <TableHead className='text-gray-300 text-right'>Score</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rankings.map((rank, index) => {
          const isCurrentUser = rank.userId === user?.id;
          const isTopThree = index < 3;

          return (
            <TableRow
              key={index}
              className={`border-gray-700 hover:bg-[#232f4a] text-white ${
                isTopThree ? "bg-opacity-20" : ""
              }`}
            >
              <TableCell className='font-medium text-center'>
                {index === 0 ? (
                  <div className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f0c14b] text-[#121c2d]'>
                    <Trophy className='h-5 w-5' />
                  </div>
                ) : isTopThree ? (
                  <div className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-[#121c2d]'>
                    <Medal className='h-5 w-5' />
                  </div>
                ) : (
                  index + 1
                )}
              </TableCell>
              <TableCell
                className={isCurrentUser ? "font-bold text-[#f0c14b]" : ""}
              >
                {rank.username || "(No Name)"}
              </TableCell>
              <TableCell className='text-right font-bold text-[#f0c14b]'>
                {rank.score}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
