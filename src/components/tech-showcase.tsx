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
        "Reactベースのフレームワークで、サーバーサイドレンダリングや静的サイト生成をサポート。SEOやパフォーマンスが向上し、Fullstack開発に適しているため採用しました。",
      icon: "/next.png",
      color: "#f7c948",
    },
    {
      name: "TypeScript",
      description:
        "JavaScriptに型付けを加えることで、コードの安全性と可読性を向上。型エラーを防ぎ、大規模プロジェクトでも保守しやすいため導入しました。",
      icon: "/ts.png",
      color: "#f7c948",
    },
    {
      name: "Tailwindcss",
      description:
        "ユーティリティファーストのCSSフレームワークで、デザインを効率的に実現。直感的なクラス名でカスタマイズがしやすく、レスポンシブ対応が容易なため活用しました。",
      icon: "/css.png",
      color: "#f7c948",
    },
    {
      name: "Shadnc/ui",
      description:
        "ReactとTailwind CSSを組み合わせたUIコンポーネントライブラリで、美しくモダンなデザインを迅速に実現。使い勝手の良いUIを効率的に構築できるため、採用しました。",
      icon: "/shad.png",
      color: "#f7c948",
    },
    {
      name: "Clerk",
      description:
        "ユーザー認証やプロフィール管理を手軽に実現できるフルスタック認証ソリューション。認証周りの複雑さを解消し、安全かつ迅速に導入できるため選びました。",
      icon: "/clerk.png",
      color: "#f7c948",
    },
    {
      name: "Supabase",
      description:
        "オープンソースのFirebase代替で、PostgreSQLをベースにデータベースや認証機能を提供。リアルタイム通信が可能で、バックエンドを効率的に構築できるため採用しました。",
      icon: "/supabase.png",
      color: "#f7c948",
    },
    {
      name: "Tone.js",
      description:
        "ブラウザ上で音楽や音声を扱うためのWebオーディオフレームワーク。高度なスケジューリングや音響処理が可能で、音感トレーニングアプリの基盤として活用しました。",
      icon: "/tone.png",
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
