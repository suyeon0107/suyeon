"use client";

import { useState } from "react";
import QuizGame from "@/components/QuizGame";
import HumanRightsGuide from "@/components/HumanRightsGuide";
import SocialPresentationPicker from "@/components/SocialPresentationPicker";
import SocialQuizGame from "@/components/SocialQuizGame";
import { 
  ExploreApp, 
  ReviewApp, 
  AboutApp 
} from "@/components/PhoneApps";
import { 
  Gamepad2, 
  BookOpen, 
  BookMarked, 
  Home,
  ArrowLeft,
  Scale,
  Dice5,
  GraduationCap,
  Sparkles,
  FolderOpen
} from "lucide-react";

export default function HomePage() {
  const [activeApp, setActiveApp] = useState<"quiz" | "social-quiz" | "human-rights" | "social-picker" | "explore" | "review" | "about" | null>(null);

  // 카테고리 폴더별 메뉴 데이터
  const menuCategories = [
    {
      categoryName: "🏛️ 사회",
      categoryDesc: "2015 개정 교육과정 사회 개념 학습 및 인권 구제 가이드",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      items: [
        {
          id: "human-rights" as const,
          label: "인권구제 가이드",
          emoji: "⚖️",
          icon: Scale,
          gradient: "from-blue-500 to-indigo-600",
          description: "인권 침해 상황별 구제 기관 시뮬레이터",
        },
        {
          id: "social-quiz" as const,
          label: "사회 퀴즈",
          emoji: "🏛️",
          icon: GraduationCap,
          gradient: "from-indigo-500 to-purple-600",
          description: "중3 사회 1~3단원 핵심 개념 퀴즈",
        },
      ],
    },
    {
      categoryName: "📜 역사",
      categoryDesc: "조선 시대를 탐구하는 재미있는 역사 퀴즈 및 백과사전",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      items: [
        {
          id: "quiz" as const,
          label: "역사 퀴즈",
          emoji: "🎮",
          icon: Gamepad2,
          gradient: "from-purple-500 to-pink-600",
          description: "조선 전기·후기 역사 퀴즈 & 리더보드",
        },
        {
          id: "explore" as const,
          label: "학습 백과",
          emoji: "📚",
          icon: BookOpen,
          gradient: "from-amber-400 to-orange-500",
          description: "조선 시대 핵심 역사 사건과 인물 탐구",
        },
        {
          id: "review" as const,
          label: "복습 노트",
          emoji: "📝",
          icon: BookMarked,
          gradient: "from-emerald-500 to-teal-600",
          description: "핵심 낱말 카드 및 나만의 요점 정리",
        },
      ],
    },
    {
      categoryName: "🛠️ 학습 도구",
      categoryDesc: "수업 시간에 활용하는 유용한 발표 및 학습 도구",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      items: [
        {
          id: "social-picker" as const,
          label: "발표자 추첨기",
          emoji: "🎯",
          icon: Dice5,
          gradient: "from-rose-400 to-amber-500",
          description: "학급 명렬표 연동 사회 수업 발표자 랜덤 추첨",
        },
      ],
    },
  ];

  // 앱이 열려있으면 앱 콘텐츠를 보여줌
  if (activeApp !== null) {
    return (
      <div className="flex-1 flex flex-col animate-fadeIn">
        {/* 앱 상단 내비게이션 바 */}
        <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3 bg-white border-b border-slate-200 shadow-xs">
          <button 
            onClick={() => setActiveApp(null)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors duration-200 cursor-pointer"
            title="홈으로"
          >
            <Home className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setActiveApp(null)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors duration-200 cursor-pointer"
            title="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-base font-bold text-slate-900">
            {activeApp === "social-quiz" && "🏛️ 중3 사회 단원별 개념 퀴즈"}
            {activeApp === "social-picker" && "🎯 발표자 랜덤 추첨기"}
            {activeApp === "human-rights" && "⚖️ 인권구제 가이드 & 시뮬레이터"}
            {activeApp === "quiz" && "🎮 역사 퀴즈"}
            {activeApp === "explore" && "📚 학습 백과"}
            {activeApp === "review" && "📝 복습 노트"}
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
            {activeApp === "about" && <AboutApp onClose={() => setActiveApp(null)} />}
          </div>
        </div>
      </div>
    );
  }

  // 메인 대시보드
  return (
    <div className="flex-1 flex flex-col relative bg-slate-50/70 min-h-[calc(100vh-4rem)]">
      
      {/* 메인 콘텐츠 */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-10 sm:py-14 max-w-6xl mx-auto w-full space-y-10">
        
        {/* 메인 히어로 헤더 */}
        <div className="text-center animate-fadeIn space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs sm:text-sm font-extrabold text-indigo-700 shadow-xs">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>수연쌤의 사회·역사 학습 아카데미</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            사회 & 역사 재미있게 공부해요! 🎓
          </h1>

          <p className="text-sm sm:text-base font-semibold text-slate-600 leading-relaxed">
            필요한 학습 주제 폴더를 선택하면 원하는 학습 서비스로 바로 연결됩니다.
          </p>
        </div>

        {/* 카테고리 폴더 세션 그리드 */}
        <div className="w-full space-y-8 animate-slideUp">
          {menuCategories.map((sec, secIdx) => (
            <div
              key={secIdx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5"
            >
              {/* 카테고리 타이틀 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                    <FolderOpen className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900">{sec.categoryName}</h2>
                    <p className="text-xs text-slate-500">{sec.categoryDesc}</p>
                  </div>
                </div>
              </div>

              {/* 카테고리 아이템 카드 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {sec.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveApp(item.id)}
                    className="group bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all duration-300 text-left flex items-start gap-4 cursor-pointer hover:-translate-y-1"
                  >
                    {/* 아이콘 */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center shadow-sm shrink-0 text-2xl group-hover:scale-105 transition-transform`}>
                      <span>{item.emoji}</span>
                    </div>

                    {/* 내용 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-slate-900 text-base mb-1 group-hover:text-indigo-600 transition-colors">
                        {item.label}
                      </h3>
                      <p className="text-xs text-slate-500 leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* 하단 안내 */}
        <div className="text-center text-xs text-slate-400 py-4">
          <p>🎓 수연쌤의 사회·역사 학습 아카데미 | 즐거운 학교 수업 도우미</p>
        </div>

      </div>
    </div>
  );
}
