import Score from '@/components/Score'

   "use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Music, Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ここに認証ロジックを実装
    console.log("Sign in with:", email, password)
  }

  const handleGoogleSignIn = () => {
    // ここにGoogle認証ロジックを実装
    console.log("Sign in with Google")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Back to home button */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full text-slate-200 font-medium shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:scale-105 border border-slate-700 hover:border-amber-400/30"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ホームに戻る</span>
        </Link>
      </div>

      {/* Decorative piano keys at top */}
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

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Logo and title */}
        <div className="mb-6 flex flex-col items-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
            <Music className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-4xl font-serif font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
            Absolute Pitch
          </h1>
          <p className="text-slate-300 text-sm italic">サインインして進捗を記録しましょう</p>
        </div>

        {/* Sign-in card */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 shadow-lg w-full">
          <h2 className="text-2xl font-bold text-amber-400 mb-6">サインイン</h2>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="text-sm font-medium text-slate-300">
                  メールアドレス
                </label>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-10 pr-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-slate-300">
                  パスワード
                </label>
                <Link href="/forgot-password" className="text-xs text-amber-400 hover:text-amber-300">
                  パスワードをお忘れですか？
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-10 pr-10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-medium py-2 px-4 rounded-md hover:from-amber-500 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-amber-500/20"
            >
              サインイン
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-800/50 px-2 text-slate-400">または</span>
            </div>
          </div>

          {/* Google sign in */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-slate-700/50 border border-slate-600 text-white font-medium py-2 px-4 rounded-md hover:bg-slate-700 hover:border-amber-400/30 transition-all duration-300"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            <span>Googleでサインイン</span>
          </button>

          {/* Sign up link */}
          <div className="mt-6 text-center text-sm text-slate-400">
            アカウントをお持ちでないですか？{" "}
            <Link href="/sign-up" className="text-amber-400 hover:text-amber-300 font-medium">
              新規登録
            </Link>
          </div>
        </div>

        {/* Decorative notes */}
        <div className="absolute bottom-32 right-8 opacity-20 text-6xl animate-bounce-slow">♪</div>
        <div className="absolute top-32 left-8 opacity-10 text-8xl animate-pulse">♫</div>
      </div>

      {/* Decorative piano keys at bottom */}
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


    