"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Home, ArrowLeft, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 좌측: 홈/뒤로가기 + 브랜드 */}
        <div className="flex items-center gap-3">
          {/* 홈 버튼 */}
          <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors duration-200" title="홈으로">
            <Home className="w-5 h-5" />
          </Link>
          {/* 뒤로가기 버튼 */}
          <button 
            onClick={() => router.back()} 
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors duration-200"
            title="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          {/* 브랜드 로고 */}
          <Link href="/" className="group flex items-center gap-2.5 ml-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-lg shadow-xs group-hover:scale-105 transition-transform duration-200">
              🎓
            </span>
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              수연쌤의 사회·역사 아카데미
            </span>
          </Link>
        </div>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-5">
          <Link 
            href="/" 
            className="text-xs sm:text-sm font-extrabold text-slate-700 hover:text-indigo-600 transition-colors duration-200"
          >
            홈
          </Link>

          <div className="h-4 w-px bg-slate-200" />

          {/* 사회 폴더 */}
          <Link 
            href="/human-rights" 
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1"
          >
            <span>⚖️ 인권구제 가이드</span>
          </Link>
          <Link 
            href="/social-quiz" 
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1"
          >
            <span>🏛️ 사회 퀴즈</span>
          </Link>

          <div className="h-4 w-px bg-slate-200" />

          {/* 역사 폴더 */}
          <Link 
            href="/quiz" 
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-purple-600 transition-colors duration-200 flex items-center gap-1"
          >
            <span>🎮 역사 퀴즈</span>
          </Link>
          <Link 
            href="/explore" 
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-purple-600 transition-colors duration-200 flex items-center gap-1"
          >
            <span>📚 학습 백과</span>
          </Link>
          <Link 
            href="/review" 
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-purple-600 transition-colors duration-200 flex items-center gap-1"
          >
            <span>📝 복습 노트</span>
          </Link>

          <div className="h-4 w-px bg-slate-200" />

          {/* 학습 도구 폴더 */}
          <Link 
            href="/social-picker" 
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-rose-600 transition-colors duration-200 flex items-center gap-1"
          >
            <span>🎯 발표자 추첨기</span>
          </Link>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-slate-100 transition-colors duration-200"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">메뉴 열기</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white transition-all duration-300 ease-in-out" id="mobile-menu">
          <div className="space-y-1 px-4 pb-4 pt-2 text-xs sm:text-sm">
            <Link
              href="/"
              className="block rounded-xl px-3 py-2.5 font-extrabold text-indigo-600 hover:bg-indigo-50"
              onClick={() => setIsMenuOpen(false)}
            >
              🏠 홈
            </Link>
            
            <div className="pt-2 pb-1 border-t border-slate-100 font-bold text-slate-400 text-[11px] px-3">
              🏛️ 사회 단원
            </div>
            <Link
              href="/human-rights"
              className="block rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsMenuOpen(false)}
            >
              ⚖️ 인권구제 가이드
            </Link>
            <Link
              href="/social-quiz"
              className="block rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsMenuOpen(false)}
            >
              🏛️ 사회 퀴즈
            </Link>

            <div className="pt-2 pb-1 border-t border-slate-100 font-bold text-slate-400 text-[11px] px-3">
              📜 역사 단원
            </div>
            <Link
              href="/quiz"
              className="block rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsMenuOpen(false)}
            >
              🎮 역사 퀴즈
            </Link>
            <Link
              href="/explore"
              className="block rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsMenuOpen(false)}
            >
              📚 학습 백과
            </Link>
            <Link
              href="/review"
              className="block rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsMenuOpen(false)}
            >
              📝 복습 노트
            </Link>

            <div className="pt-2 pb-1 border-t border-slate-100 font-bold text-slate-400 text-[11px] px-3">
              🛠️ 수업 도구
            </div>
            <Link
              href="/social-picker"
              className="block rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsMenuOpen(false)}
            >
              🎯 발표자 추첨기
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
