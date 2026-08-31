"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Download
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

export default function LaborRightsChatbot() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  
  // Modal states
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isContractImgOpen, setIsContractImgOpen] = useState(false);
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
            아르바이트를 시작하거나 일하면서 궁금했던 점을 아래 메뉴에서 톡으로 바로 확인해보세요!
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-1">
            <button 
              onClick={() => handleUserSelect("contract", "01. 근로계약서 알려줘")}
              className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-600 shrink-0" />
              <span>01. 근로계약서</span>
            </button>
            <button 
              onClick={() => handleUserSelect("age_places", "02. 일할 수 있는 연령/장소 알려줘")}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>02. 연령 및 장소</span>
            </button>
            <button 
              onClick={() => handleUserSelect("wage", "04. 최저임금 원칙 알려줘")}
              className="bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
            >
              <Coins className="w-4 h-4 text-blue-600 shrink-0" />
              <span>04. 최저임금 원칙</span>
            </button>
            <button 
              onClick={() => handleUserSelect("weekly_holiday", "05. 주휴수당 조건 알려줘")}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
            >
              <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>05. 주휴수당</span>
            </button>
            <button 
              onClick={() => handleUserSelect("allowance", "06. 야간/연장 가산수당 알려줘")}
              className="bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
            >
              <Moon className="w-4 h-4 text-purple-600 shrink-0" />
              <span>06. 가산수당 (5인이상)</span>
            </button>
            <button 
              onClick={() => handleUserSelect("hours", "08. 근로시간 및 휴게시간 알려줘")}
              className="bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
            >
              <Clock className="w-4 h-4 text-sky-600 shrink-0" />
              <span>08. 근로·휴게시간</span>
            </button>
            <button 
              onClick={() => handleUserSelect("rights_protect", "10. 부당해고/산재/괴롭힘 대처법")}
              className="bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 p-2.5 rounded-xl text-left flex items-center gap-1.5 transition cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>10-14. 권익·구제</span>
            </button>
            <button 
              onClick={() => handleUserSelect("counseling", "무료 1:1 상담 연결")}
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold p-2.5 rounded-xl text-left flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-slate-900 shrink-0" />
              <span>1:1 노무사 무료상담</span>
            </button>
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

  // Knowledge base content generator
  const getKnowledgeContent = (key: string): { title: string; content: React.ReactNode; actions: ActionItem[] } | null => {
    switch (key) {
      case "contract":
        return {
          title: "01. 근로계약서 작성 및 교부",
          actions: [
            { label: "🔍 근로계약서 서식 크게보기", key: "open_contract_img" },
            { label: "💰 최저임금 & 주휴수당 확인", key: "wage" },
            { label: "⏰ 청소년 근로시간 기준", key: "hours" }
          ],
          content: (
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <div className="bg-amber-50 p-2.5 rounded-lg border-l-4 border-amber-400">
                <p className="font-bold text-amber-900 mb-0.5">📌 필수 원칙</p>
                <p>근로계약서는 <strong>사용자와 근로자가 1부씩 각각 나누어</strong> 가져야 합니다.</p>
              </div>

              {/* 연소근로자 표준근로계약서 이미지 프리뷰 */}
              <div className="my-2 border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shadow-sm group">
                <div className="p-2 bg-blue-50 border-b border-blue-100 flex justify-between items-center text-xs font-bold text-blue-900">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    연소근로자(18세 미만) 표준근로계약서 서식
                  </span>
                  <button 
                    onClick={() => setIsContractImgOpen(true)}
                    className="text-[11px] text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Maximize2 className="w-3 h-3" /> 크게보기
                  </button>
                </div>
                <div 
                  onClick={() => setIsContractImgOpen(true)}
                  className="relative cursor-pointer overflow-hidden bg-slate-100 flex justify-center items-center"
                >
                  <img 
                    src="/labor-contract.png" 
                    alt="연소근로자(18세 미만인 자) 표준근로계약서" 
                    className="w-full h-auto max-h-56 object-cover object-top hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold text-xs gap-1.5 backdrop-blur-[1px]">
                    <Maximize2 className="w-4 h-4" /> Click하여 전체 서식 확인
                  </div>
                </div>
              </div>

              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1 leading-relaxed">
                <li><strong>미작성/미교부 처벌:</strong> 위반 시 사업주에게 <span className="text-rose-600 font-bold">500만 원 이하의 벌금</span>이 부과됩니다.</li>
                <li><strong>필수 기재사항:</strong> 임금(시급/월급), 근로시간, 주휴일, 연차유급휴가, 근무 장소 및 업무 내용.</li>
                <li><strong>양식 다운로드:</strong> 표준근로계약서 5종은 <em>청소년근로권익센터 [자료실]</em>에서 다운받으실 수 있습니다.</li>
              </ul>
            </div>
          )
        };
      case "age_places":
        return {
          title: "02. 취업할 수 있는 연령 및 장소",
          actions: [
            { label: "📝 근로계약서 작성법", key: "contract" },
            { label: "🛡️ 부당대우 상담하기", key: "counseling" }
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
              <div className="bg-amber-50 p-2.5 rounded-lg text-amber-900">
                <strong>만 18세 미만 청소년 필수 준비서류:</strong><br />
                ① 가족관계증명서 + ② 친권자(후견인) 동의서
              </div>
              <div className="bg-rose-50 p-2.5 rounded-lg text-rose-900 border-l-4 border-rose-400">
                <strong>🚫 취업 금지 업종 (청소년 유해업소):</strong><br />
                유흥주점, 단란주점, 비디오방, 노래연습장(청소년실 제외 유흥), PC방(야간제한), 성인용품점, 숙박업, 안마시술소 등
              </div>
            </div>
          )
        };
      case "wage":
        return {
          title: "04. 최저임금 및 임금지급 4대 원칙",
          actions: [
            { label: "🧮 2026 최저시급으로 주급 계산", key: "open_calc" },
            { label: "🎁 주휴수당 조건 및 계산", key: "weekly_holiday" },
            { label: "➕ 가산수당(야간/연장/휴일)", key: "allowance" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-xl shadow-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-bold">2026년 고용노동부 고시</span>
                  <span className="text-[11px] text-blue-100">전 사업장 동일 적용</span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xl font-black">시급 10,320원</span>
                  <span className="text-xs text-blue-100">(월 환산 2,156,880원 / 209h 기준)</span>
                </div>
                <p className="text-[11px] text-blue-200 mt-1">* 2025년 최저임금: 10,030원 | 2024년 최저임금: 9,860원</p>
              </div>

              <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-emerald-900 font-bold block">1명 이상 모든 사업장 필수 적용</span>
                  <span className="text-[11px] text-emerald-700">최저임금 미만 지급 시 3년 이하 징역 또는 2천만원 이하 벌금</span>
                </div>
                <button 
                  onClick={() => setIsCalcOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2.5 py-1.5 rounded-lg font-bold shadow-sm shrink-0 transition cursor-pointer"
                >
                  급여 계산기
                </button>
              </div>
              
              <div className="bg-amber-50 p-2.5 rounded-lg text-amber-900 border-l-4 border-amber-400">
                <strong>⚠️ 수습기간 감액(90%) 불가 직종:</strong><br />
                패스트푸드, 편의점, 배달원, 청소원, 주방보조 등 <u>단순노무직종</u>은 1년 이상 계약하더라도 수습 감액 없이 <strong>최저임금 100%(10,320원) 전액 지급</strong>해야 합니다.
              </div>

              <div className="space-y-1">
                <strong className="text-slate-800 block">💡 임금 지급의 4대 원칙</strong>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <div className="bg-slate-100 p-1.5 rounded"><strong>1. 직접불:</strong> 본인에게 직접</div>
                  <div className="bg-slate-100 p-1.5 rounded"><strong>2. 통화불:</strong> 현금/통장 화폐로</div>
                  <div className="bg-slate-100 p-1.5 rounded"><strong>3. 전액불:</strong> 공제없이 전액</div>
                  <div className="bg-slate-100 p-1.5 rounded"><strong>4. 정기불:</strong> 월 1회 정해진 날</div>
                </div>
              </div>

              <div className="bg-blue-50 p-2.5 rounded-lg text-blue-900">
                <strong>📄 임금명세서 교부 의무:</strong><br />
                임금 지급 시 계산방법, 구성항목, 공제내역이 적힌 서면(또는 전자문서)을 의무 교부해야 합니다.
              </div>
            </div>
          )
        };
      case "weekly_holiday":
        return {
          title: "05. 주휴수당 (유급휴일)",
          actions: [
            { label: "🧮 주휴수당 직접 계산해보기", key: "open_calc" },
            { label: "⏰ 근로시간/휴게시간 규정", key: "hours" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-blue-50 p-2.5 rounded-lg border-l-4 border-blue-500">
                <p className="font-bold text-blue-950">주휴수당 지급 요건 2가지</p>
                <p className="text-blue-800 mt-0.5">① 1주 소정근로시간이 <strong>15시간 이상</strong>일 것<br />② 약속된 소정근로일을 <strong>모두 출근(개근)</strong>할 것</p>
              </div>

              <div className="bg-slate-100 p-2.5 rounded-lg">
                <span className="font-bold text-slate-800 block mb-1">🧮 기본 계산 공식</span>
                <code className="block bg-white p-2 rounded border border-slate-300 text-blue-700 font-bold text-center">
                  (1주 소정근로시간 ÷ 40시간) × 8시간 × 시급
                </code>
                <p className="text-xs text-slate-600 mt-1.5">
                  * <strong>2026년 기준 예시:</strong> 주 20시간 일하고 최저시급 10,320원인 경우<br />
                  (20 ÷ 40) × 8 × 10,320원 = <strong>41,280원 주휴수당 추가 지급!</strong><br />
                  👉 기본주급(206,400원) + 주휴수당(41,280원) = <strong>총 247,680원</strong>
                </p>
              </div>
            </div>
          )
        };
      case "allowance":
        return {
          title: "06-07. 가산수당 및 휴업수당 (5인 이상)",
          actions: [
            { label: "⏰ 청소년 근로시간 한도", key: "hours" },
            { label: "🛡️ 권익센터 1:1 상담", key: "counseling" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="bg-purple-700 text-white font-bold p-2 text-center text-xs">
                  상시근로자 5인 이상 사업장 가산수당
                </div>
                <div className="p-2 space-y-1.5 bg-purple-50/50">
                  <div className="flex justify-between items-center py-1 border-b border-purple-100">
                    <span className="font-bold text-slate-800">🌙 야간근로 (22:00 ~ 06:00)</span>
                    <span className="text-purple-700 font-bold">+50% 가산</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-purple-100">
                    <span className="font-bold text-slate-800">⏱️ 연장근로 (약속시간 초과)</span>
                    <span className="text-purple-700 font-bold">+50% 가산</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-bold text-slate-800">🎌 휴일근로 (주휴일/공휴일)</span>
                    <span className="text-purple-700 font-bold text-right">8시간내 +50%<br />8시간초과 +100%</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-2.5 rounded-lg text-amber-900">
                <strong>🏢 휴업수당 (5인 이상):</strong><br />
                가게 사정이나 사용자의 귀책사유로 쉬게 할 경우, 휴업기간 동안 <strong>평균임금의 70% 이상</strong>을 지급해야 합니다.
              </div>
            </div>
          )
        };
      case "hours":
        return {
          title: "08. 근로시간 및 휴게시간",
          actions: [
            { label: "🌴 휴일 및 연차유급휴가", key: "holidays" },
            { label: "💰 가산수당 기준 보기", key: "allowance" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-blue-50 p-2.5 rounded-lg border-l-4 border-blue-500">
                <strong className="text-blue-900 block mb-1">👶 18세 미만 청소년 법정 근로시간</strong>
                <div className="flex justify-between text-blue-800">
                  <span>· 1일 법정근로시간: <strong>7시간 이내</strong></span>
                  <span>· 1주일: <strong>35시간 이내</strong></span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  * 연장근로는 당사자 합의 시 <strong>1일 1시간, 1주 5시간</strong>까지만 가능!
                </p>
              </div>

              <div className="bg-emerald-50 p-2.5 rounded-lg border-l-4 border-emerald-500">
                <strong className="text-emerald-900 block mb-1">☕ 꼭 챙겨야 하는 휴게시간</strong>
                <ul className="list-disc list-inside text-emerald-800 space-y-0.5 text-xs">
                  <li><strong>4시간 근무 시:</strong> 30분 이상 보장</li>
                  <li><strong>8시간 근무 시:</strong> 1시간 이상 보장</li>
                </ul>
                <p className="text-xs text-emerald-700 mt-1">
                  ⚠️ 사장님 지휘·명령 아래 손님을 기다리는 <u>대기시간은 휴게시간이 아니라 &apos;근로시간&apos;</u>에 해당합니다!
                </p>
              </div>
            </div>
          )
        };
      case "holidays":
        return {
          title: "09. 휴일 및 휴가 규정",
          actions: [
            { label: "🎁 주휴수당 조건 보기", key: "weekly_holiday" },
            { label: "🚪 권익보호/구제 보기", key: "rights_protect" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-slate-100 p-2.5 rounded-lg">
                <strong className="text-slate-800 block mb-1">⭐ 법에서 정한 유급휴일</strong>
                <p className="text-slate-600">
                  · <strong>주휴일</strong> (1주 개근 시 1일 유급)<br />
                  · <strong>근로자의 날</strong> (매년 5월 1일)<br />
                  · <strong>관공서 공휴일 및 대체공휴일</strong> (5인 이상 사업장 적용)
                </p>
              </div>
              <div className="bg-blue-50 p-2.5 rounded-lg text-blue-900">
                <strong>🏖️ 연차유급휴가 (5인 이상):</strong><br />
                1년 미만 근로자는 1개월 개근 시 1일의 유급휴가가 발생하며, 1년간 80% 이상 출근 시 15일의 유급휴가가 부여됩니다.
              </div>
            </div>
          )
        };
      case "rights_protect":
        return {
          title: "10~14. 권리구제 (해고·산재·괴롭힘·퇴직금)",
          actions: [
            { label: "📞 청소년 권익센터에 신고/상담", key: "counseling" },
            { label: "🏢 접수 기관 목록 확인", key: "org_list" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-rose-50 p-2.5 rounded-lg border-l-4 border-rose-400">
                <strong className="text-rose-900 block">🛑 직장 내 성희롱·괴롭힘 금지</strong>
                <p className="text-xs text-rose-800">
                  직장 내 지위 우위를 이용해 업무상 적정 범위를 넘어 신체적/정신적 고통을 주거나 성적 굴욕감을 주는 행위는 법으로 엄격히 금지됩니다.
                </p>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-lg border-l-4 border-emerald-400">
                <strong className="text-emerald-900 block">🏥 산업재해 (산재보험)</strong>
                <p className="text-xs text-emerald-800">
                  일하다 다치면 알바생도 <strong>100% 산재 처리</strong> 가능! (치료비 요양급여, 일 못한 기간 휴업급여 등 보상)<br />
                  * 문의: 근로복지공단 (1588-0075)
                </p>
              </div>
              <div className="bg-amber-50 p-2.5 rounded-lg border-l-4 border-amber-400">
                <strong className="text-amber-900 block">🚪 해고 및 해고예고수당</strong>
                <p className="text-xs text-amber-800">
                  해고는 <strong>정당한 이유 + 서면 통보 + 30일 전 예고</strong>가 원칙!<br />
                  * 30일 전 예고 없이 해고 시: <span className="font-bold">30일분 통상임금(해고예고수당)</span> 청구 가능 (3개월 이상 근무 시)
                </p>
              </div>
              <div className="bg-blue-50 p-2.5 rounded-lg border-l-4 border-blue-400">
                <strong className="text-blue-900 block">💰 퇴직금 및 금품 청산</strong>
                <p className="text-xs text-blue-800">
                  1주 15시간 이상 + 1년 이상 일했다면 알바도 퇴직금 지급 대상! (퇴직 후 14일 이내 지급 원칙)
                </p>
              </div>
            </div>
          )
        };
      case "org_list":
        return {
          title: "신고 및 민원 접수 기관",
          actions: [
            { label: "📞 청소년 무료 1:1 상담", key: "counseling" },
            { label: "🏠 처음 메뉴로 이동", key: "welcome" }
          ],
          content: (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="bg-slate-100 p-2 rounded-lg flex items-start gap-2">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">고용노동부 지청 (진정서 제출)</strong>
                  <p className="text-xs text-slate-500">임금체불, 주휴수당 미지급, 근로계약서 미작성</p>
                </div>
              </div>
              <div className="bg-slate-100 p-2 rounded-lg flex items-start gap-2">
                <Building2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">노동위원회 (부당해고 구제신청)</strong>
                  <p className="text-xs text-slate-500">억울한 해고 및 부당 징계 (5인 이상 사업장)</p>
                </div>
              </div>
              <div className="bg-slate-100 p-2 rounded-lg flex items-start gap-2">
                <Building2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">근로복지공단 (산재보상 신청)</strong>
                  <p className="text-xs text-slate-500">업무상 부상, 질병, 출퇴근 중 사고 치료비</p>
                </div>
              </div>
              <div className="bg-slate-100 p-2 rounded-lg flex items-start gap-2">
                <Building2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">국가인권위원회 (진정서 제출)</strong>
                  <p className="text-xs text-slate-500">나이, 성별, 신분 등에 따른 차별 및 인권침해</p>
                </div>
              </div>
            </div>
          )
        };
      case "counseling":
        return {
          title: "청소년근로권익센터 1:1 무료 상담",
          actions: [
            { label: "📞 바로 전화 연결하기", key: "call_center" },
            { label: "🧮 알바비 계산기 열기", key: "open_calc" }
          ],
          content: (
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-xl shadow-sm">
                <p className="font-bold text-sm mb-1">🤝 청소년근로권익센터 ONE-STOP 서비스</p>
                <p className="text-xs text-blue-100 leading-relaxed">
                  노동 상담부터 권리구제(노무사 무료 대리)까지 전 과정을 든든하게 도와드립니다!
                </p>
              </div>

              <div className="bg-slate-100 p-2.5 rounded-xl space-y-1.5 text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="font-bold">☎️ 전화 상담</span>
                  <span className="font-bold text-blue-700">1644-3119</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>⏰ 운영 시간</span>
                  <span className="text-slate-600">평일 09:00 ~ 18:00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>💬 카카오톡 상담</span>
                  <span className="text-amber-600 font-semibold">카톡 플러스친구 지원</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🏫 찾아가는 노동인권교육</span>
                  <span className="text-slate-600">02-6293-6110</span>
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
      setIsContractImgOpen(true);
      return;
    }
    if (key === "welcome") {
      restartChat();
      return;
    }

    let queryKey = key;
    if (key.startsWith("quick_")) {
      const mapping: Record<string, string> = {
        quick_contract: "contract",
        quick_wage: "wage",
        quick_hours: "hours",
        quick_allowance: "allowance",
        quick_rights: "rights_protect",
        quick_counseling: "counseling"
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

    if (lower.includes("계약서") || lower.includes("근로계약") || lower.includes("작성") || lower.includes("벌금") || lower.includes("양식") || lower.includes("서식")) {
      matchedKey = "contract";
    } else if (lower.includes("나이") || lower.includes("연령") || lower.includes("몇살") || lower.includes("부모님동의") || lower.includes("인허증") || lower.includes("유흥") || lower.includes("노래방") || lower.includes("장소")) {
      matchedKey = "age_places";
    } else if (lower.includes("최저") || lower.includes("시급") || lower.includes("수습") || lower.includes("단순노무") || lower.includes("명세서") || lower.includes("임금")) {
      matchedKey = "wage";
    } else if (lower.includes("주휴") || lower.includes("유급휴일") || lower.includes("개근") || lower.includes("15시간")) {
      matchedKey = "weekly_holiday";
    } else if (lower.includes("야간") || lower.includes("연장") || lower.includes("가산") || lower.includes("휴업") || lower.includes("초과")) {
      matchedKey = "allowance";
    } else if (lower.includes("근로시간") || lower.includes("시간") || lower.includes("휴게") || lower.includes("쉬는시간") || lower.includes("대기")) {
      matchedKey = "hours";
    } else if (lower.includes("휴가") || lower.includes("연차") || lower.includes("빨간날") || lower.includes("노동절") || lower.includes("근로자의날")) {
      matchedKey = "holidays";
    } else if (lower.includes("해고") || lower.includes("잘림") || lower.includes("산재") || lower.includes("다쳤") || lower.includes("괴롭힘") || lower.includes("성희롱") || lower.includes("퇴직금")) {
      matchedKey = "rights_protect";
    } else if (lower.includes("상담") || lower.includes("신고") || lower.includes("전화") || lower.includes("도움") || lower.includes("노무사") || lower.includes("센터") || lower.includes("번호")) {
      matchedKey = "counseling";
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
            &quot;<strong>{text}</strong>&quot; 관련 내용을 가이드에서 찾아보실 수 있도록 주요 메뉴를 안내해 드립니다.
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <button onClick={() => handleUserSelect("contract")} className="bg-slate-100 hover:bg-slate-200 text-left p-2 rounded-lg font-medium text-slate-800 cursor-pointer">📄 01. 근로계약서</button>
            <button onClick={() => handleUserSelect("age_places")} className="bg-slate-100 hover:bg-slate-200 text-left p-2 rounded-lg font-medium text-slate-800 cursor-pointer">🪪 02. 연령 및 장소</button>
            <button onClick={() => handleUserSelect("wage")} className="bg-slate-100 hover:bg-slate-200 text-left p-2 rounded-lg font-medium text-slate-800 cursor-pointer">💵 04. 최저임금 원칙</button>
            <button onClick={() => handleUserSelect("weekly_holiday")} className="bg-slate-100 hover:bg-slate-200 text-left p-2 rounded-lg font-medium text-slate-800 cursor-pointer">🎁 05. 주휴수당</button>
            <button onClick={() => handleUserSelect("allowance")} className="bg-slate-100 hover:bg-slate-200 text-left p-2 rounded-lg font-medium text-slate-800 cursor-pointer">🌙 06. 가산수당</button>
            <button onClick={() => handleUserSelect("hours")} className="bg-slate-100 hover:bg-slate-200 text-left p-2 rounded-lg font-medium text-slate-800 cursor-pointer">⏰ 08. 근로·휴게시간</button>
            <button onClick={() => handleUserSelect("rights_protect")} className="bg-slate-100 hover:bg-slate-200 text-left p-2 rounded-lg font-medium text-slate-800 cursor-pointer">🛡️ 10-13. 권리보호</button>
            <button onClick={() => handleUserSelect("counseling")} className="bg-amber-100 hover:bg-amber-200 text-left p-2 rounded-lg font-bold text-amber-900 cursor-pointer">☎️ 1:1 권익상담</button>
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
        { label: "🎁 주휴수당 상세규정", key: "weekly_holiday" },
        { label: "📞 공인노무사 상담받기", key: "counseling" }
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
      
      {/* Mobile Chat Wrapper (HTML 원안 디자인 복원) */}
      <div className="w-full max-w-md h-[100dvh] sm:h-[90vh] sm:max-h-[860px] bg-slate-100 flex flex-col sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-700/30 relative">
        
        {/* Top Header Bar */}
        <header className="bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between z-20 shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-400 p-[2px] shadow-sm">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-blue-600 text-lg font-black">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-slate-900 text-sm">청소년 노동인권 지킴이</h1>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">공인노무사회</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">청소년근로권익센터 1:1 맞춤 챗봇</p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setIsCalcOpen(true)} 
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition text-sm cursor-pointer" 
              title="주휴/알바비 계산기"
            >
              <Calculator className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsHelpOpen(true)} 
              className="p-2 text-rose-500 hover:bg-rose-50 rounded-full transition text-sm font-bold cursor-pointer" 
              title="권익센터 긴급상담"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button 
              onClick={restartChat} 
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition text-sm cursor-pointer" 
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
              onClick={() => handleUserSelect("quick_contract")} 
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 hover:border-amber-300 transition shrink-0 flex items-center gap-1 cursor-pointer"
            >
              📝 근로계약서
            </button>
            <button 
              onClick={() => handleUserSelect("quick_wage")} 
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-900 border border-slate-200 hover:border-blue-300 transition shrink-0 flex items-center gap-1 cursor-pointer"
            >
              💰 최저임금·주휴수당
            </button>
            <button 
              onClick={() => handleUserSelect("quick_hours")} 
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 transition shrink-0 flex items-center gap-1 cursor-pointer"
            >
              ⏰ 근로·휴게시간
            </button>
            <button 
              onClick={() => handleUserSelect("quick_allowance")} 
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-900 border border-slate-200 hover:border-purple-300 transition shrink-0 flex items-center gap-1 cursor-pointer"
            >
              ➕ 야간/연장 가산수당
            </button>
            <button 
              onClick={() => handleUserSelect("quick_rights")} 
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-900 border border-slate-200 hover:border-rose-300 transition shrink-0 flex items-center gap-1 cursor-pointer"
            >
              🛡️ 해고·산재·괴롭힘
            </button>
            <button 
              onClick={() => handleUserSelect("quick_counseling")} 
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
                placeholder="궁금한 내용을 질문해보세요 (예: 주휴수당, 해고, 야간)" 
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

      {/* Contract Image Full Modal */}
      {isContractImgOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white w-full max-w-xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm sm:text-base">
                <FileText className="w-5 h-5 text-blue-600" /> 연소근로자(18세 미만) 표준근로계약서 서식
              </h3>
              <div className="flex items-center gap-2">
                <a 
                  href="/labor-contract.png" 
                  download="연소근로자_표준근로계약서.png"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-200 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                  title="이미지 다운로드"
                >
                  <Download className="w-4 h-4" /> 저장
                </a>
                <button 
                  onClick={() => setIsContractImgOpen(false)} 
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition text-base cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-slate-100 flex justify-center items-start">
              <img 
                src="/labor-contract.png" 
                alt="연소근로자(18세 미만인 자) 표준근로계약서 양식" 
                className="max-w-full h-auto rounded-lg shadow-md border border-slate-200"
              />
            </div>

            <div className="p-3 bg-white border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setIsContractImgOpen(false)} 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition cursor-pointer shadow-xs"
              >
                확인 완료
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
