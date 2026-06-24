"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Home, ArrowLeft, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--pastel-border)] bg-[var(--pastel-card)]/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 좌측: 홈/뒤로가기 + 브랜드 */}
        <div className="flex items-center gap-3">
          {/* 홈 버튼 */}
          <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--pastel-accent-soft)] hover:bg-[var(--pastel-accent)]/30 transition-colors duration-200" title="홈으로">
            <Home className="w-5 h-5 text-[var(--pastel-accent)]" />
          </Link>
          {/* 뒤로가기 버튼 */}
          <button 
            onClick={() => router.back()} 
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--pastel-accent-soft)] hover:bg-[var(--pastel-accent)]/30 transition-colors duration-200"
            title="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--pastel-accent)]" />
          </button>
          {/* 브랜드 로고 */}
          <Link href="/" className="group flex items-center gap-2.5 ml-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0b5c8] to-[#e8a87c] text-white text-lg shadow-md group-hover:scale-105 transition-transform duration-200">
              🎓
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-[#c47a5a] to-[#b06a8a] bg-clip-text text-transparent tracking-tight">
              수연쌤의 아카데미
            </span>
          </Link>
        </div>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-semibold text-[var(--pastel-fg)] hover:text-[var(--pastel-accent)] transition-colors duration-200"
          >
            홈
          </Link>
          <Link 
            href="/" 
            className="text-sm font-medium text-[var(--pastel-fg)]/60 hover:text-[var(--pastel-accent)] transition-colors duration-200"
          >
            역사 퀴즈
          </Link>
          <Link 
            href="/" 
            className="text-sm font-medium text-[var(--pastel-fg)]/60 hover:text-[var(--pastel-accent)] transition-colors duration-200"
          >
            학습 백과
          </Link>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2 text-[var(--pastel-fg)]/50 hover:bg-[var(--pastel-accent-soft)] transition-colors duration-200"
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
        <div className="md:hidden border-b border-[var(--pastel-border)] bg-[var(--pastel-card)] transition-all duration-300 ease-in-out" id="mobile-menu">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <Link
              href="/"
              className="block rounded-xl px-3 py-2.5 text-base font-bold text-[var(--pastel-accent)] hover:bg-[var(--pastel-accent-soft)]"
              onClick={() => setIsMenuOpen(false)}
            >
              🏠 홈
            </Link>
            <Link
              href="/"
              className="block rounded-xl px-3 py-2.5 text-base font-medium text-[var(--pastel-fg)]/70 hover:bg-[var(--pastel-accent-soft)]"
              onClick={() => setIsMenuOpen(false)}
            >
              🎮 역사 퀴즈
            </Link>
            <Link
              href="/"
              className="block rounded-xl px-3 py-2.5 text-base font-medium text-[var(--pastel-fg)]/70 hover:bg-[var(--pastel-accent-soft)]"
              onClick={() => setIsMenuOpen(false)}
            >
              📚 학습 백과
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
