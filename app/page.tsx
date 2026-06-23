"use client";

import { Sparkles, ArrowRight, PlusCircle, CheckCircle2 } from "lucide-react";

export default function Home() {
  const handlePlaceholderClick = () => {
    alert("축하합니다! 기본 뼈대 앱이 올바르게 렌더링되고 있습니다.\n여기에 새로운 교육용 도구(퀴즈, 대화형 시뮬레이션 등)를 추가해 보세요.");
  };

  return (
    <div className="relative isolate flex flex-col items-center justify-center px-6 pt-14 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-zinc-50 to-zinc-50 dark:from-indigo-950/20 dark:via-zinc-950 dark:to-zinc-950 min-h-[calc(100vh-8rem)]">
      {/* 백그라운드 디자인 데코레이션 */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* 메인 Hero 영역 */}
      <div className="mx-auto max-w-2xl py-12 sm:py-20 lg:py-28 text-center">
        {/* 배지 */}
        <div className="mb-8 flex justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 transition-all duration-200">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" />
              사회공작실 교육용 템플릿
            </span>
          </div>
        </div>

        {/* 타이틀 및 설명 */}
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-zinc-300 bg-clip-text text-transparent">
          나만의 교육용 웹앱 만들기
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto">
          사회공작실에서 제공하는 가장 단순하고 확장성 높은 Next.js 템플릿입니다. 
          브라우저에서 동작하는 대화형 학습 도구를 지금 바로 설계해 보세요.
        </p>

        {/* 버튼 영역 */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {/* 요구사항: 기능 추가를 위한 가짜(Placeholder) 버튼 1개 */}
          <button
            onClick={handlePlaceholderClick}
            className="group flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 hover:-translate-y-0.5"
          >
            <PlusCircle className="h-4 w-4" />
            <span>도구 추가해보기</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* ==========================================
            [확장하기] // 여기에 새로운 컴포넌트를 추가하세요
            ==========================================
            
            추천 컴포넌트 예시:
            1. <QuizApp /> - 즉석 퀴즈 및 정답 풀이기
            2. <Flashcard /> - 단어 카드 뒤집기 도구
            3. <Calculator /> - 사회 과학 관련 시뮬레이션 계산기
            
            팁: components/ 폴더 안에 컴포넌트 파일을 만든 후,
            이곳에 import하여 바로 렌더링하면 됩니다.
            
            ========================================== */}
        <div className="mt-16 pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-lg mx-auto sm:max-w-none text-left">
          <div className="flex items-start gap-3 rounded-2xl bg-white/50 dark:bg-zinc-900/50 p-4 ring-1 ring-zinc-200/50 dark:ring-zinc-800/50 backdrop-blur-sm">
            <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Vercel 배포 준비 완료</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">GitHub 저장소에 올려 즉시 배포할 수 있는 빌드 검증 보일러플레이트입니다.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-white/50 dark:bg-zinc-900/50 p-4 ring-1 ring-zinc-200/50 dark:ring-zinc-800/50 backdrop-blur-sm">
            <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">반응형 웹 지원</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">모바일 폰, 태블릿, PC 모니터 화면 크기에 맞춰 레이아웃이 자동 조정됩니다.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-white/50 dark:bg-zinc-900/50 p-4 ring-1 ring-zinc-200/50 dark:ring-zinc-800/50 backdrop-blur-sm">
            <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">직관적인 컴포넌트 확장</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">components 폴더를 활용하여 자신만의 대화형 컴포넌트를 쉽게 격리하고 교체하세요.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 우측 하단 데코레이션 그라디언트 */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-15 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}

