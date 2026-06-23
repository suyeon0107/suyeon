"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/70 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/70 transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 서비스 로고 */}
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              社
            </span>
            <span className="font-extrabold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
              사회공작실
            </span>
          </Link>
        </div>

        {/* 데스크탑 네비게이션 바 공간 */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
          >
            조선 역사 퀴즈
          </Link>
          <Link 
            href="/" 
            className="text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            소개
          </Link>
          <Link 
            href="/" 
            className="text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            워크숍
          </Link>
        </nav>

        {/* 우측 유틸리티 버튼 */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/"
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm transition-all duration-200 hover:-translate-y-[1px]"
          >
            시작하기
          </Link>
        </div>

        {/* 모바일 햄버거 메뉴 버튼 */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200 focus:outline-none transition-colors duration-200"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">메뉴 열기</span>
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 네비게이션 */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-300 ease-in-out" id="mobile-menu">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-bold text-indigo-600 dark:text-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              조선 역사 퀴즈
            </Link>
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-zinc-700 hover:bg-zinc-50 hover:text-indigo-600 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-indigo-400"
            >
              소개
            </Link>
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-zinc-700 hover:bg-zinc-50 hover:text-indigo-600 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-indigo-400"
            >
              워크숍
            </Link>
            <div className="pt-4">
              <Link 
                href="/"
                className="block w-full rounded-full bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500 shadow-sm transition-all duration-200"
              >
                시작하기
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
