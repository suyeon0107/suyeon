"use client";

import { useState } from "react";
import QuizGame from "@/components/QuizGame";
import HumanRightsGuide from "@/components/HumanRightsGuide";
import SocialPresentationPicker from "@/components/SocialPresentationPicker";
import SocialQuizGame from "@/components/SocialQuizGame";
import StudentActivityTracker from "@/components/StudentActivityTracker";
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
  FolderOpen,
  BarChart3
} from "lucide-react";

export default function HomePage() {
  const [activeApp, setActiveApp] = useState<"quiz" | "social-quiz" | "human-rights" | "social-picker" | "activity-tracker" | "explore" | "review" | "about" | null>(null);

  // 카테고리 폴더별 메뉴 데이터 (Neo-Brutalism Color Mapping)
  const menuCategories = [
    {
      categoryName: "🏛️ 사회",
      categoryDesc: "2015 개정 교육과정 사회 개념 학습 및 인권 구제 가이드",
      categoryBg: "bg-[#ffde59]", // Yellow
      items: [
        {
          id: "human-rights" as const,
          label: "인권구제 가이드",
          emoji: "⚖️",
          icon: Scale,
          solidBg: "bg-[#5ce1e6]", // Cyan
          description: "인권 침해 상황별 구제 기관 시뮬레이터",
        },
        {
          id: "social-quiz" as const,
          label: "사회 퀴즈",
          emoji: "🏛️",
          icon: GraduationCap,
          solidBg: "bg-[#ff66c4]", // Pink
          description: "중3 사회 1~3단원 핵심 개념 퀴즈",
        },
      ],
    },
    {
      categoryName: "📜 역사",
      categoryDesc: "조선 시대를 탐구하는 재미있는 역사 퀴즈 및 백과사전",
      categoryBg: "bg-[#5ce1e6]", // Cyan
      items: [
        {
          id: "quiz" as const,
          label: "역사 퀴즈",
          emoji: "🎮",
          icon: Gamepad2,
          solidBg: "bg-[#7ed957]", // Lime Green
          description: "조선 전기·후기 역사 퀴즈 & 리더보드",
        },
        {
          id: "explore" as const,
          label: "학습 백과",
          emoji: "📚",
          icon: BookOpen,
          solidBg: "bg-[#ff914d]", // Orange
          description: "조선 시대 핵심 역사 사건과 인물 탐구",
        },
        {
          id: "review" as const,
          label: "복습 노트",
          emoji: "📝",
          icon: BookMarked,
          solidBg: "bg-[#ffde59]", // Yellow
          description: "핵심 낱말 카드 및 나만의 요점 정리",
        },
      ],
    },
    {
      categoryName: "🛠️ 학습 도구",
      categoryDesc: "수업 시간에 활용하는 유용한 발표 및 학습 도구",
      categoryBg: "bg-[#7ed957]", // Lime Green
      items: [
        {
          id: "activity-tracker" as const,
          label: "활동 기록 관리",
          emoji: "📊",
          icon: BarChart3,
          solidBg: "bg-[#c892ff]", // Purple
          description: "학급 명렬표 연동 학생 활동 점수 & 게이지 바 관리",
        },
        {
          id: "social-picker" as const,
          label: "발표자 추첨기",
          emoji: "🎯",
          icon: Dice5,
          solidBg: "bg-[#ff5757]", // Red
          description: "학급 명렬표 연동 사회 수업 발표자 랜덤 추첨",
        },
      ],
    },
  ];

  // 앱이 열려있으면 앱 콘텐츠를 보여줌
  if (activeApp !== null) {
    return (
      <div className="flex-1 flex flex-col animate-fadeIn">
        {/* 앱 상단 내비게이션 바 (Neo-Brutalism Style) */}
        <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3.5 bg-white border-b-4 border-black shadow-[0_4px_0_0_#000]">
          <button 
            onClick={() => setActiveApp(null)}
            className="flex items-center justify-center w-10 h-10 bg-[#ffde59] border-3 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] font-black cursor-pointer"
            title="홈으로"
          >
            <Home className="w-5 h-5 text-black" />
          </button>
          <button 
            onClick={() => setActiveApp(null)}
            className="flex items-center justify-center w-10 h-10 bg-white border-3 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] font-black cursor-pointer"
            title="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>
          <span className="text-base sm:text-lg font-black text-black tracking-tight">
            {activeApp === "activity-tracker" && "📊 학급 활동 기록 및 점수 관리"}
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
            {activeApp === "activity-tracker" && <StudentActivityTracker />}
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

  // 메인 대시보드 (Neo-Brutalism Style)
  return (
    <div className="flex-1 flex flex-col relative bg-[#fffdf8] min-h-[calc(100vh-4rem)] border-b-4 border-black">
      
      {/* 메인 콘텐츠 */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-10 sm:py-16 max-w-6xl mx-auto w-full space-y-12">
        
        {/* Neo-Brutalism 히어로 큼직한 대표 블록 */}
        <div className="w-full bg-[#ffde59] border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 sm:p-12 text-center animate-fadeIn space-y-4 rounded-2xl relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ff66c4] border-2 border-black font-black text-xs sm:text-sm text-black shadow-[3px_3px_0px_0px_#000] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-black" />
            <span>수연쌤의 사회·역사 학습 아카데미</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-none uppercase">
            사회 & 역사 파괴적 정복! 🎓
          </h1>

          <p className="text-base sm:text-lg font-bold text-black max-w-2xl mx-auto leading-relaxed">
            필요한 단원 및 학습 도구 블록을 터치하여 바로 학습을 시작해보세요.
          </p>

        </div>

        {/* 카테고리 폴더 블록 세션 그리드 */}
        <div className="w-full space-y-10 animate-slideUp">
          {menuCategories.map((sec, secIdx) => (
            <div
              key={secIdx}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-2xl p-6 sm:p-8 space-y-6"
            >
              {/* 카테고리 헤더 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-4 border-black">
                <div className="flex items-center gap-3">
                  <div className={`px-4 py-2 ${sec.categoryBg} border-3 border-black shadow-[4px_4px_0px_0px_#000] font-black text-lg text-black flex items-center gap-2`}>
                    <FolderOpen className="w-5 h-5 text-black" />
                    <span>{sec.categoryName}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-700">{sec.categoryDesc}</p>
                </div>
              </div>

              {/* 카테고리 아이템 카드 그리드 (Neo-Brutalism Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sec.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveApp(item.id)}
                    className="group bg-white hover:bg-[#fff9e6] p-5 border-3 border-black shadow-[5px_5px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#000] transition-all duration-150 text-left flex items-start gap-4 cursor-pointer rounded-xl"
                  >
                    {/* 아이콘 원색 강렬 블록 */}
                    <div className={`w-14 h-14 rounded-xl ${item.solidBg} border-3 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center shrink-0 text-2xl group-hover:scale-105 transition-transform`}>
                      <span className="select-none">{item.emoji}</span>
                    </div>

                    {/* 내용 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-black text-base sm:text-lg mb-1 tracking-tight">
                        {item.label}
                      </h3>
                      <p className="text-xs font-bold text-slate-700 leading-snug line-clamp-2">
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
        <div className="text-center text-xs font-black text-black bg-[#ffde59] border-3 border-black shadow-[4px_4px_0px_0px_#000] px-6 py-2.5 rounded-xl">
          <p>🎓 NEOBRUTALISM HIGH-CONTRAST LEARNING HUB | 수연쌤의 사회·역사 아카데미</p>
        </div>

      </div>
    </div>
  );
}
