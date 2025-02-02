import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/piano.jpg')" }} // 背景画像を設定
    >
      {/* 背景にオーバーレイを追加（暗めにして高級感を出す） */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* コンテンツ（背景の影響を受けないように `relative` にする） */}
      <div className="relative z-10 flex flex-col items-center text-white">
        <h1 className="text-4xl font-serif font-bold mb-8 text-gold-400 shadow-lg">
        Absolute Pitch
        </h1>

        <div className="flex space-x-6">
          {/* ピアノボタン */}
          <Link href="/piano">
            <Button className="px-8 py-4 text-lg font-semibold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 rounded-full shadow-xl transition transform hover:scale-105">
              🎶 Play Piano
            </Button>
          </Link>

          {/* クイズボタン */}
          <Link href="/quiz">
            <Button className="px-8 py-4 text-lg font-semibold text-black bg-gradient-to-r from-gray-300 to-gray-500 hover:from-gray-400 hover:to-gray-600 rounded-full shadow-xl transition transform hover:scale-105">
              📝 Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
