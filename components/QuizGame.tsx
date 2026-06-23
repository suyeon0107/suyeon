"use client";

import { useState, useEffect } from "react";
import { QUIZ_DATA, QuestionType, QuizCategoryType } from "../lib/quizData";
import { rankingService, Ranking } from "../lib/rankingService";
import { 
  Trophy, 
  User, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { isSupabaseConfigured } from "../lib/supabaseClient";

export default function QuizGame() {
  const [step, setStep] = useState<"setup" | "quiz" | "result" | "leaderboard">("setup");
  const [category, setCategory] = useState<"early" | "late">("early");
  const [studentName, setStudentName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  
  // Rankings states
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [leaderboardTab, setLeaderboardTab] = useState<"early" | "late">("early");
  const [isRankingsLoading, setIsRankingsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const currentCategoryData = QUIZ_DATA[category];
  const questions = currentCategoryData.questions;
  const currentQuestion = questions[currentQuestionIndex];

  // Fetch rankings whenever we open leaderboard or change ranking tabs
  useEffect(() => {
    if (step === "leaderboard") {
      fetchRankings(leaderboardTab);
    }
  }, [step, leaderboardTab]);

  const fetchRankings = async (cat: "early" | "late") => {
    setIsRankingsLoading(true);
    try {
      const data = await rankingService.getRankings(cat);
      setRankings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRankingsLoading(false);
    }
  };

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert("이름을 입력해 주세요!");
      return;
    }
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setStep("quiz");
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return; // Prevent clicking multiple options
    setSelectedOption(optionIndex);
    const correct = optionIndex === currentQuestion.answerIndex;
    if (correct) {
      setScore((prev) => prev + 20); // 5 questions, 20 points each = 100 points
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStep("result");
    }
  };

  const handleSubmitScore = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await rankingService.submitScore(studentName.trim(), score, category);
      if (response.success) {
        setLeaderboardTab(category); // Automatically switch leaderboard to current category
        setStep("leaderboard");
      } else {
        setSubmitError(response.error || "점수 등록 실패");
      }
    } catch (e) {
      setSubmitError("서버와의 통신 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreComment = (s: number) => {
    if (s === 100) return "대단합니다! 조선 시대에 태어났다면 영의정감입니다!";
    if (s >= 80) return "집현전 학사 수준의 훌륭한 조선 역사 전문가이십니다!";
    if (s >= 60) return "조선 시대 과거 시험 예비 합격권! 훌륭합니다.";
    if (s >= 40) return "조금만 더 노력하면 역사 왕이 될 수 있습니다!";
    return "조선 왕조 실록을 가볍게 한 번 더 읽어볼까요? 다시 도전해 보세요!";
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* 1. Setup / Landing Screen */}
      {step === "setup" && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight sm:text-4xl">
              조선 역사 퀴즈 챌린지
            </h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto text-sm sm:text-base">
              학생 여러분의 닉네임을 등록하고 조선 전기와 후기 퀴즈를 풀어 높은 순위에 도전해 보세요!
            </p>
          </div>

          <form onSubmit={handleStartQuiz} className="space-y-8 max-w-lg mx-auto">
            {/* Student Name Input */}
            <div className="space-y-2">
              <label htmlFor="student-name" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                학생 이름 (닉네임)
              </label>
              <div className="relative rounded-2xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <User className="h-5 w-5 text-zinc-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="student-name"
                  id="student-name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value.slice(0, 10))}
                  className="block w-full rounded-2xl border-0 py-4 pl-12 pr-4 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-zinc-800/50 ring-1 ring-inset ring-zinc-200 dark:ring-zinc-800 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:outline-none text-base transition-all duration-200"
                  placeholder="예: 홍길동"
                  required
                />
              </div>
            </div>

            {/* Category Select Cards */}
            <div className="space-y-3">
              <span className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                퀴즈 주제 선택
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Early Choseon */}
                <button
                  type="button"
                  onClick={() => setCategory("early")}
                  className={`flex flex-col text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                    category === "early"
                      ? "border-indigo-600 bg-indigo-50/30 dark:border-indigo-500 dark:bg-indigo-950/20 shadow-md"
                      : "border-zinc-200 bg-transparent hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                  }`}
                >
                  <span className="font-extrabold text-lg text-zinc-900 dark:text-white">
                    조선 전기 (건국 ~ 임진왜란)
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2">
                    {QUIZ_DATA.early.description}
                  </span>
                  <span className={`text-xs font-semibold mt-4 flex items-center ${
                    category === "early" ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"
                  }`}>
                    선택됨 <ChevronRight className="h-3 w-3 ml-0.5" />
                  </span>
                </button>

                {/* Late Choseon */}
                <button
                  type="button"
                  onClick={() => setCategory("late")}
                  className={`flex flex-col text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                    category === "late"
                      ? "border-indigo-600 bg-indigo-50/30 dark:border-indigo-500 dark:bg-indigo-950/20 shadow-md"
                      : "border-zinc-200 bg-transparent hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                  }`}
                >
                  <span className="font-extrabold text-lg text-zinc-900 dark:text-white">
                    조선 후기 (임진왜란 ~ 개항)
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2">
                    {QUIZ_DATA.late.description}
                  </span>
                  <span className={`text-xs font-semibold mt-4 flex items-center ${
                    category === "late" ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"
                  }`}>
                    선택됨 <ChevronRight className="h-3 w-3 ml-0.5" />
                  </span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 rounded-full bg-indigo-600 py-4 px-6 text-center text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>퀴즈 게임 시작하기</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setStep("leaderboard")}
                className="rounded-full border border-zinc-200 dark:border-zinc-800 py-4 px-6 text-center text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>전체 랭킹 보드</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. Quiz Playing Screen */}
      {step === "quiz" && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-300">
          {/* Progress bar */}
          <div className="space-y-2 mb-8">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-indigo-600 dark:text-indigo-400">
                {currentCategoryData.title}
              </span>
              <span className="text-zinc-500">
                문제 {currentQuestionIndex + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white leading-relaxed">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Option list */}
          <div className="grid grid-cols-1 gap-3.5 mb-8">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQuestion.answerIndex;
              
              let btnClass = "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50";
              
              if (showFeedback) {
                if (isCorrectAnswer) {
                  btnClass = "border-green-500 bg-green-50/50 text-green-700 dark:border-green-600 dark:bg-green-950/20 dark:text-green-400 font-semibold ring-2 ring-green-500/20";
                } else if (isSelected) {
                  btnClass = "border-red-500 bg-red-50/50 text-red-700 dark:border-red-600 dark:bg-red-950/20 dark:text-red-400 font-semibold ring-2 ring-red-500/20";
                } else {
                  btnClass = "opacity-55 border-zinc-200 dark:border-zinc-800 cursor-default";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={showFeedback}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full text-left p-4.5 rounded-2xl border-2 text-base transition-all duration-200 flex items-center justify-between group ${btnClass}`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-lg border font-bold text-sm ${
                      showFeedback
                        ? isCorrectAnswer 
                          ? "bg-green-500 text-white border-green-500" 
                          : isSelected 
                            ? "bg-red-500 text-white border-red-500" 
                            : "bg-zinc-100 text-zinc-400 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700"
                        : "bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors"
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="font-medium">{option}</span>
                  </span>
                  
                  {showFeedback && isCorrectAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0" />
                  )}
                  {showFeedback && isSelected && !isCorrectAnswer && (
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Explanation */}
          {showFeedback && (
            <div className="bg-indigo-50/50 dark:bg-indigo-950/10 rounded-2xl p-5 border border-indigo-100/50 dark:border-indigo-900/30 mb-8 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                {selectedOption === currentQuestion.answerIndex ? (
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" /> 정답입니다! (+20점)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-red-600 dark:text-red-400">
                    <XCircle className="h-4 w-4" /> 오답입니다.
                  </span>
                )}
              </div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">역사 해설:</h4>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>{currentQuestionIndex + 1 === questions.length ? "결과 보기" : "다음 문제"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Result / Score Screen */}
      {step === "result" && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 text-center transition-all duration-300">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 mb-6">
            <Award className="h-10 w-10 animate-bounce" />
          </div>
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            퀴즈 완료!
          </h2>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            {studentName} 학생, 수고하셨습니다!
          </p>

          {/* Score display */}
          <div className="my-8 inline-block bg-zinc-50 dark:bg-zinc-800/50 px-8 py-6 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50">
            <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider block">획득 점수</span>
            <span className="text-6xl font-extrabold text-indigo-600 dark:text-indigo-400 block mt-1">
              {score} <span className="text-3xl text-zinc-700 dark:text-zinc-300">점</span>
            </span>
          </div>

          <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200 max-w-md mx-auto mb-10 leading-relaxed px-4">
            {getScoreComment(score)}
          </p>

          {/* Error warning if submission failed */}
          {submitError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-800 border border-red-200 text-sm max-w-md mx-auto dark:bg-red-950/10 dark:text-red-400 dark:border-red-900/30">
              {submitError}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <button
              onClick={handleSubmitScore}
              disabled={isSubmitting}
              className="w-full sm:flex-1 rounded-full bg-indigo-600 py-3.5 px-6 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>랭킹 등록 중...</span>
                </>
              ) : (
                <>
                  <Trophy className="h-4 w-4" />
                  <span>내 랭킹 등록하기</span>
                </>
              )}
            </button>
            <button
              onClick={() => setStep("setup")}
              className="w-full sm:flex-1 rounded-full border border-zinc-200 dark:border-zinc-800 py-3.5 px-6 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>다시 도전하기</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Leaderboard / Rankings Screen */}
      {step === "leaderboard" && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-amber-100 dark:bg-amber-950/20 text-amber-500 rounded-full flex items-center justify-center">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">명예의 전당</h2>
                <p className="text-xs text-zinc-500">
                  {isSupabaseConfigured ? "실시간 연동 데이터베이스" : "로컬 브라우저 저장 모드"}
                </p>
              </div>
            </div>

            {/* Leaderboard tabs */}
            <div className="flex bg-zinc-100 dark:bg-zinc-800/60 p-1.5 rounded-full ring-1 ring-zinc-200/10">
              <button
                onClick={() => setLeaderboardTab("early")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  leaderboardTab === "early"
                    ? "bg-white text-indigo-600 dark:bg-zinc-700 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                조선 전기
              </button>
              <button
                onClick={() => setLeaderboardTab("late")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  leaderboardTab === "late"
                    ? "bg-white text-indigo-600 dark:bg-zinc-700 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                조선 후기
              </button>
            </div>
          </div>

          {/* Loader or rankings list */}
          {isRankingsLoading ? (
            <div className="py-20 flex flex-col justify-center items-center gap-3">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
              <p className="text-sm text-zinc-400 font-medium">랭킹을 불러오는 중...</p>
            </div>
          ) : rankings.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-zinc-400 font-medium text-sm">아직 등록된 랭킹 기록이 없습니다.</p>
              <p className="text-xs text-zinc-500 mt-1">퀴즈를 풀고 가장 먼저 랭킹에 이름을 새겨 보세요!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Podium for top 3 (only visible on screen md and up for neat structure) */}
              <div className="hidden sm:grid grid-cols-3 gap-4 items-end max-w-xl mx-auto pt-6 pb-4">
                {/* 2nd Place */}
                {rankings[1] && (
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-bold text-zinc-500">
                        2
                      </div>
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-400 text-[10px] font-bold text-white">🥈</span>
                    </div>
                    <span className="mt-2 font-bold text-zinc-900 dark:text-zinc-200 text-sm max-w-[100px] truncate">{rankings[1].student_name}</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-xs">{rankings[1].score}점</span>
                    <div className="mt-3 bg-zinc-100 dark:bg-zinc-800/80 w-full h-16 rounded-t-xl border border-b-0 border-zinc-200/50 dark:border-zinc-700/50 flex items-center justify-center text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                      2등
                    </div>
                  </div>
                )}
                
                {/* 1st Place */}
                {rankings[0] && (
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="h-14 w-14 bg-amber-50 dark:bg-amber-950/20 rounded-full border border-amber-200 dark:border-amber-900 flex items-center justify-center font-bold text-amber-600 dark:text-amber-400">
                        1
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[12px] font-bold text-white shadow-md animate-bounce">👑</span>
                    </div>
                    <span className="mt-2 font-extrabold text-zinc-950 dark:text-white text-base max-w-[110px] truncate">{rankings[0].student_name}</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">{rankings[0].score}점</span>
                    <div className="mt-3 bg-amber-50/50 dark:bg-amber-950/30 w-full h-24 rounded-t-2xl border border-b-0 border-amber-200/50 dark:border-amber-900/30 flex items-center justify-center text-xs font-bold text-amber-600 dark:text-amber-400 shadow-md">
                      1등
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {rankings[2] && (
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="h-10 w-10 bg-orange-50 dark:bg-orange-950/20 rounded-full border border-orange-200 dark:border-orange-900 flex items-center justify-center font-bold text-orange-600 dark:text-orange-400">
                        3
                      </div>
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-400 text-[10px] font-bold text-white">🥉</span>
                    </div>
                    <span className="mt-2 font-bold text-zinc-900 dark:text-zinc-200 text-sm max-w-[100px] truncate">{rankings[2].student_name}</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-xs">{rankings[2].score}점</span>
                    <div className="mt-3 bg-orange-50/30 dark:bg-orange-950/10 w-full h-12 rounded-t-xl border border-b-0 border-orange-200/50 dark:border-orange-900/30 flex items-center justify-center text-xs font-semibold text-orange-400 dark:text-orange-500">
                      3등
                    </div>
                  </div>
                )}
              </div>

              {/* Standard List View */}
              <div className="overflow-hidden border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl shadow-sm">
                <table className="min-w-full divide-y divide-zinc-200/60 dark:divide-zinc-800/80">
                  <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                    <tr>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider w-20">순위</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">이름</th>
                      <th scope="col" className="px-6 py-3.5 text-right text-xs font-bold text-zinc-500 uppercase tracking-wider">획득 점수</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-100 dark:divide-zinc-800/60">
                    {rankings.map((r, index) => {
                      let medal = "";
                      if (index === 0) medal = "🥇";
                      else if (index === 1) medal = "🥈";
                      else if (index === 2) medal = "🥉";

                      return (
                        <tr 
                          key={r.id || index}
                          className={r.student_name === studentName ? "bg-indigo-50/20 dark:bg-indigo-950/10 font-bold" : ""}
                        >
                          <td className="px-6 py-4.5 whitespace-nowrap text-sm font-bold text-zinc-900 dark:text-white">
                            {medal ? <span className="text-base mr-1">{medal}</span> : `${index + 1}위`}
                          </td>
                          <td className="px-6 py-4.5 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                            <span className="flex items-center gap-2">
                              {r.student_name}
                              {r.student_name === studentName && (
                                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/10 dark:bg-indigo-900/30 dark:text-indigo-300">
                                  나
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4.5 whitespace-nowrap text-sm text-indigo-600 dark:text-indigo-400 font-extrabold text-right">
                            {r.score} 점
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setStep("setup")}
              className="rounded-full border border-zinc-200 dark:border-zinc-800 py-3 px-6 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 flex items-center gap-1.5"
            >
              <RotateCcw className="h-4 w-4" />
              <span>처음 화면으로</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
