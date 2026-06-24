"use client";

import { useState } from "react";
import QuizGame from "@/components/QuizGame";
import { 
  ExploreApp, 
  ReviewApp, 
  ThemeApp, 
  AboutApp, 
  WallpaperId, 
  WALLPAPER_OPTIONS 
} from "@/components/PhoneApps";
import { 
  Gamepad2, 
  BookOpen, 
  BookMarked, 
  Palette, 
  Home,
  ArrowLeft
} from "lucide-react";

export default function HomePage() {
  const [activeApp, setActiveApp] = useState<"quiz" | "explore" | "review" | "theme" | "about" | null>(null);
  const [wallpaper, setWallpaper] = useState<WallpaperId>("lavender");

  const selectedWallpaper = WALLPAPER_OPTIONS.find((wp) => wp.id === wallpaper) || WALLPAPER_OPTIONS[0];

  // 메뉴 아이콘 데이터
  const menuItems = [
    {
      id: "quiz" as const,
      label: "역사 퀴즈",
      emoji: "🎮",
      icon: Gamepad2,
      gradient: "from-[#d4b5f0] to-[#b5a0e0]",
      shadow: "shadow-purple-200/50",
      description: "조선 역사 퀴즈에 도전해보세요!",
    },
    {
      id: "explore" as const,
      label: "학습 백과",
      emoji: "📚",
      icon: BookOpen,
      gradient: "from-[#f5e6a3] to-[#e8c878]",
      shadow: "shadow-amber-200/50",
      description: "역사 지식을 쌓아보세요!",
    },
    {
      id: "review" as const,
      label: "복습 노트",
      emoji: "📝",
      icon: BookMarked,
      gradient: "from-[#b5e8c3] to-[#8dd4a0]",
      shadow: "shadow-green-200/50",
      description: "오답을 복습하고 메모하세요!",
    },
    {
      id: "theme" as const,
      label: "배경 설정",
      emoji: "🎨",
      icon: Palette,
      gradient: "from-[#f0b5c8] to-[#e090a8]",
      shadow: "shadow-pink-200/50",
      description: "나만의 배경을 설정하세요!",
    },
  ];

  // 앱이 열려있으면 앱 콘텐츠를 보여줌
  if (activeApp !== null) {
    return (
      <div className="flex-1 flex flex-col animate-fadeIn">
        {/* 앱 상단 내비게이션 바 */}
        <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3 bg-[var(--pastel-card)] border-b border-[var(--pastel-border)]">
          <button 
            onClick={() => setActiveApp(null)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--pastel-accent-soft)] hover:bg-[var(--pastel-accent)]/30 transition-colors duration-200"
            title="홈으로"
          >
            <Home className="w-5 h-5 text-[var(--pastel-accent)]" />
          </button>
          <button 
            onClick={() => setActiveApp(null)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--pastel-accent-soft)] hover:bg-[var(--pastel-accent)]/30 transition-colors duration-200"
            title="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--pastel-accent)]" />
          </button>
          <span className="text-base font-bold text-[var(--pastel-fg)]">
            {activeApp === "quiz" && "🎮 역사 퀴즈"}
            {activeApp === "explore" && "📚 학습 백과"}
            {activeApp === "review" && "📝 복습 노트"}
            {activeApp === "theme" && "🎨 배경 설정"}
            {activeApp === "about" && "ℹ️ 소개"}
          </span>
        </div>

        {/* 앱 콘텐츠 */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl">
            {activeApp === "quiz" && <QuizGame />}
            {activeApp === "explore" && <ExploreApp onClose={() => setActiveApp(null)} />}
            {activeApp === "review" && <ReviewApp onClose={() => setActiveApp(null)} />}
            {activeApp === "theme" && (
              <ThemeApp 
                onClose={() => setActiveApp(null)} 
                currentWallpaper={wallpaper}
                onSelectWallpaper={setWallpaper}
              />
            )}
            {activeApp === "about" && <AboutApp onClose={() => setActiveApp(null)} />}
          </div>
        </div>
      </div>
    );
  }

  // 홈 대시보드
  return (
    <div className="flex-1 flex flex-col">
      {/* 배경 그라디언트 (선택한 배경화면 반영) */}
      <div className={`absolute inset-0 opacity-10 pointer-events-none ${selectedWallpaper.className}`} />

      {/* 메인 콘텐츠 */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        
        {/* 환영 메시지 */}
        <div className="text-center mb-8 sm:mb-12 animate-fadeIn">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--pastel-fg)] mb-3 tracking-tight">
            어서 오세요! 👋
          </h1>
          <p className="text-base sm:text-lg text-[var(--pastel-fg)]/60 max-w-md mx-auto">
            수연쌤의 아카데미에서 즐겁게 공부해봐요!
          </p>
        </div>

        {/* 아이콘 메뉴 그리드 - 태블릿/데스크톱 최적화 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-8 lg:gap-10 w-full max-w-3xl mx-auto animate-slideUp">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveApp(item.id)}
              className="group flex flex-col items-center gap-3 sm:gap-4 p-5 sm:p-6 lg:p-8 rounded-[var(--radius-card)] bg-[var(--pastel-card)] border border-[var(--pastel-border)] hover:border-[var(--pastel-accent)]/40 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 active:scale-95"
              style={{
                boxShadow: '0 4px 20px var(--pastel-shadow)',
                animationDelay: `${index * 80}ms`,
              }}
            >
              {/* 아이콘 */}
              <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-[var(--radius-icon)] bg-gradient-to-br ${item.gradient} flex items-center justify-center ${item.shadow} shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                <span className="text-3xl sm:text-4xl lg:text-5xl">{item.emoji}</span>
              </div>
              {/* 라벨 */}
              <span className="text-sm sm:text-base lg:text-lg font-bold text-[var(--pastel-fg)] tracking-tight">
                {item.label}
              </span>
              {/* 설명 (태블릿 이상에서만) */}
              <span className="hidden sm:block text-xs lg:text-sm text-[var(--pastel-fg)]/40 text-center leading-snug">
                {item.description}
              </span>
            </button>
          ))}
        </div>

        {/* 하단 안내 텍스트 */}
        <div className="mt-8 sm:mt-12 text-center animate-fadeIn">
          <p className="text-sm text-[var(--pastel-fg)]/30">
            메뉴를 클릭하면 학습이 시작됩니다 ✨
          </p>
        </div>
      </div>
    </div>
  );
}
