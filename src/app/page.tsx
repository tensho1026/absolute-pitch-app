import Link from "next/link"
import { Music, BookOpen } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      {/* 装飾的なピアノキー要素 */}
      <div className="absolute top-0 left-0 w-full h-16 flex overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className={`h-full ${
              [1, 3, 6, 8, 10].includes(i % 12) ? "bg-slate-800 w-[4%]" : "bg-white w-[6%]"
            } border-l border-slate-300`}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-3xl w-full text-center">
        {/* タイトルとサブタイトル */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
          Absolute Pitch
        </h1>
        <p className="text-slate-300 mb-12 text-lg md:text-xl italic">
          Master your musical ear through practice and play
        </p>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          {/* ピアノカード */}
          <Link href="/piano" className="w-full group">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-amber-400/50 transition-all duration-300 shadow-lg hover:shadow-amber-900/20 h-full flex flex-col items-center justify-center group-hover:transform group-hover:-translate-y-1">
              <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                <Music className="w-8 h-8 text-slate-900" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Play Piano</h2>
              <p className="text-slate-400 text-sm">Practice your skills on our virtual keyboard</p>
            </div>
          </Link>

          {/* クイズカード */}
          <Link href="/quiz" className="w-full group">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-amber-400/50 transition-all duration-300 shadow-lg hover:shadow-amber-900/20 h-full flex flex-col items-center justify-center group-hover:transform group-hover:-translate-y-1">
              <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-slate-900" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Take Quiz</h2>
              <p className="text-slate-400 text-sm">Test your absolute pitch with our challenges</p>
            </div>
          </Link>
        </div>

        {/* 装飾的な音符 */}
        <div className="absolute bottom-8 right-8 opacity-20 text-6xl animate-bounce-slow">♪</div>
        <div className="absolute top-32 left-8 opacity-10 text-8xl animate-pulse">♫</div>
      </div>

      {/* 装飾的なピアノキー要素（下部） */}
      <div className="absolute bottom-0 left-0 w-full h-16 flex overflow-hidden rotate-180">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className={`h-full ${
              [1, 3, 6, 8, 10].includes(i % 12) ? "bg-slate-800 w-[4%]" : "bg-white w-[6%]"
            } border-l border-slate-300`}
          />
        ))}
      </div>
    </div>
  )
}

