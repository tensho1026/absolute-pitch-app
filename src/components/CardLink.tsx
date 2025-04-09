// components/CardLink.tsx
import Link from "next/link";
import { ReactNode } from "react";

type CardLinkProps = {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  iconBg: string; // グラデ背景用（class指定）
};

export default function CardLink({
  href,
  icon,
  title,
  description,
  iconBg,
}: CardLinkProps) {
  return (
    <Link href={href} className='w-full group'>
      <div className='bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-amber-400/50 transition-all duration-300 shadow-lg hover:shadow-amber-900/20 h-full flex flex-col items-center justify-center group-hover:transform group-hover:-translate-y-1'>
        <div
          className={`w-16 h-16 mb-4 rounded-full ${iconBg} flex items-center justify-center shadow-lg`}
        >
          {icon}
        </div>
        <h2 className='text-2xl font-bold text-white mb-2'>{title}</h2>
        <p className='text-slate-400 text-sm'>{description}</p>
      </div>
    </Link>
  );
}
