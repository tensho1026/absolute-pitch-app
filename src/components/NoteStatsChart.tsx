"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Stat = {
  note: string;
  correct_count: number;
  wrong_count: number;
};

export default function NoteStatsChart({ stats }: { stats: Stat[] }) {
  return (
    <Card className='w-full bg-[#0f172a] border-none shadow-lg'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-xl font-bold text-[#fcd34d]'>
          音符の統計
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='w-full h-80'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={stats}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='#334155'
                vertical={false}
              />
              <XAxis
                dataKey='note'
                tick={{ fill: "#cbd5e1" }}
                axisLine={{ stroke: "#475569" }}
              />
              <YAxis
                tick={{ fill: "#cbd5e1" }}
                axisLine={{ stroke: "#475569" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#f8fafc",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "#f8fafc" }}
                labelStyle={{ color: "#fcd34d", fontWeight: "bold" }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "10px",
                  color: "#cbd5e1",
                }}
              />
              <Bar
                dataKey='correct_count'
                name='正解'
                fill='#fcd34d'
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey='wrong_count'
                name='不正解'
                fill='#94a3b8'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
