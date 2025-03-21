// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <div className='w-full min-h-screen flex items-center justify-center'>
//       <SignIn path='/sign-in' routing='path' afterSignInUrl='/piano' />
//     </div>
//   );
// }
"use client";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Music, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Page() {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isLoaded) return null;

  // サインインのロジック
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn.create({
        identifier: email,
        password,
      });
      window.location.href = "/";
    } catch (err) {
      setError("サインインに失敗しました。メールアドレスまたはパスワードが間違っています。");
    }
  };

  // Googleサインインのロジック
  const handleGoogleSignIn = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      setError("Googleサインインに失敗しました。");
    }
  };

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
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-10 pr-3 text-white"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-10 pr-10 text-white"
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
            <button
              type="submit"
              className="w-full bg-amber-500 text-slate-900 font-medium py-2 rounded-md hover:bg-amber-600 transition"
            >
              サインイン
            </button>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition"
          >
            Googleでサインイン
          </button>
        </div>
      </div>
    </div>
  );
}
