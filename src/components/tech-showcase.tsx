"use client";

import { motion } from "framer-motion";
import TechCard from "./tech-card";
import { Button } from "./button";
import Link from "next/link";
import { Home } from "lucide-react";

export default function TechShowcase() {
  const technologies = [
    {
      name: "Next.js",
      description:
        "Reactベースでフロントとバックエンドの処理を一つの環境で完結できるため、フルスタックなWebアプリ開発に最適と考え採用しました。",
      icon: "/next.png",
      color: "#f7c948",
    },
    {
      name: "TypeScript",
      description:
        "現代のweb開発ではほぼ必須とされており、より安定したコードベースを実現するために自然な選択肢として導入しました。",
      icon: "/ts.png",
      color: "#f7c948",
    },
    {
      name: "Tailwindcss",
      description:
        "モダンなWeb開発で広く使われており、クラスベースで効率的にUIを構築できるため採用しました。細かいスタイル調整も柔軟に行える点が魅力だと感じました。特に shadcn/ui との併用により、UI構築のスピードとデザインの両立ができました。",
      icon: "/css.png",
      color: "#f7c948",
    },
    {
      name: "Shadnc/ui",
      description:
        "洗練されたUIを素早く構築できるコンポーネント群で、開発効率とデザイン性の両立を図るために導入しました。",
      icon: "/shad.png",
      color: "#f7c948",
    },
    {
      name: "Clerk",
      description:
        "複雑になりがちな認証機能を簡潔に扱えることで、フルスタック開発に集中できる環境を整えるために導入しました。また、ログイン画面などのUIも提供されており、機能とデザインを両立しながら、ユーザー認証を迅速に実装できる点が決め手でした。",
      icon: "/clerk.png",
      color: "#f7c948",
    },
    {
      name: "Supabase",
      description:
        "フロントエンド開発を主軸とする自分にとって、バックエンドの構築を効率化できるBaaSとして最適だったため採用しました。",
      icon: "/supabase.png",
      color: "#f7c948",
    },
    {
      name: "Tone.js",
      description:
        "ブラウザ上で音楽や音声を扱うためのWebオーディオフレームワーク。高度なスケジューリングや音響処理が可能で、アプリの基盤として活用しました。",
      icon: "/tone.png",
      color: "#f7c948",
    },
    {
      name: "Recharts",
      description:
        "クイズ結果の正答率などを視覚的に伝えるために導入。ユーザーの理解を助ける統計チャートを簡潔に実装でき、データ分析の体験向上に貢献しました。",
      icon: "/graph.jpg",
      color: "#f7c948",
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <div className='absolute top-0 left-0 p-4'>
        <Link href='/'>
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full hover:bg-gray-100'
          >
            <Home className='h-6 w-6' />
            <span className='sr-only'>Home</span>
          </Button>
        </Link>
      </div>

      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TechCard
            name={tech.name}
            description={tech.description}
            icon={tech.icon}
            color={tech.color}
          />
        </motion.div>
      ))}
    </div>
  );
}
