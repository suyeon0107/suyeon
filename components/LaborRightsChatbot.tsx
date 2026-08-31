"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Send, 
  RotateCcw, 
  Phone, 
  Calculator, 
  Bot, 
  X, 
  Copy, 
  FileText, 
  Coins, 
  Clock, 
  Sparkles, 
  HeartHandshake, 
  Building2, 
  AlertTriangle, 
  Gift, 
  Moon, 
  Maximize2,
  Download,
  Home,
  ScrollText,
  BookOpen
} from "lucide-react";

interface ActionItem {
  label: string;
  key: string;
}

interface MessageItem {
  id: string;
  sender: "bot" | "user";
  title?: string;
  icon?: string;
  content: React.ReactNode;
  actions?: ActionItem[];
  time: string;
}

interface Props {
  onClose?: () => void;
}

export default function LaborRightsChatbot({ onClose }: Props) {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  
  // Modal states
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{ title: string; src: string; downloadName: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculator states
  const [calcHourlyRate, setCalcHourlyRate] = useState(10320);
  const [calcWeeklyHours, setCalcWeeklyHours] = useState(20);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const getCurrentTimeStr = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";
    hours = hours % 12 || 12;
    return `${ampm} ${hours}:${minutes}`;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const handleGoHome = () => {
    if (onClose) {
      onClose();
    }
    router.push("/");
  };

  // Welcome flow on mount
  useEffect(() => {
    initWelcomeFlow();
  }, []);

  const initWelcomeFlow = () => {
    const initialMsg: MessageItem = {
      id: "welcome-1",
      sender: "bot",
      title: "안녕하세요! 청소년 노동인권 지킴이입니다 👋",
      icon: "sparkles",
      time: getCurrentTimeStr(),
      content: (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            한국공인노무사회 & 청소년근로권익센터가 전하는 <strong>일하는 청소년을 위한 노동인권 핵심 가이드</strong>입니다.<br />
            아래에서 궁금하신 주제를 선택해 톡으로 바로 확인해보세요!
          </p>

          {/* 대표 알바 십계명 / 근로조건 8 한눈에 보기 카드 */}
          <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
            <button 
              onClick={() => handleUserSelect("ten_commandments", "📜 청소년 알바 십계명 전체보기")}
              className="col-span-2 bg-amber-400 hover:bg-amber-500 text-slate-900 border border-amber-500 p-2.5 rounded-xl text-center flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
            >
              <ScrollText className="w-4 h-4 text-slate-900 shrink-0" />
              <span>📜 청소년 알바 십계명 포스터 보기</span>
            </button>

            <button 
              onClick={() => handleUserSelect("conditions_8", "📘 중3 근로조건 8가지 인포그래픽")}
              className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 p-2.5 rounded-xl text-center flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-white shrink-0" />
              <span>📘 중3이 알아야 할 근로조건 8가지</span>
            </button>
          </div>

          <div className="border-t border-slate-200 pt-2.5">
            <p className="text-[11px] font-bold text-slate-500 mb-2">📌 주제별 핵심 가이드</p>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
              <button 
                onClick={() => handleUserSelect("01_age", "연령 및 취업조건 알려줘")}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>연령 및 취업조건</span>
              </button>
              <button 
                onClick={() => handleUserSelect("02_docs", "필수 제출 서류 알려줘")}
                className="bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
              >
                <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                <span>부모님 동의서·서류</span>
              </button>
              <button 
                onClick={() => handleUserSelect("03_contract", "근로계약서 작성법 알려줘")}
                className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                <span>근로계약서 작성</span>
              </button>
              <button 
                onClick={() => handleUserSelect("04_wage", "최저임금 원칙 알려줘")}
                className="bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
              >
                <Coins className="w-4 h-4 text-blue-600 shrink-0" />
                <span>최저임금 원칙</span>
              </button>
              <button 
                onClick={() => handleUserSelect("05_forbidden", "유해업소 금지 규정 알려줘")}
                className="bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>유해업소 취업금지</span>
              </button>
              <button 
                onClick={() => handleUserSelect("06_hours", "근로 및 휴게시간 알려줘")}
                className="bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
              >
                <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                <span>근로시간·휴게시간</span>
              </button>
              <button 
                onClick={() => handleUserSelect("07_allowance", "가산수당 조건 알려줘")}
                className="bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
              >
                <Moon className="w-4 h-4 text-purple-600 shrink-0" />
                <span>야간·연장 가산수당</span>
              </button>
              <button 
                onClick={() => handleUserSelect("08_holiday", "주휴수당 알려줘")}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
              >
                <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>주휴수당 조건</span>
              </button>
              <button 
                onClick={() => handleUserSelect("09_injury", "산재보상 처리 알려줘")}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>산재보상 처리</span>
              </button>
              <button 
                onClick={() => handleUserSelect("10_counseling", "1:1 상담 연결해줘")}
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <HeartHandshake className="w-4 h-4 text-slate-900 shrink-0" />
                <span>1:1 노무사 무료상담</span>
              </button>
            </div>
          </div>
        </div>
      )
    };
    setMessages([initialMsg]);
  };

  const restartChat = () => {
    initWelcomeFlow();
    showToast("대화방이 초기화되었습니다.");
  };

  const appendUserMsg = (text: string) => {
    const userMsg: MessageItem = {
      id: "user-" + Date.now(),
      sender: "user",
      content: text,
      time: getCurrentTimeStr()
    };
    setMessages(prev => [...prev, userMsg]);
    scrollToBottom();
  };

  const appendBotMsg = (data: { title?: string; icon?: string; content: React.ReactNode; actions?: ActionItem[] }) => {
    setIsTyping(true);
    scrollToBottom();

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: MessageItem = {
        id: "bot-" + Date.now(),
        sender: "bot",
        title: data.title,
        icon: data.icon,
        content: data.content,
        actions: data.actions,
        time: getCurrentTimeStr()
      };
      setMessages(prev => [...prev, botMsg]);
      scrollToBottom();
    }, 300);
  };

  // Knowledge base content generator (숫자 머리말 제거, 직관적 카테고리 구성)
  const getKnowledgeContent = (key: string): { title: string; content: React.ReactNode; actions: ActionItem[] } | null => {
    switch (key) {
      case "ten_commandments":
        return {
          title: "📜 청소년 알바 십계명 (10가지 필수 규칙)",
          actions: [
            { label: "🔍 십계명 포스터 크게보기", key: "open_ten_img" },
            { label: "📘 근로조건 8가지 인포그래픽", key: "conditions_8" },
            { label: "📝 근로계약서 작성법", key: "03_contract" }
          ],
          content: (
            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div 
                onClick={() => setModalImage({
                  title: "청소년 알바 십계명 인포그래픽",
                  src: "/youth-ten-commandments.png",
                  downloadName: "청소년_알바_십계명.png"
                })}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 cursor-pointer group shadow-xs"
              >
                <div className="p-2 bg-amber-100 border-b border-amber-200 flex justify-between items-center text-xs font-bold text-amber-950">
                  <span className="flex items-center gap-1">
                    <ScrollText className="w-3.5 h-3.5 text-amber-700" />
                    청소년 알바 십계명 공식 포스터
                  </span>
                  <span className="text-[11px] text-amber-800 flex items-center gap-0.5">
                    <Maximize2 className="w-3 h-3" /> 크게보기
                  </span>
                </div>
                <img 
                  src="/youth-ten-commandments.png" 
                  alt="청소년 알바 십계명 포스터" 
                  className="w-full h-auto max-h-60 object-cover object-top group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1.5 leading-relaxed text-xs">
                <div className="font-bold text-slate-900 text-xs mb-1">📋 알바 십계명 요약</div>
                <p>· 만 15세 이상 청소년만 알바 가능 (13~14세는 취직인허가증 필요)</p>
                <p>· 부모님 동의서 및 가족관계증명서 작성·비치 필수</p>
                <p>· 시급, 근로시간 등이 기재된 근로계약서 1부 교부받기</p>
                <p>· 성인과 동일한 최저임금 적용 (2026년 10,320원)</p>
                <p>· 유흥주점, PC방 야간 등 유해 업종 취업 금지</p>
                <p>· 하루 7시간, 일주일 35시간 이내 근로</p>
                <p>· 5인 이상 사업장 연장·야간·휴일 근로 시 50% 가산수당</p>
                <p>· 주 15시간 이상 개근 시 1일 유급휴일 (주휴수당)</p>
                <p>· 일하다 다쳤을 때 100% 산재보험 치료 및 보상</p>
                <p>· 부당 처우 시 청소년상담 #1388 / 센터 1644-3119 1:1 상담</p>
              </div>
            </div>
          )
        };

      case "conditions_8":
        return {
          title: "📘 중3이 꼭 알아야 할 최소한의 근로조건 8가지",
          actions: [
            { label: "🔍 인포그래픽 크게보기", key: "open_8_img" },
            { label: "📜 청소년 알바 십계명 보기", key: "ten_commandments" },
            { label: "🧮 알바비 급여 계산기", key: "open_calc" }
          ],
          content: (
            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div 
                onClick={() => setModalImage({
                  title: "중3이 꼭 알아야 할 최소한의 근로조건 8",
                  src: "/labor-conditions-8.png",
                  downloadName: "중3_최소한의_근로조건_8.png"
                })}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 cursor-pointer group shadow-xs"
              >
                <div className="p-2 bg-blue-100 border-b border-blue-200 flex justify-between items-center text-xs font-bold text-blue-950">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                    중3 근로조건 8가지 인포그래픽
                  </span>
                  <span className="text-[11px] text-blue-800 flex items-center gap-0.5">
                    <Maximize2 className="w-3 h-3" /> 크게보기
                  </span>
                </div>
                <img 
                  src="/labor-conditions-8.png" 
                  alt="중3이 꼭 알아야 할 최소한의 근로조건 8" 
                  className="w-full h-auto max-h-60 object-cover object-top group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200"><strong>근로계약서:</strong> 꼭 써서 1장 챙겨요</div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200"><strong>필수서류:</strong> 부모님 동의서 제출</div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200"><strong>최저임금:</strong> 2026년 10,320원</div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200"><strong>근로시간:</strong> 하루 7h, 주 35h 이내</div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200"><strong>야간근무:</strong> 밤 10시~새벽 6시 금지</div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200"><strong>휴게시간:</strong> 4h당 30분 쉬어요</div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200"><strong>주휴수당:</strong> 주 15h 이상 개근시</div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200"><strong>손해배상:</strong> 깨뜨려도 깎지 못함</div>
              </div>
            </div>
          )
        };

      case "01_age":
      case "age_places":
        return {
          title: "연령 조건 및 취업 허가 (만 15세 이상)",
          actions: [
            { label: "📑 부모님 동의서 서류 확인", key: "02_docs" },
            { label: "🚫 유해 업종 금지 규정", key: "05_forbidden" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold">
                <div className="bg-slate-100 p-2 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">만 13세 미만</span>
                  <span className="text-rose-600 font-bold">취업 불가 ❌</span>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                  <span className="text-blue-600 block">만 13~14세</span>
                  <span className="text-blue-800 font-bold">취직인허증 필요 📄</span>
                </div>
              </div>
              <div className="bg-amber-50 p-2.5 rounded-lg text-amber-900 leading-relaxed">
                <strong>📌 핵심 연령 규칙:</strong> 원칙적으로 만 15세 이상의 청소년만 아르바이트 및 시간제 근로가 가능합니다. (만 13~14세는 지방고용노동관 취직인허증 필수)
              </div>
            </div>
          )
        };

      case "02_docs":
        return {
          title: "필수 제출 서류 (부모님 동의서 & 증명서)",
          actions: [
            { label: "📝 근로계약서 작성법", key: "03_contract" },
            { label: "💵 최저임금 기준 확인", key: "04_wage" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-amber-50 p-2.5 rounded-lg text-amber-900 border-l-4 border-amber-400">
                <strong>📌 필수 제출 서류 2가지:</strong><br />
                만 18세 미만 청소년이 일할 때는 사업장에 다음 2가지 서류를 반드시 제출하고 비치해야 합니다.<br />
                ① <strong>친권자(부모님) 또는 후견인 동의서</strong><br />
                ② <strong>가족관계증명서</strong>
              </div>
            </div>
          )
        };

      case "03_contract":
      case "contract":
        return {
          title: "근로계약서 작성 및 1부 교부",
          actions: [
            { label: "🔍 표준계약서 서식 크게보기", key: "open_contract_img" },
            { label: "💵 최저임금 기준", key: "04_wage" },
            { label: "⏰ 근로시간 한도", key: "06_hours" }
          ],
          content: (
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <div className="bg-amber-50 p-2.5 rounded-lg border-l-4 border-amber-400">
                <p className="font-bold text-amber-900 mb-0.5">📌 근로계약서 교부 원칙</p>
                <p>근로계약서는 일하기 전 시급, 근로시간, 휴일, 업무내용을 적고 <strong>사용자와 근로자가 1부씩 나누어</strong> 가져야 합니다.</p>
              </div>

              {/* 연소근로자 표준근로계약서 이미지 프리뷰 */}
              <div 
                onClick={() => setModalImage({
                  title: "연소근로자(18세 미만) 표준근로계약서 서식",
                  src: "/labor-contract.png",
                  downloadName: "연소근로자_표준근로계약서.png"
                })}
                className="my-2 border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shadow-sm group cursor-pointer"
              >
                <div className="p-2 bg-blue-50 border-b border-blue-100 flex justify-between items-center text-xs font-bold text-blue-900">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    연소근로자(18세 미만) 표준근로계약서 서식
                  </span>
                  <span className="text-[11px] text-blue-600 flex items-center gap-1 font-semibold">
                    <Maximize2 className="w-3 h-3" /> 크게보기
                  </span>
                </div>
                <img 
                  src="/labor-contract.png" 
                  alt="연소근로자 표준근로계약서" 
                  className="w-full h-auto max-h-52 object-cover object-top group-hover:scale-105 transition duration-300"
                />
              </div>

              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1 leading-relaxed">
                <li><strong>미작성/미교부 처벌:</strong> 위반 시 사업주에게 <span className="text-rose-600 font-bold">500만 원 이하 벌금</span>.</li>
                <li><strong>필수 기재사항:</strong> 임금, 근로시간, 주휴일, 연차휴가, 근무장소 및 업무내용.</li>
              </ul>
            </div>
          )
        };

      case "04_wage":
      case "wage":
        return {
          title: "최저임금 원칙 (성인과 동일 적용)",
          actions: [
            { label: "🧮 2026 최저시급 급여 계산기", key: "open_calc" },
            { label: "🎁 주휴수당 조건 보기", key: "08_holiday" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-xl shadow-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-bold">📌 2026년 고용노동부 최저임금</span>
                  <span className="text-[11px] text-blue-100">전 사업장 동일</span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xl font-black">시급 10,320원</span>
                  <span className="text-xs text-blue-100">(월 2,156,880원 / 209h)</span>
                </div>
                <p className="text-[11px] text-blue-200 mt-1">* 2025년 최저임금: 10,030원 | 청소년도 성인과 동일 시급 적용!</p>
              </div>

              <div className="bg-amber-50 p-2.5 rounded-lg text-amber-900 border-l-4 border-amber-400">
                <strong>⚠️ 단순노무직종 수습 감액(90%) 불가:</strong><br />
                편의점, 패스트푸드, 배달, 주방보조 등은 수습 감액 없이 <strong>최저임금 100%(10,320원) 전액 지급</strong>해야 합니다.
              </div>
            </div>
          )
        };

      case "05_forbidden":
      case "forbidden_jobs":
        return {
          title: "위험한 일 및 유해 업종 취업 금지",
          actions: [
            { label: "⏰ 근로시간 및 휴게시간", key: "06_hours" },
            { label: "🛡️ 1:1 권익 상담받기", key: "10_counseling" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-rose-50 p-2.5 rounded-lg text-rose-900 border-l-4 border-rose-400">
                <strong>📌 유해업소 취업 금지:</strong><br />
                청소년은 위험한 일이나 도덕상/보건상 유해한 업종에서 일할 수 없습니다.
              </div>
              <div className="bg-slate-100 p-2.5 rounded-lg text-slate-700 space-y-1 text-xs">
                <strong>🚫 주요 취업 금지 업종:</strong>
                <p>· 유흥주점, 단란주점, 비디오방, 성인용품점</p>
                <p>· 노래연습장(유흥접객), PC방(밤 10시 이후), 숙박업, 안마시술소 등</p>
              </div>
            </div>
          )
        };

      case "06_hours":
      case "hours":
        return {
          title: "근로시간 및 휴게시간 규정",
          actions: [
            { label: "🌙 야간·연장 가산수당 조건", key: "07_allowance" },
            { label: "🎁 주휴수당 조건 보기", key: "08_holiday" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-blue-50 p-2.5 rounded-lg border-l-4 border-blue-500">
                <strong className="text-blue-900 block mb-1">📌 청소년 법정 근로시간</strong>
                <div className="flex justify-between text-blue-800">
                  <span>· 1일 근로시간: <strong>7시간 이내</strong></span>
                  <span>· 1주일 근로시간: <strong>35시간 이내</strong></span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  * 연장근로는 당사자 합의 시 1일 1시간, 1주 5시간까지만 가능!
                </p>
              </div>

              <div className="bg-emerald-50 p-2.5 rounded-lg border-l-4 border-emerald-500">
                <strong className="text-emerald-900 block mb-1">☕ 휴게시간 필수 보장</strong>
                <p className="text-xs text-emerald-800">
                  · 4시간 일하면 <strong>30분 이상</strong>, 8시간 일하면 <strong>1시간 이상</strong> 휴게시간을 주어야 합니다. (대기시간은 근무시간에 포함!)
                </p>
              </div>
            </div>
          )
        };

      case "07_allowance":
      case "allowance":
        return {
          title: "야간·연장 가산수당 (5인 이상 사업장)",
          actions: [
            { label: "🎁 주휴수당 조건 보기", key: "08_holiday" },
            { label: "🏥 산재보상 처리 보기", key: "09_injury" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-purple-50 p-2.5 rounded-lg border-l-4 border-purple-500">
                <strong className="text-purple-950 block mb-1">📌 가산 임금 (+50%)</strong>
                <p className="text-purple-900">
                  상시 근로자 5명 이상 사업장에서 <strong>휴일 근무나 야간/연장 초과 근무 시 50%의 가산 임금</strong>을 받을 수 있습니다.
                </p>
              </div>
              <div className="bg-slate-100 p-2 text-xs space-y-1 rounded-lg">
                <p>🌙 야간근로 (밤 10시 ~ 아침 6시): +50% 가산</p>
                <p>⏱️ 연장근로 (약속시간 초과): +50% 가산</p>
              </div>
            </div>
          )
        };

      case "08_holiday":
      case "weekly_holiday":
        return {
          title: "주휴수당 (유급휴일)",
          actions: [
            { label: "🧮 주휴수당 직접 계산해보기", key: "open_calc" },
            { label: "🏥 산재보상 처리 보기", key: "09_injury" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-emerald-50 p-2.5 rounded-lg border-l-4 border-emerald-500">
                <strong className="text-emerald-950 block mb-1">📌 하루 유급휴일 (주휴수당)</strong>
                <p className="text-emerald-900">
                  1주일 <strong>15시간 이상</strong> 일하고 약속된 날에 <strong>개근</strong>한 경우 하루의 유급휴일(주휴수당)을 지급받습니다.
                </p>
              </div>
              <div className="bg-slate-100 p-2 rounded-lg text-xs font-mono text-center text-blue-800">
                공식: (주 소정근로시간 ÷ 40시간) × 8시간 × 시급
              </div>
            </div>
          )
        };

      case "09_injury":
        return {
          title: "산업재해 (산재보상)",
          actions: [
            { label: "📞 1:1 상담 및 신고 연결", key: "10_counseling" },
            { label: "📜 알바 십계명 전체보기", key: "ten_commandments" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-emerald-50 p-2.5 rounded-lg border-l-4 border-emerald-500">
                <strong className="text-emerald-950 block mb-1">📌 산재보상 처리</strong>
                <p className="text-emerald-900">
                  일하다 다쳤다면 <strong>산업재해보상보험법 및 근로기준법에 따라 100% 치료와 보상</strong>을 받을 수 있습니다. (알바생도 산재보험 적용 대상!)
                </p>
              </div>
            </div>
          )
        };

      case "10_counseling":
      case "counseling":
        return {
          title: "상담 및 권리구제 (1:1 노무사 무료상담)",
          actions: [
            { label: "📞 1644-3119 전화 연결", key: "call_center" },
            { label: "📜 알바 십계명 처음으로", key: "ten_commandments" }
          ],
          content: (
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <div className="bg-amber-50 p-2.5 rounded-lg border-l-4 border-amber-500">
                <strong className="text-amber-950 block mb-1">📌 무료 권익 상담센터</strong>
                <p className="text-amber-900">
                  부당한 처우를 당하거나 궁금한 사항이 있을 때는 공인노무사의 무료 1:1 상담을 받으실 수 있습니다.
                </p>
              </div>

              <div className="bg-slate-100 p-2.5 rounded-xl space-y-1.5 text-slate-700 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold">☎️ 청소년근로권익센터</span>
                  <span className="font-bold text-blue-700">1644-3119</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>📱 청소년 모바일 문자상담</span>
                  <span className="font-bold text-slate-800">#1388</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>📞 청소년 전화 상담</span>
                  <span className="font-bold text-slate-800">02-6335-1388 / 02-6677-1429</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🏢 고용노동부 체불신고</span>
                  <span className="font-bold text-slate-800">국번없이 1350</span>
                </div>
              </div>
            </div>
          )
        };

      default:
        return null;
    }
  };

  const handleUserSelect = (key: string, customLabel?: string) => {
    if (key === "open_calc") {
      setIsCalcOpen(true);
      return;
    }
    if (key === "call_center") {
      setIsHelpOpen(true);
      return;
    }
    if (key === "open_contract_img") {
      setModalImage({
        title: "연소근로자(18세 미만) 표준근로계약서 서식",
        src: "/labor-contract.png",
        downloadName: "연소근로자_표준근로계약서.png"
      });
      return;
    }
    if (key === "open_ten_img") {
      setModalImage({
        title: "청소년 알바 십계명 인포그래픽",
        src: "/youth-ten-commandments.png",
        downloadName: "청소년_알바_십계명.png"
      });
      return;
    }
    if (key === "open_8_img") {
      setModalImage({
        title: "중3이 꼭 알아야 할 최소한의 근로조건 8",
        src: "/labor-conditions-8.png",
        downloadName: "중3_최소한의_근로조건_8.png"
      });
      return;
    }
    if (key === "welcome") {
      restartChat();
      return;
    }

    let queryKey = key;
    if (key.startsWith("quick_")) {
      const mapping: Record<string, string> = {
        quick_commandments: "ten_commandments",
        quick_conditions8: "conditions_8",
        quick_contract: "03_contract",
        quick_wage: "04_wage",
        quick_hours: "06_hours",
        quick_allowance: "07_allowance",
        quick_rights: "10_counseling"
      };
      queryKey = mapping[key] || key;
    }

    const selected = getKnowledgeContent(queryKey);
    if (selected) {
      appendUserMsg(customLabel || selected.title);
      appendBotMsg(selected);
    }
  };

  // Text query intent matcher
  const handleSendTextMessage = () => {
    const text = inputText.trim();
    if (!text) return;
    setInputText("");

    appendUserMsg(text);

    const lower = text.toLowerCase();
    let matchedKey: string | null = null;

    if (lower.includes("십계명") || lower.includes("10개") || lower.includes("규칙")) {
      matchedKey = "ten_commandments";
    } else if (lower.includes("중3") || lower.includes("근로조건") || lower.includes("8가지") || lower.includes("최소한")) {
      matchedKey = "conditions_8";
    } else if (lower.includes("나이") || lower.includes("연령") || lower.includes("몇살") || lower.includes("15세")) {
      matchedKey = "01_age";
    } else if (lower.includes("서류") || lower.includes("부모님") || lower.includes("동의서") || lower.includes("가족관계")) {
      matchedKey = "02_docs";
    } else if (lower.includes("계약서") || lower.includes("근로계약") || lower.includes("교부") || lower.includes("양식")) {
      matchedKey = "03_contract";
    } else if (lower.includes("최저") || lower.includes("시급") || lower.includes("임금") || lower.includes("10320")) {
      matchedKey = "04_wage";
    } else if (lower.includes("유해") || lower.includes("위험") || lower.includes("노래방") || lower.includes("pc방")) {
      matchedKey = "05_forbidden";
    } else if (lower.includes("근로시간") || lower.includes("시간") || lower.includes("휴게") || lower.includes("35시간")) {
      matchedKey = "06_hours";
    } else if (lower.includes("야간") || lower.includes("연장") || lower.includes("가산")) {
      matchedKey = "07_allowance";
    } else if (lower.includes("주휴") || lower.includes("유급휴일") || lower.includes("개근") || lower.includes("15시간")) {
      matchedKey = "08_holiday";
    } else if (lower.includes("산재") || lower.includes("다쳤") || lower.includes("치료") || lower.includes("병원")) {
      matchedKey = "09_injury";
    } else if (lower.includes("상담") || lower.includes("신고") || lower.includes("전화") || lower.includes("노무사") || lower.includes("1388")) {
      matchedKey = "10_counseling";
    } else if (lower.includes("계산")) {
      setIsCalcOpen(true);
      return;
    }

    if (matchedKey) {
      const selected = getKnowledgeContent(matchedKey);
      if (selected) {
        appendBotMsg(selected);
        return;
      }
    }

    // Fallback response with topic buttons
    appendBotMsg({
      title: "궁금하신 항목을 선택해주세요!",
      icon: "help",
      content: (
        <div>
          <p className="text-xs text-slate-600 mb-2">
            &quot;<strong>{text}</strong>&quot; 관련 주요 항목을 아래 메뉴에서 선택해보세요!
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <button onClick={() => handleUserSelect("ten_commandments")} className="col-span-2 bg-amber-100 hover:bg-amber-200 text-left p-2 rounded-lg font-bold text-amber-950 cursor-pointer">📜 알바 십계명 포스터 전체보기</button>
            <button onClick={() => handleUserSelect("01_age")} className="bg-slate-100 hover:bg-slate-200 text-left p-2 rounded-lg font-medium text-slate-800 cursor-pointer">연령 및 취업조건</button>
            <button onClick={() => handleUserSelect("02_docs")} className="bg-slate-100 hover:bg-slate-200 text-left p-2 rounded-lg font-medium text-slate-800 cursor-pointer">부모님 동의서·서류</button>
            <button onClick={() => handleUserSelect("03_contract")} className="bg-slate-100 hover:bg-slate-200 text-left p-2 rounded-lg font-medium text-slate-800 cursor-pointer">근로계약서 작성</button>
            <button onClick={() => handleUserSelect("04_wage")} className="bg-slate-100 hover:bg-slate-200 text-left p-2 rounded-lg font-medium text-slate-800 cursor-pointer">최저임금 원칙</button>
            <button onClick={() => handleUserSelect("06_hours")} className="bg-slate-100 hover:bg-slate-200 text-left p-2 rounded-lg font-medium text-slate-800 cursor-pointer">근로·휴게시간</button>
            <button onClick={() => handleUserSelect("08_holiday")} className="bg-slate-100 hover:bg-slate-200 text-left p-2 rounded-lg font-medium text-slate-800 cursor-pointer">주휴수당 조건</button>
            <button onClick={() => handleUserSelect("10_counseling")} className="bg-amber-50 hover:bg-amber-100 text-left p-2 rounded-lg font-bold text-amber-900 cursor-pointer">1:1 노무사 무료상담</button>
          </div>
        </div>
      )
    });
  };

  // Calculator computations
  const baseWeeklyPay = calcHourlyRate * calcWeeklyHours;
  const isHolidayEligible = calcWeeklyHours >= 15;
  const holidayHours = isHolidayEligible ? Math.min(8, (calcWeeklyHours / 40) * 8) : 0;
  const holidayPay = Math.round(holidayHours * calcHourlyRate);
  const totalWeeklyPay = baseWeeklyPay + holidayPay;

  const sendCalculatedToChat = () => {
    setIsCalcOpen(false);

    appendUserMsg(`시급 ${calcHourlyRate.toLocaleString()}원 / 주 ${calcWeeklyHours}시간 알바비 계산 결과`);
    appendBotMsg({
      title: "🧮 청소년 알바비 & 주휴수당 모의계산",
      icon: "calculator",
      actions: [
        { label: "🎁 주휴수당 상세규정", key: "08_holiday" },
        { label: "📞 공인노무사 상담받기", key: "10_counseling" }
      ],
      content: (
        <div className="space-y-1.5 text-xs">
          <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-200">
            <div className="flex justify-between py-0.5">
              <span className="text-slate-500">설정 시급:</span>
              <span className="font-bold text-slate-800">{calcHourlyRate.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-slate-500">주 근로시간:</span>
              <span className="font-bold text-slate-800">{calcWeeklyHours}시간 ({isHolidayEligible ? "주휴수당 적용 대상 ✅" : "주휴수당 미적용 ⚠️"})</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-slate-500">기본 주급:</span>
              <span className="font-bold text-slate-800">{baseWeeklyPay.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between py-0.5 text-emerald-700">
              <span className="font-bold">예상 주휴수당:</span>
              <span className="font-bold">+{holidayPay.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between pt-1 mt-1 border-t border-blue-200 font-bold text-blue-900 text-sm">
              <span>예상 총 주급:</span>
              <span>{totalWeeklyPay.toLocaleString()}원</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">* 실제 근무일 개근 여부 및 세금(소득세/고용보험 등)에 따라 다소 차이가 있을 수 있습니다.</p>
        </div>
      )
    });
  };

  const copyPhone = () => {
    navigator.clipboard.writeText("1644-3119").then(() => {
      showToast("청소년근로권익센터 전화번호(1644-3119)가 복사되었습니다.");
    });
  };

  return (
    <div className="py-4 px-2 sm:px-4 flex justify-center items-center min-h-[calc(100vh-4rem)] bg-slate-900/90 font-sans selection:bg-amber-300">
      
      {/* Mobile Chat Wrapper (HTML 원안 디자인) */}
      <div className="w-full max-w-md h-[100dvh] sm:h-[90vh] sm:max-h-[860px] bg-slate-100 flex flex-col sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-700/30 relative">
        
        {/* Top Header Bar */}
        <header className="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between z-20 shrink-0 shadow-xs">
          <div className="flex items-center gap-2.5">
            {/* 상단 홈 버튼 (홈페이지로 이동) */}
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-slate-900 border border-slate-300 transition cursor-pointer shrink-0"
              title="홈페이지로 돌아가기"
            >
              <Home className="w-4 h-4" />
            </button>

            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-400 p-[2px] shadow-sm">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-blue-600 text-base font-black">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-slate-900 text-xs sm:text-sm">청소년 노동인권 지킴이</h1>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">공인노무사회</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">청소년근로권익센터 1:1 맞춤 챗봇</p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsCalcOpen(true)} 
              className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition text-sm cursor-pointer" 
              title="주휴/알바비 계산기"
            >
              <Calculator className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsHelpOpen(true)} 
              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-full transition text-sm font-bold cursor-pointer" 
              title="권익센터 긴급상담"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button 
              onClick={restartChat} 
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition text-sm cursor-pointer" 
              title="대화 다시 시작"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Chat Content (#ABC1D1 Kakao Light Blue Background) */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#ABC1D1] relative">
          {/* Timestamp Badge */}
          <div className="flex justify-center my-1">
            <span className="bg-black/20 backdrop-blur-sm text-white text-[11px] px-3 py-1 rounded-full font-medium shadow-sm">
              한국공인노무사회 · 청소년근로권익센터 공인 가이드
            </span>
          </div>

          {/* Messages List */}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end items-end" : "items-start"} gap-2.5 animate-fadeIn`}>
              {msg.sender === "bot" && (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shrink-0 shadow-sm mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}

              {msg.sender === "user" ? (
                <div className="flex items-end gap-1.5 max-w-[75%]">
                  <span className="text-[10px] text-slate-600 font-medium">{msg.time}</span>
                  <div className="bg-[#FEE500] text-[#191919] px-3.5 py-2.5 rounded-2xl rounded-tr-xs text-xs sm:text-sm font-medium shadow-sm leading-relaxed break-words">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div className="max-w-[85%] space-y-1">
                  <div className="text-[11px] font-bold text-slate-700 ml-1">알바지킴이봇</div>
                  <div className="bg-white text-slate-800 p-3.5 rounded-2xl rounded-tl-xs shadow-md text-xs sm:text-sm leading-relaxed border border-slate-100">
                    {msg.title && (
                      <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-100 font-bold text-slate-900 text-xs sm:text-sm">
                        <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{msg.title}</span>
                      </div>
                    )}
                    <div>{msg.content}</div>
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {msg.actions.map((act) => (
                          <button
                            key={act.key}
                            onClick={() => handleUserSelect(act.key, act.label)}
                            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-2.5 py-1.5 rounded-lg border border-blue-200/70 transition flex items-center gap-1 active:scale-95 cursor-pointer"
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-600 font-medium ml-1">{msg.time}</span>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-2.5 animate-fadeIn">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shrink-0 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5 border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </main>

        {/* Floating Quick Action Chips */}
        <div className="bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-2 shrink-0 z-10">
          <div className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 px-1 text-xs font-semibold no-scrollbar">
            <button 
              onClick={() => handleUserSelect("quick_commandments")} 
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold border border-amber-500 transition shrink-0 flex items-center gap-1 cursor-pointer shadow-xs"
            >
              📜 알바 십계명
            </button>
            <button 
              onClick={() => handleUserSelect("quick_conditions8")} 
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300 transition shrink-0 flex items-center gap-1 cursor-pointer font-bold"
            >
              📘 근로조건 8
            </button>
            <button 
              onClick={() => handleUserSelect("quick_contract")} 
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 transition shrink-0 flex items-center gap-1 cursor-pointer"
            >
              📝 근로계약서
            </button>
            <button 
              onClick={() => handleUserSelect("quick_wage")} 
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-900 border border-slate-200 transition shrink-0 flex items-center gap-1 cursor-pointer"
            >
              💰 최저임금
            </button>
            <button 
              onClick={() => handleUserSelect("quick_hours")} 
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 border border-slate-200 transition shrink-0 flex items-center gap-1 cursor-pointer"
            >
              ⏰ 근로·휴게시간
            </button>
            <button 
              onClick={() => handleUserSelect("quick_allowance")} 
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-900 border border-slate-200 transition shrink-0 flex items-center gap-1 cursor-pointer"
            >
              ➕ 야간/연장 수당
            </button>
            <button 
              onClick={() => handleUserSelect("quick_rights")} 
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold transition shrink-0 flex items-center gap-1 shadow-xs cursor-pointer"
            >
              📞 1:1 권익상담
            </button>
          </div>

          {/* Text Search / Query Input */}
          <div className="flex items-center gap-2 mt-1 px-1">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="궁금한 내용을 질문해보세요 (예: 최저임금, 근로시간, 십계명)" 
                className="w-full bg-slate-100 border border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none text-xs sm:text-sm rounded-full py-2.5 pl-4 pr-9 transition text-slate-800 placeholder-slate-400 font-medium"
                onKeyDown={(e) => e.key === "Enter" && handleSendTextMessage()}
              />
              <button 
                onClick={handleSendTextMessage} 
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center text-xs transition cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Universal Image Full Viewer Modal */}
      {modalImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white w-full max-w-xl max-h-[92vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm sm:text-base">
                <FileText className="w-5 h-5 text-blue-600" /> {modalImage.title}
              </h3>
              <div className="flex items-center gap-2">
                <a 
                  href={modalImage.src} 
                  download={modalImage.downloadName}
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-200 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                  title="이미지 저장"
                >
                  <Download className="w-4 h-4" /> 저장
                </a>
                <button 
                  onClick={() => setModalImage(null)} 
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition text-base cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-slate-100 flex justify-center items-start">
              <img 
                src={modalImage.src} 
                alt={modalImage.title} 
                className="max-w-full h-auto rounded-lg shadow-md border border-slate-200"
              />
            </div>

            <div className="p-3 bg-white border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setModalImage(null)} 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition cursor-pointer shadow-xs"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wage & Weekly Allowance Modal */}
      {isCalcOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-5 overflow-hidden animate-fadeIn space-y-4 border border-slate-100">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-base">
                <Calculator className="w-5 h-5 text-blue-600" /> 청소년 알바 급여 계산기
              </h3>
              <button 
                onClick={() => setIsCalcOpen(false)} 
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700">시급 (원)</label>
                  <div className="flex gap-1">
                    <button 
                      type="button" 
                      onClick={() => setCalcHourlyRate(10320)} 
                      className="text-[10px] bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold px-1.5 py-0.5 rounded transition cursor-pointer"
                    >
                      2026년 최저(10,320원)
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setCalcHourlyRate(10030)} 
                      className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 px-1.5 py-0.5 rounded transition cursor-pointer"
                    >
                      2025년(10,030원)
                    </button>
                  </div>
                </div>
                <input 
                  type="number" 
                  value={calcHourlyRate} 
                  onChange={(e) => setCalcHourlyRate(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-lg p-2 font-semibold text-slate-800 focus:border-blue-500 focus:outline-none" 
                  placeholder="시급 입력"
                />
                <p className="text-[11px] text-slate-500 mt-1">* 2026년 법정 최저시급: <span className="text-blue-600 font-bold">10,320원</span> (미만 지급 시 불법)</p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">1주 총 일하는 시간 (시간)</label>
                <input 
                  type="number" 
                  value={calcWeeklyHours} 
                  onChange={(e) => setCalcWeeklyHours(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-lg p-2 font-semibold text-slate-800 focus:border-blue-500 focus:outline-none" 
                  placeholder="주 소정근로시간"
                />
                <p className="text-[11px] text-blue-600 font-medium mt-1">💡 청소년 법정 근로시간: 주 35시간 이내</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">기본 주급</span>
                  <span className="font-bold text-slate-800">{baseWeeklyPay.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500">주휴수당 예상</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${isHolidayEligible ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                      {isHolidayEligible ? "지급 대상" : "미해당"}
                    </span>
                  </div>
                  <span className="font-bold text-emerald-600">+{holidayPay.toLocaleString()}원</span>
                </div>
                <hr className="border-slate-200 my-1" />
                <div className="flex justify-between items-center text-sm font-bold text-slate-900 pt-1">
                  <span>예상 주급 합계</span>
                  <span className="text-blue-600 text-base">{totalWeeklyPay.toLocaleString()}원</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button 
                onClick={() => setIsCalcOpen(false)} 
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
              >
                닫기
              </button>
              <button 
                onClick={sendCalculatedToChat} 
                className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
              >
                챗봇에 공유하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Call Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-5 overflow-hidden animate-fadeIn space-y-4 border border-slate-100">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-base">
                <HeartHandshake className="w-5 h-5 text-rose-500" /> 청소년 권익보호 지원센터
              </h3>
              <button 
                onClick={() => setIsHelpOpen(false)} 
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="flex items-center gap-2 text-blue-800 font-bold mb-1 text-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> 청소년근로권익센터
                </div>
                <p className="text-slate-600 leading-relaxed mb-2">
                  한국공인노무사회 운영! 임금체불, 부당해고 등 공인노무사가 무료로 1:1 상담 및 권리구제를 지원합니다.
                </p>
                <div className="flex gap-2">
                  <a 
                    href="tel:1644-3119" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-bold flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-4 h-4" /> 1644-3119 전화
                  </a>
                  <button 
                    onClick={copyPhone} 
                    className="px-3 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 font-bold cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="font-bold text-slate-800 text-xs">기타 기관 안내</div>
                <div className="flex justify-between text-slate-600 text-[11px]">
                  <span>· 고용노동부 (임금체불/근로기준)</span>
                  <span className="font-semibold text-slate-800">국번없이 1350</span>
                </div>
                <div className="flex justify-between text-slate-600 text-[11px]">
                  <span>· 근로복지공단 (산업재해보상)</span>
                  <span className="font-semibold text-slate-800">1588-0075</span>
                </div>
                <div className="flex justify-between text-slate-600 text-[11px]">
                  <span>· 국가인권위원회 (차별/인권침해)</span>
                  <span className="font-semibold text-slate-800">국번없이 1331</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button 
                onClick={() => setIsHelpOpen(false)} 
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-xs px-4 py-2 rounded-full shadow-lg z-50 animate-fadeIn">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
