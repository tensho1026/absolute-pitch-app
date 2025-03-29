"use client";
import Link from "next/link";
import { Music, BookOpen, LogIn, Flame } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import { UserResource } from "@clerk/types";
import { saveUserToDatabase } from "@/features/saveUserToDatabase";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const saveUserData = async () => {
      if (isLoaded && isSignedIn && user) {
        console.log("🟢 ユーザー情報ロード完了:", user);
        await saveUserToDatabase(user); // 🔥 ここで保存
      }
    };
    saveUserData();
  }, [user, isLoaded, isSignedIn]);

  return (
    <div className='relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4'>
      <div className='absolute top-0 left-0'>
        <HamburgerMenu />
      </div>
      {/* Authentication button in top-right corner */}
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

      {/* 装飾的なピアノキー要素 */}
      <div className='absolute top-0 left-0 w-full h-16 flex overflow-hidden'>
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className={`h-full ${
              [1, 3, 6, 8, 10].includes(i % 12)
                ? "bg-slate-800 w-[4%]"
                : "bg-white w-[6%]"
            } border-l border-slate-300`}
          />
        ))}
      </div>

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
          {/* ピアノカード */}
          <Link href='/piano' className='w-full group'>
            <div className='bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-amber-400/50 transition-all duration-300 shadow-lg hover:shadow-amber-900/20 h-full flex flex-col items-center justify-center group-hover:transform group-hover:-translate-y-1'>
              <div className='w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg'>
                <Music className='w-8 h-8 text-slate-900' />
              </div>
              <h2 className='text-2xl font-bold text-white mb-2'>Play Piano</h2>
              <p className='text-slate-400 text-sm'>
                Practice your skills on our virtual keyboard
              </p>
            </div>
          </Link>

          {/* クイズカード */}
          <Link href='/quiz' className='w-full group'>
            <div className='bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-amber-400/50 transition-all duration-300 shadow-lg hover:shadow-amber-900/20 h-full flex flex-col items-center justify-center group-hover:transform group-hover:-translate-y-1'>
              <div className='w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-lg'>
                <Flame className='w-8 h-8 text-slate-900' />
              </div>
              <h2 className='text-2xl font-bold text-white mb-2'>Challenge</h2>
              <p className='text-slate-400 text-sm'>
                Test your absolute pitch with our challenges
              </p>
            </div>
          </Link>

          {/* プラクティスカード */}
          <Link href='/practice' className='w-full group'>
            <div className='bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-amber-400/50 transition-all duration-300 shadow-lg hover:shadow-amber-900/20 h-full flex flex-col items-center justify-center group-hover:transform group-hover:-translate-y-1'>
              <div className='w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg'>
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
                  <path d='M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z'></path>
                  <path d='M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z'></path>
                  <path d='M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z'></path>
                </svg>
              </div>
              <h2 className='text-2xl font-bold text-white mb-2'>Practice</h2>
              <p className='text-slate-400 text-sm'>
                Daily exercises to improve your musical ear
              </p>
            </div>
          </Link>

          {/* ランキングカード */}
          <Link href='/ranking' className='w-full group'>
            <div className='bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-amber-400/50 transition-all duration-300 shadow-lg hover:shadow-amber-900/20 h-full flex flex-col items-center justify-center group-hover:transform group-hover:-translate-y-1'>
              <div className='w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-lg'>
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
                  <path d='M12 6v12'></path>
                  <path d='M17 18V6'></path>
                  <path d='M7 18V6'></path>
                  <path d='M17 9h4'></path>
                  <path d='M7 9H3'></path>
                  <path d='M21 14h-4'></path>
                  <path d='M3 14h4'></path>
                  <path d='M17 6h2a2 2 0 0 1 2 2v12'></path>
                  <path d='M7 18H5a2 2 0 0 1-2-2V6'></path>
                </svg>
              </div>
              <h2 className='text-2xl font-bold text-white mb-2'>Ranking</h2>
              <p className='text-slate-400 text-sm'>
                See how you compare with other musicians
              </p>
            </div>
          </Link>
        </div>

        {/* 装飾的な音符 */}
        <div className='absolute bottom-8 right-8 opacity-20 text-6xl animate-bounce-slow'>
          ♪
        </div>
        <div className='absolute top-32 left-8 opacity-10 text-8xl animate-pulse'>
          ♫
        </div>
      </div>

      {/* 装飾的なピアノキー要素（下部） */}
      <div className='absolute bottom-0 left-0 w-full h-16 flex overflow-hidden rotate-180'>
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className={`h-full ${
              [1, 3, 6, 8, 10].includes(i % 12)
                ? "bg-slate-800 w-[4%]"
                : "bg-white w-[6%]"
            } border-l border-slate-300`}
          />
        ))}
      </div>
    </div>
  );
}
