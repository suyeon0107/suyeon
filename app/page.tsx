"use client";

import { useState, useEffect } from "react";
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
  Info,
  Wifi,
  Battery,
  Signal,
  Calendar,
  Clock,
  ArrowLeft
} from "lucide-react";

export default function Home() {
  const [activeApp, setActiveApp] = useState<"quiz" | "explore" | "review" | "theme" | "about" | null>(null);
  const [wallpaper, setWallpaper] = useState<WallpaperId>("lavender");
  const [currentTime, setCurrentTime] = useState("09:41");
  const [currentDate, setCurrentDate] = useState("6월 24일 수요일");

  // 실시간 시각 업데이트
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "오후" : "오전";
      hours = hours % 12;
      hours = hours ? hours : 12; // 0시를 12시로 표시
      setCurrentTime(`${ampm} ${hours}:${minutes}`);

      // 날짜 업데이트
      const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', weekday: 'long' };
      setCurrentDate(now.toLocaleDateString('ko-KR', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const selectedWallpaper = WALLPAPER_OPTIONS.find((wp) => wp.id === wallpaper) || WALLPAPER_OPTIONS[0];

  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-8 bg-zinc-100 dark:bg-zinc-950 min-h-[calc(100vh-4rem)] transition-colors duration-300">
      {/* 백그라운드 디자인 데코레이션 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-25">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] aspect-square rounded-full bg-indigo-400 blur-3xl" />
        <div className="absolute -bottom-[40%] -right-[20%] w-[80%] aspect-square rounded-full bg-purple-400 blur-3xl" />
      </div>

      {/* 스마트폰 목업 프레임 */}
      <div className="relative w-full max-w-[400px] aspect-[9/19.5] rounded-[50px] bg-zinc-900 p-3.5 shadow-2xl border-[6px] border-zinc-800 dark:border-zinc-800 ring-1 ring-zinc-700/50 z-10 hover:scale-[1.01] transition-transform duration-500">
        
        {/* 스피커 & 카메라 노치 */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-full z-30 flex items-center justify-between px-6">
          {/* 수화기 구멍 */}
          <div className="w-12 h-1 bg-zinc-800 rounded-full" />
          {/* 카메라 렌즈 */}
          <div className="w-3.5 h-3.5 bg-zinc-900 rounded-full ring-2 ring-zinc-800/80 flex items-center justify-center">
            <div className="w-1 h-1 bg-blue-950 rounded-full" />
          </div>
        </div>

        {/* 좌측 버튼 데코 (볼륨 버튼 등) */}
        <div className="absolute -left-[9px] top-28 w-1 h-10 bg-zinc-700 rounded-l-md" />
        <div className="absolute -left-[9px] top-40 w-1 h-14 bg-zinc-700 rounded-l-md" />
        <div className="absolute -left-[9px] top-56 w-1 h-14 bg-zinc-700 rounded-l-md" />
        {/* 우측 전원 버튼 데코 */}
        <div className="absolute -right-[9px] top-40 w-1 h-16 bg-zinc-700 rounded-r-md" />

        {/* 폰 액정 화면 */}
        <div className={`relative w-full h-full rounded-[38px] overflow-hidden ${selectedWallpaper.className} transition-all duration-700 flex flex-col shadow-inner select-none`}>
          
          {/* 1. 상단 상태 표시줄 (Status Bar) */}
          <div className="h-11 flex items-end justify-between px-6 pb-1.5 text-white text-[11px] font-semibold tracking-tight z-20">
            {/* 시간 */}
            <span>{currentTime.replace("오전 ", "").replace("오후 ", "")}</span>
            {/* 시스템 아이콘 (시그널, 와이파이, 배터리) */}
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <Battery className="w-4 h-4 rotate-0" />
                <span className="text-[9px]">100%</span>
              </div>
            </div>
          </div>

          {/* 2. 폰 내부 콘텐츠 컨테이너 */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
            
            {/* 앱이 실행 중이지 않을 때: 홈 화면 */}
            {activeApp === null ? (
              <div className="flex-1 flex flex-col justify-between px-6 pt-4 pb-8 z-10 animate-fadeIn">
                {/* 상단 위젯 영역 */}
                <div className="space-y-4">
                  {/* 시간 & 캘린더 대형 위젯 */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/10 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-white/80 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{currentDate}</span>
                        </div>
                        <div className="text-2xl font-black tracking-tight">{currentTime.split(" ")[1]}</div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 font-bold tracking-wider">
                        {currentTime.split(" ")[0]}
                      </span>
                    </div>
                    <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center gap-2">
                      <span className="text-base">📚</span>
                      <p className="text-[10px] leading-snug text-white/90 font-medium">
                        사회공작실 스마트 교과서에 오신 것을 환영합니다!
                      </p>
                    </div>
                  </div>
                </div>

                {/* 중앙 앱 그리드 */}
                <div className="grid grid-cols-4 gap-y-5 gap-x-4 my-auto py-4">
                  
                  {/* 1) 역사 퀴즈 앱 */}
                  <button 
                    onClick={() => setActiveApp("quiz")}
                    className="flex flex-col items-center gap-1.5 group active:scale-90 transition-transform duration-150"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200 border border-white/10">
                      <Gamepad2 className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-[11px] text-white font-bold text-shadow-sm truncate w-full text-center">역사 퀴즈</span>
                  </button>

                  {/* 2) 학습 대백과 앱 */}
                  <button 
                    onClick={() => setActiveApp("explore")}
                    className="flex flex-col items-center gap-1.5 group active:scale-90 transition-transform duration-150"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform duration-200 border border-white/10">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-[11px] text-white font-bold text-shadow-sm truncate w-full text-center">학습 백과</span>
                  </button>

                  {/* 3) 복습 노트 앱 */}
                  <button 
                    onClick={() => setActiveApp("review")}
                    className="flex flex-col items-center gap-1.5 group active:scale-90 transition-transform duration-150"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-200 border border-white/10">
                      <BookMarked className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-[11px] text-white font-bold text-shadow-sm truncate w-full text-center">복습 노트</span>
                  </button>

                  {/* 4) 배경 설정 앱 */}
                  <button 
                    onClick={() => setActiveApp("theme")}
                    className="flex flex-col items-center gap-1.5 group active:scale-90 transition-transform duration-150"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:scale-105 transition-transform duration-200 border border-white/10">
                      <Palette className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-[11px] text-white font-bold text-shadow-sm truncate w-full text-center">배경 설정</span>
                  </button>

                </div>

                {/* 하단 고정 독 바 (Dock Bar) */}
                <div className="w-full bg-white/15 backdrop-blur-xl rounded-[28px] p-3 border border-white/15 flex items-center justify-around shadow-xl">
                  {/* 독 내부 바로가기 아이콘들 */}
                  <button 
                    onClick={() => setActiveApp("quiz")}
                    className="active:scale-90 transition-transform"
                    title="퀴즈 바로가기"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow border border-white/5">
                      <Gamepad2 className="w-6 h-6 text-white" />
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveApp("explore")}
                    className="active:scale-90 transition-transform"
                    title="학습백과 바로가기"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow border border-white/5">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveApp("about")}
                    className="active:scale-90 transition-transform"
                    title="정보 바로가기"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-zinc-700 to-zinc-900 flex items-center justify-center shadow border border-white/5">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              /* 앱이 실행 중일 때: 가상 앱 컨테이너 */
              <div className="absolute inset-0 bg-slate-50 dark:bg-zinc-900 z-10 flex flex-col animate-slideUp">
                {/* 퀴즈 앱 로드 */}
                {activeApp === "quiz" && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* 상단 미니 폰 네비바 */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
                      <button 
                        onClick={() => setActiveApp(null)}
                        className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400"
                      >
                        <ArrowLeft className="w-4 h-4" /> 홈
                      </button>
                      <span className="text-xs font-bold text-zinc-400">|</span>
                      <span className="text-xs font-bold truncate">조선 역사 퀴즈</span>
                    </div>
                    {/* 퀴즈 스크롤 영역 */}
                    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-zinc-900">
                      <QuizGame />
                    </div>
                  </div>
                )}

                {/* 학습 백과 앱 로드 */}
                {activeApp === "explore" && (
                  <ExploreApp onClose={() => setActiveApp(null)} />
                )}

                {/* 복습 노트 앱 로드 */}
                {activeApp === "review" && (
                  <ReviewApp onClose={() => setActiveApp(null)} />
                )}

                {/* 테마 배경 설정 앱 로드 */}
                {activeApp === "theme" && (
                  <ThemeApp 
                    onClose={() => setActiveApp(null)} 
                    currentWallpaper={wallpaper}
                    onSelectWallpaper={setWallpaper}
                  />
                )}

                {/* 소개 앱 로드 */}
                {activeApp === "about" && (
                  <AboutApp onClose={() => setActiveApp(null)} />
                )}

                {/* 폰 화면 하단 가상 홈 버튼 바 (iOS 스타일) */}
                <div className="h-6 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-center shrink-0">
                  <button 
                    onClick={() => setActiveApp(null)}
                    className="w-32 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full hover:bg-zinc-400 transition-colors"
                    title="홈으로"
                  />
                </div>
              </div>
            )}

          </div>

          {/* 폰 화면 최하단 가상 홈 바 (홈 화면일 때만 노출되는 터치 가이드라인) */}
          {activeApp === null && (
            <div className="h-5 flex items-center justify-center z-20">
              <div className="w-32 h-1 bg-white/55 rounded-full" />
            </div>
          )}

        </div>
      </div>

      {/* 데스크톱 안내 가이드 말풍선 */}
      <div className="mt-6 text-center z-10 hidden sm:block">
        <p className="text-xs text-zinc-400 font-medium">
          위 스마트폰 화면 속 앱 아이콘을 직접 탭해서 스마트 학습기를 작동시켜 보세요.
        </p>
      </div>
    </div>
  );
}
