"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { 
  SOCIAL_QUIZ_DATABASE, 
  SocialQuizQuestion, 
  UnitQuizData 
} from "../lib/socialQuizData";
import { 
  BookOpen, 
  Scale, 
  Building2, 
  TrendingUp, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ChevronRight
} from "lucide-react";

type UnitMode = "unit1" | "unit2" | "unit3" | "all";

export default function SocialQuizGame() {
  const [selectedMode, setSelectedMode] = useState<UnitMode>("unit1");
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Get current questions list based on mode
  const getQuestionsList = (): { unitMeta: Partial<UnitQuizData>; questions: SocialQuizQuestion[] } => {
    if (selectedMode === "all") {
      const allQuestions = [
        ...SOCIAL_QUIZ_DATABASE.unit1.questions,
        ...SOCIAL_QUIZ_DATABASE.unit2.questions,
        ...SOCIAL_QUIZ_DATABASE.unit3.questions
      ];
      return {
        unitMeta: {
          unitTitle: "종합 실전 테스트",
          subtitle: "1~3단원 전체 개념 총정리",
          badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
          icon: "🌟"
        },
        questions: allQuestions
      };
    }

    const unit = SOCIAL_QUIZ_DATABASE[selectedMode];
    return {
      unitMeta: unit,
      questions: unit.questions
    };
  };

  const currentQuizData = getQuestionsList();
  const questions = currentQuizData.questions;
  const currentQuestion = questions[currentQuizIdx] || questions[0];

  const handleSelectMode = (mode: UnitMode) => {
    setSelectedMode(mode);
    setCurrentQuizIdx(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsFinished(false);
  };

  const handleAnswerOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.answer) {
      setScore((prev) => prev + 20);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIdx < questions.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#a855f7", "#ec4899", "#10b981", "#f59e0b"]
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuizIdx(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 border border-purple-400/30 px-3.5 py-1 text-xs font-semibold text-purple-300 backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>2015 개정 교육과정 중3 사회</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            중3 사회 단원별 개념 퀴즈 🏛️
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            인권과 헌법, 헌법과 국가기관, 경제생활과 선택 단원의 핵심 수능·내신 개념을 퀴즈로 쉽게 정복해보세요!
          </p>
        </div>

        {/* Unit Selection Pills */}
        <div className="relative z-10 mt-8 flex flex-wrap gap-2 pt-4 border-t border-slate-700/60">
          <button
            onClick={() => handleSelectMode("unit1")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              selectedMode === "unit1"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]"
                : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>1단원. 인권과 헌법</span>
          </button>

          <button
            onClick={() => handleSelectMode("unit2")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              selectedMode === "unit2"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-[1.02]"
                : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>2단원. 헌법과 국가기관</span>
          </button>

          <button
            onClick={() => handleSelectMode("unit3")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              selectedMode === "unit3"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-[1.02]"
                : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>3단원. 경제생활과 선택</span>
          </button>

          <button
            onClick={() => handleSelectMode("all")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              selectedMode === "all"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 scale-[1.02]"
                : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>🌟 종합 테스트</span>
          </button>
        </div>

        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Quiz Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Top Info Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {currentQuizData.unitMeta.icon} {currentQuizData.unitMeta.unitTitle}
            </span>
            <p className="text-xs text-slate-500 mt-1">
              {currentQuizData.unitMeta.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <span className="text-xs font-bold px-3 py-1.5 bg-slate-100 rounded-xl text-slate-700">
              문제: <span className="text-purple-600">{currentQuizIdx + 1}</span> / {questions.length}
            </span>
            <span className="text-xs font-extrabold px-3 py-1.5 bg-purple-100 text-purple-800 rounded-xl border border-purple-200">
              점수: {score}점
            </span>
          </div>
        </div>

        {!isFinished ? (
          <div className="space-y-6">
            
            {/* Question Info */}
            <div className="space-y-2">
              <span className="inline-block text-[11px] font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-0.5 rounded-full">
                {currentQuestion.subtopic}
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const isChosen = selectedOption === idx;
                const isCorrect = idx === currentQuestion.answer;

                let btnStyle = "border-slate-200 text-slate-800 hover:border-purple-400 hover:bg-slate-50";

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20";
                  } else if (isChosen) {
                    btnStyle = "border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-500/20";
                  } else {
                    btnStyle = "border-slate-200 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleAnswerOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>
                      {idx + 1}. {opt}
                    </span>

                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isChosen && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Feedback Box */}
            {isAnswered && (
              <div
                className={`p-5 rounded-2xl text-xs sm:text-sm leading-relaxed border animate-fadeIn ${
                  selectedOption === currentQuestion.answer
                    ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                    : "bg-rose-50 border-rose-200 text-rose-950"
                }`}
              >
                <div className="font-extrabold text-sm mb-1 flex items-center gap-1.5">
                  {selectedOption === currentQuestion.answer ? (
                    <>🎉 정답입니다!</>
                  ) : (
                    <>❌ 아쉽네요! 정답은 {currentQuestion.answer + 1}번입니다.</>
                  )}
                </div>
                <p className="mt-1">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Action Next Button */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{currentQuizIdx < questions.length - 1 ? "다음 문제" : "최종 결과 확인"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        ) : (
          /* Finished Screen */
          <div className="text-center py-10 space-y-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto text-4xl shadow-inner">
              🏆
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900">
                사회 퀴즈를 완료했습니다!
              </h2>
              <p className="text-slate-600 text-sm">
                최종 점수: <span className="text-3xl font-black text-purple-600 ml-1">{score}</span> / {questions.length * 20}점
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              {score === questions.length * 20
                ? "축하합니다! 2015 개정 교육과정 사회 단원의 모든 핵심 개념을 마스터하셨습니다. 👏"
                : score >= (questions.length * 20) * 0.6
                ? "훌륭합니다! 틀린 문제의 핵심 개념을 다시 한번 복습해보세요. 💡"
                : "사회 교과서 단원 개념을 다시 정독하고 재도전해보세요! 📖"}
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleRestart}
                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>다시 도전하기</span>
              </button>
            </div>
          </div>
        )}

      </div>

      <footer className="text-center text-xs text-slate-400 py-4 border-t border-slate-200">
        <p>2015 개정 교육과정 중3 사회 학습 도우미 | 수연쌤의 아카데미</p>
      </footer>

    </div>
  );
}
