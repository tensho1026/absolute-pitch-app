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
import { useUser } from "@clerk/nextjs";
import { getDbUserId } from "@/features/getUserId";

type Stat = {
  note: string;
  correct_count: number;
  wrong_count: number;
};

export default function NoteStatsChart({ stats }: { stats: Stat[] }) {
  const { user } = useUser();
 
  return (
    <Card className='w-full bg-[#0f172a] border-none shadow-lg'>
      <CardHeader className='pb-2 space-y-2'>
        <CardTitle className='text-xl font-bold text-[#fcd34d]'>
          {user?.fullName || "Unknown" }のクイズデータ
        </CardTitle>

        {(() => {
          const statsWithAccuracy = stats
            .map((s) => {
              const total = s.correct_count + s.wrong_count;
              if (total === 0) return null; // 出題なし → 除外
              const accuracy = s.correct_count / total;
              return { ...s, accuracy };
            })
            .filter((s): s is Stat & { accuracy: number } => s !== null); // nullを除外

          const maxAccuracy = Math.max(
            ...statsWithAccuracy.map((s) => s.accuracy)
          );
          const minAccuracy = Math.min(
            ...statsWithAccuracy.map((s) => s.accuracy)
          );

          const bestNotes = statsWithAccuracy
            .filter((s) => s.accuracy === maxAccuracy)
            .map((s) => `「${s.note}」`);
          const worstNotes = statsWithAccuracy
            .filter((s) => s.accuracy === minAccuracy)
            .map((s) => `「${s.note}」`);

          return (
            <div className='mt-2 space-y-1 text-sm'>
              <p className='text-emerald-400 font-semibold'>
                🎉 {bestNotes.join(" ・ ")} の正答率が一番高いよ！自信もって！
              </p>
              <p className='text-rose-400 font-semibold'>
                💪 {worstNotes.join(" ・ ")} は少しずつ慣れていこう！
              </p>
            </div>
          );
        })()}
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
                content={({
                  active,
                  payload,
                  label,
                }: {
                  active?: boolean;
                  payload?: any[];
                  label?: string;
                }) => {
                  if (active && payload && payload.length) {
                    const correct =
                      payload.find((p) => p.dataKey === "correct_count")
                        ?.value || 0;
                    const wrong =
                      payload.find((p) => p.dataKey === "wrong_count")?.value ||
                      0;
                    const total = correct + wrong;
                    const accuracy =
                      total > 0 ? ((correct / total) * 100).toFixed(1) : "N/A";

                    return (
                      <div
                        style={{
                          backgroundColor: "#1e293b",
                          borderRadius: "0.5rem",
                          padding: "0.75rem",
                          color: "#f8fafc",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <p
                          style={{
                            color: "#fcd34d",
                            fontWeight: "bold",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {label}
                        </p>
                        <p>正解: {correct}</p>
                        <p>不正解: {wrong}</p>
                        <p>正答率: {accuracy}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
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
