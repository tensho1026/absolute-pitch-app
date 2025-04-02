"use client";

import { useState } from "react";
import {
  Music,
  BookOpen,
  Dumbbell,
  Trophy,
  Info,
  Flame,
  ChartBar,
} from "lucide-react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='absolute top-4 left-4 z-50'>
      {/* ハンバーガーボタン */}
      <button
        className='flex items-center justify-center w-10 h-10 p-2 bg-[#111827] text-white rounded-md hover:bg-[#1a2438] transition-colors duration-300'
        onClick={toggleMenu}
      >
        <div className='space-y-1'>
          <span
            className={`block w-6 h-0.5 bg-white transform transition duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transform transition duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </div>
      </button>

      {/* メニュー */}
      {isOpen && (
        <div className='absolute top-full left-0 bg-[#111827] text-white p-4 mt-2 rounded-md shadow-lg z-50 border border-white/10 min-w-[200px]'>
          <ul className='space-y-3 flex flex-col'>
            <li>
              <a
                href='/piano'
                className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1a2438] transition-colors duration-200'
              >
                <Music size={18} />
                <span>Play Piano</span>
              </a>
            </li>
            <li>
              <a
                href='/quiz'
                className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1a2438] transition-colors duration-200'
              >
                <Flame size={18} />
                <span>Challenge</span>
              </a>
            </li>
            <li>
              <a
                href='practice'
                className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1a2438] transition-colors duration-200'
              >
                <Dumbbell size={18} />
                <span>Practice</span>
              </a>
            </li>
            <li>
              <a
                href='/ranking'
                className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1a2438] transition-colors duration-200'
              >
                <Trophy size={18} />
                <span>Ranking</span>
              </a>
            </li>
            <li>
              <a
                href='/mydata'
                className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1a2438] transition-colors duration-200'
              >
                <ChartBar size={18} />
                <span>My Data</span>
              </a>
            </li>
            <li>
              <a
                href='/tech'
                className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1a2438] transition-colors duration-200'
              >
                <Info size={18} />
                <span>使用技術の説明</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
