"use client";

import { useState } from "react";
import QuizGame from "@/components/QuizGame";
import HumanRightsGuide from "@/components/HumanRightsGuide";
import SocialPresentationPicker from "@/components/SocialPresentationPicker";
import SocialQuizGame from "@/components/SocialQuizGame";
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
  ArrowLeft,
  Scale,
  Dice5,
  GraduationCap
} from "lucide-react";

export default function HomePage() {
  const [activeApp, setActiveApp] = useState<"quiz" | "social-quiz" | "human-rights" | "social-picker" | "explore" | "review" | "theme" | "about" | null>(null);
  const [wallpaper, setWallpaper] = useState<WallpaperId>("lavender");

  const selectedWallpaper = WALLPAPER_OPTIONS.find((wp) => wp.id === wallpaper) || WALLPAPER_OPTIONS[0];

  // 메뉴 아이콘 데이터
  const menuItems = [
    {
      id: "social-quiz" as const,
      label: "사회 퀴즈",
      emoji: "🏛️",
      icon: GraduationCap,
      gradient: "from-[#b5c6f0] to-[#8090e0]",
      shadow: "shadow-indigo-200/50",
      description: "중3 사회 1~3단원 개념 퀴즈!",
    },
    {
      id: "social-picker" as const,
      label: "발표자 추첨기",
      emoji: "🎯",
      icon: Dice5,
      gradient: "from-[#f0b5c8] to-[#e8a87c]",
      shadow: "shadow-pink-200/50",
      description: "사회 수업 발표자 랜덤 추첨!",
    },
    {
      id: "human-rights" as const,
      label: "인권구제 가이드",
      emoji: "⚖️",
      icon: Scale,
      gradient: "from-[#a8d4f0] to-[#80b5e0]",
      shadow: "shadow-blue-200/50",
      description: "인권 침해 상황별 구제 진단!",
    },
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
            {activeApp === "social-quiz" && "🏛️ 중3 사회 단원별 개념 퀴즈"}
            {activeApp === "social-picker" && "🎯 발표자 랜덤 추첨기"}
            {activeApp === "human-rights" && "⚖️ 인권구제 가이드 & 시뮬레이터"}
            {activeApp === "quiz" && "🎮 역사 퀴즈"}
            {activeApp === "explore" && "📚 학습 백과"}
            {activeApp === "review" && "📝 복습 노트"}
            {activeApp === "theme" && "🎨 배경 설정"}
            {activeApp === "about" && "ℹ️ 소개"}
          </span>
        </div>

        {/* 앱 콘텐츠 */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl">
            {activeApp === "social-quiz" && <SocialQuizGame />}
            {activeApp === "social-picker" && <SocialPresentationPicker />}
            {activeApp === "human-rights" && <HumanRightsGuide />}
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

  // 홈 대시보드 (Claymorphism Style)
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-[linear-gradient(135deg,#fff8f3_0%,#f5e9df_50%,#fbf0e8_100%)] min-h-[calc(100vh-4rem)]">
      
      {/* 배경 3D Clay 볼륨 장식 요소 */}
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-pink-200/30 blur-2xl pointer-events-none animate-float" />
      <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-purple-200/30 blur-3xl pointer-events-none animate-float" style={{ animationDelay: '1.5s' }} />
      <div className={`absolute inset-0 opacity-10 pointer-events-none ${selectedWallpaper.className}`} />

      {/* 메인 콘텐츠 */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
        
        {/* Claymorphism 히어로 배너 */}
        <div className="text-center mb-10 sm:mb-14 animate-fadeIn space-y-3 max-w-lg">
          <div className="inline-flex items-center gap-2 px-4 py-2 clay-pill text-xs sm:text-sm font-extrabold text-amber-800">
            <span className="text-base animate-bounce">🎓</span>
            <span>수연쌤의 파스텔 입체 학습 아카데미</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            어서 오세요! <span className="inline-block animate-wave">👋</span>
          </h1>

          <p className="text-sm sm:text-base font-semibold text-slate-600/90 leading-relaxed">
            클레이모피즘 3D 인터랙티브 메뉴를 클릭해 신나게 공부를 시작해봐요!
          </p>
        </div>

        {/* Claymorphism 메뉴 카드 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-5xl mx-auto animate-slideUp">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveApp(item.id)}
              className="clay-card group flex flex-col items-center gap-4 p-6 sm:p-8 cursor-pointer relative"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              {/* 3D Clay 입체 아이콘 박스 */}
              <div className={`w-20 h-20 sm:w-24 sm:h-24 clay-icon bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-4xl sm:text-5xl drop-shadow-md select-none">{item.emoji}</span>
              </div>

              {/* 메뉴 타이틀 */}
              <span className="text-base sm:text-lg font-black text-slate-800 tracking-tight text-center">
                {item.label}
              </span>

              {/* 서브 설명 */}
              <span className="text-xs font-semibold text-slate-500 text-center leading-snug">
                {item.description}
              </span>
            </button>
          ))}
        </div>

        {/* 하단 안내 텍스트 */}
        <div className="mt-12 sm:mt-16 text-center animate-fadeIn">
          <p className="text-xs sm:text-sm font-bold text-slate-400/80 bg-white/50 px-5 py-2 rounded-full backdrop-blur-xs border border-white/60 shadow-xs inline-block">
            ✨ 각 메뉴를 클릭하면 해당 학습 서비스로 즉시 이동합니다
          </p>
        </div>
      </div>
    </div>
  );
}
