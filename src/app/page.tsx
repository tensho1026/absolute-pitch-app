"use client";
import Link from "next/link";
import { Music, LogIn, Flame } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import { saveUserToDatabase } from "@/features/saveUserToDatabase";
import CardLink from "@/components/CardLink";
import PianoDecoration from "@/components/PianoDecoration";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const saveUserData = async () => {
      if (isLoaded && isSignedIn && user) {
        // console.log("🟢 ユーザー情報ロード完了:", user);
        await saveUserToDatabase(user); //  ここで保存
      }
    };
    saveUserData();
  }, [user, isLoaded, isSignedIn]);

  return (
    <div className='relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4'>
      <div className='absolute top-0 left-0'>
        <HamburgerMenu />
      </div>

      <div className='absolute top-4 right-4 z-20 flex flex-row'>
        {isSignedIn ? (
          // ログインしている場合はUserButtonを表示
          <div className='scale-150'>
            {/* 拡大サイズを調整 */}
            <UserButton />
          </div>
        ) : (
          // ログインしていない場合はSign Upボタンを表示
          <Link
            href='/sign-up'
            className='flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 px-4 py-2 rounded-full text-slate-900 font-medium shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:scale-105'
          >
            <LogIn className='w-4 h-4' />
            <span>Sign Up</span>
          </Link>
        )}
      </div>

      <PianoDecoration position='top' />

      <div className='relative z-10 flex flex-col items-center max-w-3xl w-full text-center'>
        {/* タイトルとサブタイトル */}
        <h1 className='text-5xl md:text-7xl font-serif font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400'>
          Absolute Pitch
        </h1>
        <p className='text-slate-300 mb-12 text-lg md:text-xl italic'>
          Master your musical ear through practice and play
        </p>

        {/* メインコンテンツ */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl'>
          {/* 🎹 Piano */}
          <CardLink
            href='/piano'
            icon={<Music className='w-8 h-8 text-slate-900' />}
            title='Play Piano'
            description='Practice your skills on our virtual keyboard'
            iconBg='bg-gradient-to-br from-amber-400 to-amber-600'
          />

          {/* 🔥 Quiz */}
          <CardLink
            href={isSignedIn ? "/quiz" : "/sign-in"}
            icon={<Flame className='w-8 h-8 text-slate-900' />}
            title='Challenge'
            description='Test your absolute pitch with our challenges'
            iconBg='bg-gradient-to-br from-slate-400 to-slate-600'
          />

          {/* 📘 Practice */}
          <CardLink
            href='/practice'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-8 h-8 text-slate-900'
              >
                <path d='M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z' />
                <path d='M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z' />
                <path d='M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z' />
              </svg>
            }
            title='Practice'
            description='Daily exercises to improve your musical ear'
            iconBg='bg-gradient-to-br from-amber-500 to-amber-700'
          />

          {/* 🏆 Ranking */}
          <CardLink
            href={isSignedIn ? "/ranking" : "/sign-in"}
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-8 h-8 text-slate-900'
              >
                <path d='M12 6v12' />
                <path d='M17 18V6' />
                <path d='M7 18V6' />
                <path d='M17 9h4' />
                <path d='M7 9H3' />
                <path d='M21 14h-4' />
                <path d='M3 14h4' />
                <path d='M17 6h2a2 2 0 0 1 2 2v12' />
                <path d='M7 18H5a2 2 0 0 1-2-2V6' />
              </svg>
            }
            title='Ranking'
            description='See how you compare with other musicians'
            iconBg='bg-gradient-to-br from-slate-400 to-slate-600'
          />
        </div>

        {/* 装飾的な音符 */}
        <div className='absolute bottom-8 right-8 opacity-20 text-6xl animate-bounce-slow'>
          ♪
        </div>
        <div className='absolute top-32 left-8 opacity-10 text-8xl animate-pulse'>
          ♫
        </div>
      </div>

      <PianoDecoration position='bottom' />
    </div>
  );
}
