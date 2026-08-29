"use client";

import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  UserCheck, 
  UserX, 
  RotateCcw, 
  Copy, 
  Trash2, 
  School, 
  Users, 
  Award, 
  Dice5, 
  Check, 
  X, 
  AlertTriangle,
  UserPlus
} from "lucide-react";

// --- TYPES & ROSTER DATABASE ---

interface ClassRoster {
  max: number;
  autoAbsent?: number[];
  names: Record<number, string>;
}

interface GradeRosters {
  [classNum: number]: ClassRoster;
}

interface RosterDB {
  [gradeNum: number]: GradeRosters;
}

const ROSTER_DATABASE: RosterDB = {
  1: {
    1: { max: 27, names: {1:"견민준", 2:"김래영", 3:"김유성", 4:"김지호", 5:"김한슬", 6:"김현겸", 7:"노혜미", 8:"문채윤", 9:"박보경", 10:"박혜원", 11:"백지혁", 12:"서윤지", 13:"오시은", 14:"윤건", 15:"이다영", 16:"이림", 17:"이시온", 18:"이준혁", 19:"장서이", 20:"장원진", 21:"정윤수", 22:"주서연", 23:"최보경", 24:"최희윤", 25:"추연서", 26:"황시현", 27:"박하율"} },
    2: { max: 27, names: {1:"곽지훈", 2:"김경훈", 3:"김규언", 4:"김세환", 5:"김아윤", 6:"김은찬", 7:"김주호", 8:"김지윤", 9:"문규린", 10:"박소유", 11:"백영준", 12:"신재민", 13:"심예은", 14:"안소연", 15:"윤수빈", 16:"윤예서", 17:"이상윤", 18:"이서연", 19:"임미래", 20:"임우담", 21:"장수정", 22:"전하유", 23:"정지아", 24:"조은후", 25:"최시은", 26:"최연우", 27:"차하람"} },
    3: { max: 28, names: {1:"강재구", 2:"곽예은", 3:"김가온", 4:"김건일", 5:"김나윤", 6:"김동하", 7:"김예담", 8:"김예은", 9:"김하나", 10:"김하율", 11:"남혜준", 12:"박시은", 13:"박시현", 14:"박연주", 15:"방시효", 16:"양지혁", 18:"이아빈", 19:"이지혁", 20:"이하은", 21:"장빛나", 22:"전세희", 23:"전형준", 24:"정유찬", 25:"정지운", 26:"정하음", 27:"추승윤", 28:"이혜민"} },
    4: { max: 27, autoAbsent: [20], names: {1:"강예찬", 2:"곽채윤", 3:"김나희", 4:"김다민", 5:"김다은", 6:"김민주", 7:"김서울", 8:"김서하", 9:"김유건", 10:"김은슬", 11:"김지원", 12:"김현준", 13:"나민준", 14:"류시원", 15:"박광민", 16:"배재민", 17:"서재이", 18:"성하율", 19:"이다빈", 20:"전출", 21:"전지웅", 22:"정이현", 23:"차수현", 24:"차윤우", 25:"채율", 26:"최민아", 27:"최혜슬"} },
    5: { max: 27, names: {1:"강민결", 2:"곽채아", 3:"국현", 4:"김아은", 5:"김윤아", 6:"명도환", 7:"박서영", 8:"박성민", 9:"박세진", 10:"박효주", 11:"백서준", 12:"서유나", 13:"양지유", 14:"유서현", 15:"유주원", 16:"유현진", 17:"이보나", 18:"이아린", 19:"이여진", 20:"이예지", 21:"이지아", 22:"이지한", 23:"장주하", 24:"장하율", 25:"차형진", 26:"홍유찬", 27:"황지우"} }
  },
  3: {
    1: { max: 25, names: {1:"강리운", 2:"강인혜", 3:"김도영", 4:"김수호", 5:"김우재", 6:"박예은", 7:"박채빈", 8:"서정원", 9:"서지우", 10:"성율아", 11:"양희수", 12:"우주영", 13:"유민준", 14:"유원민", 15:"이채아", 16:"이태리", 17:"임다윤", 18:"장한별", 19:"전경준", 20:"정민우", 21:"정우빈", 22:"조준휘", 23:"탁연서", 24:"황라윤", 25:"박은률"} },
    2: { max: 24, names: {1:"강윤서", 2:"권진수", 3:"김다빈", 4:"김도연", 5:"김도윤", 6:"김민호", 7:"김슬현", 8:"김아윤", 9:"김하린", 10:"김한들", 11:"문지우", 12:"박은솔", 13:"유선율", 14:"유지수", 15:"은희우", 16:"이기창", 17:"이지민", 18:"이하영", 19:"임우건", 20:"정동준", 21:"주시후", 22:"최민지", 23:"최회준", 24:"홍채원"} },
    3: { max: 24, names: {1:"구윤지", 2:"김남우", 3:"김시현", 4:"김준한", 5:"김지한", 6:"김찬휘", 7:"김태희", 8:"박유이", 9:"박준표", 10:"방예은", 11:"방희원", 12:"배민서", 13:"백지헌", 14:"서현서", 15:"위채은", 16:"유우성", 17:"윤나현", 18:"이도헌", 19:"이라운", 20:"이승조", 21:"임건율", 22:"정지율", 23:"정혜원", 24:"최여은"} }
  }
};

interface DrawnItem {
  number: number;
  order: number;
  name: string;
  timestamp: string;
}

interface ToastMessage {
  id: number;
  message: string;
  type: "info" | "success" | "warning";
}

let toastSeq = 1;

// Sound Synthesizers declared outside component for purity
function playTickSound(soundEnabled: boolean, audioCtxRef: React.RefObject<AudioContext | null>) {
  if (!soundEnabled) return;
  try {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(400 + Math.random() * 200, ctx.currentTime);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Audio fallback
  }
}

function playFanfareSound(soundEnabled: boolean, audioCtxRef: React.RefObject<AudioContext | null>) {
  if (!soundEnabled) return;
  try {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.3);
    });
  } catch {
    // Audio fallback
  }
}

function getRandomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function getRandomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function SocialPresentationPicker() {
  // Config & Selection states
  const [selectedGrade, setSelectedGrade] = useState<string>("custom");
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [maxNumber, setMaxNumber] = useState<number>(30);
  const [tempMaxInput, setTempMaxInput] = useState<string>("30");
  
  // Roster maps & Lists
  const [studentNamesMap, setStudentNamesMap] = useState<Record<number, string>>({});
  const [absentList, setAbsentList] = useState<Set<number>>(new Set());
  const [drawnList, setDrawnList] = useState<DrawnItem[]>([]);

  // Wheel Animation states
  const [displayNumber, setDisplayNumber] = useState<string | number>("?");
  const [displayName, setDisplayName] = useState<string>("준비 버튼을 누르세요");
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals
  const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(false);
  const [isAbsentModalOpen, setIsAbsentModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    message: string;
    actionText: string;
    isDanger: boolean;
    onConfirm: () => void;
  }>({ title: "", message: "", actionText: "", isDanger: false, onConfirm: () => {} });

  const [textareaNamesText, setTextareaNamesText] = useState<string>("");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Web Audio Context ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Helper Toast
  const addToast = (message: string, type: "info" | "success" | "warning" = "info") => {
    const id = toastSeq++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Grade Change Handler
  const handleGradeChange = (gradeVal: string) => {
    setSelectedGrade(gradeVal);
    if (gradeVal === "custom") {
      setSelectedClass(null);
    } else {
      const gNum = parseInt(gradeVal, 10);
      if (ROSTER_DATABASE[gNum]?.[1]) {
        selectClass(gNum, 1);
      }
    }
  };

  const selectClass = (gNum: number, cNum: number) => {
    setSelectedGrade(String(gNum));
    setSelectedClass(cNum);

    const classData = ROSTER_DATABASE[gNum]?.[cNum];
    if (classData) {
      setMaxNumber(classData.max);
      setTempMaxInput(String(classData.max));
      setStudentNamesMap({ ...classData.names });

      const newAbsent = new Set<number>();
      if (classData.autoAbsent) {
        classData.autoAbsent.forEach((n) => newAbsent.add(n));
      }
      setAbsentList(newAbsent);
      setDrawnList([]);
      setDisplayNumber("?");
      setDisplayName("준비 버튼을 누르세요");

      addToast(`${gNum}학년 ${cNum}반 명렬표가 자동 적용되었습니다!`, "success");
    }
  };

  // Max Number Update
  const handleApplyMaxNumber = () => {
    let val = parseInt(tempMaxInput, 10);
    if (isNaN(val) || val < 2) val = 2;
    if (val > 100) val = 100;

    setMaxNumber(val);
    setTempMaxInput(String(val));
    setDrawnList((prev) => prev.filter((item) => item.number <= val));
    setAbsentList((prev) => {
      const updated = new Set(prev);
      updated.forEach((num) => {
        if (num > val) updated.delete(num);
      });
      return updated;
    });

    addToast(`${val}번까지 학급 인원이 적용되었습니다.`, "info");
  };

  // Remaining calculation
  const getRemainingNumbers = () => {
    const drawnSet = new Set(drawnList.map((i) => i.number));
    const remaining: number[] = [];
    for (let i = 1; i <= maxNumber; i++) {
      if (!drawnSet.has(i) && !absentList.has(i)) {
        remaining.push(i);
      }
    }
    return remaining;
  };

  // Drawing Slot Spin Engine
  const startDraw = () => {
    if (isSpinning) return;

    const remaining = getRemainingNumbers();
    if (remaining.length === 0) {
      addToast("🎉 모든 학생의 추첨이 완료되었습니다! 목록을 비우거나 초기화 후 시작하세요.", "warning");
      return;
    }

    setIsSpinning(true);

    let speed = 50;
    let counter = 0;
    const totalTicks = getRandomInt(28, 35);

    const spinStep = () => {
      const previewNum = getRandomChoice(remaining);

      setDisplayNumber(previewNum);
      setDisplayName(studentNamesMap[previewNum] || `${previewNum}번 학생`);
      playTickSound(soundEnabled, audioCtxRef);

      counter++;
      if (counter < totalTicks) {
        if (counter > totalTicks - 10) speed += 25;
        else if (counter > totalTicks - 5) speed += 60;
        setTimeout(spinStep, speed);
      } else {
        finalizeDraw(remaining);
      }
    };

    spinStep();
  };

  const finalizeDraw = (remainingPool: number[]) => {
    const winnerNum = getRandomChoice(remainingPool);

    const newItem: DrawnItem = {
      number: winnerNum,
      order: drawnList.length + 1,
      name: studentNamesMap[winnerNum] || `${winnerNum}번 학생`,
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
    };

    setDrawnList((prev) => [newItem, ...prev]);
    setDisplayNumber(winnerNum);
    setDisplayName(newItem.name);

    playFanfareSound(soundEnabled, audioCtxRef);
    
    // Confetti effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#a855f7", "#ec4899", "#f59e0b", "#10b981"]
    });

    setIsSpinning(false);
  };

  // Return single drawn student
  const removeSingleDrawn = (num: number) => {
    setDrawnList((prev) => {
      const filtered = prev.filter((item) => item.number !== num);
      return filtered.map((item, idx) => ({
        ...item,
        order: filtered.length - idx
      }));
    });
    addToast(`${num}번 학생을 다시 추첨 대상으로 변경했습니다.`, "info");
  };

  // Absent toggle
  const toggleSingleAbsent = (num: number) => {
    setAbsentList((prev) => {
      const updated = new Set(prev);
      if (updated.has(num)) {
        updated.delete(num);
      } else {
        updated.add(num);
      }
      return updated;
    });
  };

  // Name Modal save
  const handleOpenNameModal = () => {
    const lines: string[] = [];
    for (let i = 1; i <= maxNumber; i++) {
      lines.push(studentNamesMap[i] || "");
    }
    setTextareaNamesText(lines.join("\n"));
    setIsNameModalOpen(true);
  };

  const handleSaveStudentNames = () => {
    const lines = textareaNamesText.split("\n");
    const newMap: Record<number, string> = {};
    lines.forEach((n, idx) => {
      const trimmed = n.trim();
      if (trimmed && idx < 100) {
        newMap[idx + 1] = trimmed;
      }
    });

    setStudentNamesMap(newMap);
    setIsNameModalOpen(false);

    if (typeof displayNumber === "number") {
      setDisplayName(newMap[displayNumber] || `${displayNumber}번 학생`);
    }

    addToast("학생 명단이 저장되었습니다!", "success");
  };

  // Export History
  const handleExportHistory = () => {
    if (drawnList.length === 0) {
      addToast("복사할 발표 내역이 아직 없습니다.", "warning");
      return;
    }

    const headerTitle = selectedGrade !== "custom" && selectedClass
      ? `[${selectedGrade}학년 ${selectedClass}반 사회 수업 발표 순서]`
      : `[사회 수업 발표 순서]`;

    const copyText = drawnList
      .slice()
      .reverse()
      .map((item) => `${item.order}순서: ${item.number}번 ${studentNamesMap[item.number] || ""}`)
      .join("\n");

    navigator.clipboard.writeText(`${headerTitle}\n${copyText}`).then(() => {
      addToast("📋 발표 순서가 클립보드에 복사되었습니다!", "success");
    });
  };

  // Confirm Reset Drawn Only
  const handleConfirmResetDrawnOnly = () => {
    if (drawnList.length === 0) {
      addToast("비울 추첨 기록이 없습니다.", "warning");
      return;
    }

    setConfirmConfig({
      title: "이미 뽑힌 목록 비우기",
      message: "이미 추첨된 발표자 목록을 비우시겠습니까?<br/><strong>모든 학생이 다시 추첨 대상</strong>이 됩니다.",
      actionText: "목록 비우기",
      isDanger: true,
      onConfirm: () => {
        setDrawnList([]);
        setDisplayNumber("?");
        setDisplayName("준비 버튼을 누르세요");
        addToast("추첨된 번호 목록을 깨끗하게 비웠습니다.", "success");
      }
    });
    setIsConfirmModalOpen(true);
  };

  // Confirm Reset All
  const handleConfirmResetAll = () => {
    setConfirmConfig({
      title: "전체 설정 초기화",
      message: "전체 설정을 완전히 초기화하시겠습니까?<br/><span class='text-rose-600 font-bold'>모든 추첨 기록, 학년/반 지정, 결석자 설정, 학생 이름 명단</span>이 완전 삭제됩니다.",
      actionText: "전체 초기화",
      isDanger: true,
      onConfirm: () => {
        setDrawnList([]);
        setAbsentList(new Set());
        setStudentNamesMap({});
        setMaxNumber(30);
        setTempMaxInput("30");
        setSelectedGrade("custom");
        setSelectedClass(null);
        setDisplayNumber("?");
        setDisplayName("준비 버튼을 누르세요");
        addToast("모든 설정과 데이터가 초기화되었습니다.", "success");
      }
    });
    setIsConfirmModalOpen(true);
  };

  const remainingNumbers = getRemainingNumbers();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-fadeIn">
      
      {/* Toast Alert Notifications */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`p-3.5 rounded-2xl shadow-xl font-extrabold text-xs flex items-center gap-2.5 animate-slideUp pointer-events-auto ${
              t.type === "success"
                ? "bg-emerald-600 text-white"
                : t.type === "warning"
                ? "bg-amber-500 text-white"
                : "bg-slate-900 text-white"
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Header Bar */}
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="bg-amber-400 text-slate-900 font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border-2 border-white">
            <School className="w-3.5 h-3.5 text-emerald-800" />
            <span>즐거운 사회 수업</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              발표자 랜덤 뽑기
            </span>
            <span>🎯</span>
          </h1>
        </div>

        {/* Utilities */}
        <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>소리 켜짐</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span>소리 끔</span>
              </>
            )}
          </button>

          <div className="h-4 w-px bg-slate-200" />

          <button
            onClick={handleOpenNameModal}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5 text-purple-500" />
            <span>학생 이름 명단</span>
          </button>

          <div className="h-4 w-px bg-slate-200" />

          <button
            onClick={handleConfirmResetAll}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>초기화</span>
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left & Center Stage (8 Cols) */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Controls Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col gap-4">
            
            {/* Grade / Class Selection */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg font-bold shrink-0">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>학년 / 반 선택</span>
                    <span className="text-[11px] font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">(자동 명렬표)</span>
                  </h2>
                  <p className="text-xs text-slate-500">학년과 반을 선택하면 학생 명단이 자동으로 설정됩니다.</p>
                </div>
              </div>

              {/* Selectors */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
                <select
                  value={selectedGrade}
                  onChange={(e) => handleGradeChange(e.target.value)}
                  className="px-3.5 py-2 bg-slate-50 rounded-xl text-xs font-extrabold text-slate-800 shadow-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                  <option value="custom">⚙️ 직접 설정 (선택 안함)</option>
                  <option value="1">1학년 (1~5반)</option>
                  <option value="3">3학년 (1~3반)</option>
                </select>

                {selectedGrade !== "custom" && ROSTER_DATABASE[parseInt(selectedGrade, 10)] && (
                  <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
                    {Object.keys(ROSTER_DATABASE[parseInt(selectedGrade, 10)]).map((clsStr) => {
                      const cNum = parseInt(clsStr, 10);
                      const isSelected = selectedClass === cNum;
                      return (
                        <button
                          key={cNum}
                          onClick={() => selectClass(parseInt(selectedGrade, 10), cNum)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-purple-600 text-white shadow-md scale-105"
                              : "bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-600 border border-slate-200"
                          }`}
                        >
                          {cNum}반
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Max Number Range Settings */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg font-bold shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">학급 인원 (번호 범위)</h2>
                  <p className="text-xs text-slate-500">
                    {selectedGrade !== "custom" && selectedClass
                      ? `${selectedGrade}학년 ${selectedClass}반 명렬표가 자동 연동되었습니다.`
                      : "오늘 수업에 참여하는 전체 인원수를 지정하세요."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-100/80 p-2 rounded-2xl border border-slate-200/60 self-start sm:self-auto">
                <span className="text-xs font-bold text-slate-500 pl-2">1번 ~</span>
                <input
                  type="number"
                  min={2}
                  max={100}
                  value={tempMaxInput}
                  onChange={(e) => setTempMaxInput(e.target.value)}
                  className="w-20 sm:w-24 px-3 py-2 bg-white rounded-xl text-center font-extrabold text-slate-900 text-lg shadow-inner border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-xs font-bold text-slate-500 pr-1">번</span>
                <button
                  onClick={handleApplyMaxNumber}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  적용
                </button>
              </div>
            </div>

            {/* Counter Stats Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between text-xs font-medium gap-2 border-t border-slate-100">
              <div className="flex items-center gap-4 text-slate-600 flex-wrap">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  전체: <strong className="text-slate-900 font-extrabold">{maxNumber}</strong>명
                </span>
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                  추첨 완료: <strong className="text-indigo-600 font-extrabold">{drawnList.length}</strong>명
                </span>
                <span className="flex items-center gap-1">
                  <UserX className="w-3.5 h-3.5 text-amber-500" />
                  남은 인원: <strong className="text-emerald-600 font-extrabold">{remainingNumbers.length}</strong>명
                </span>
              </div>

              <button
                onClick={() => setIsAbsentModalOpen(true)}
                className="text-xs text-slate-500 hover:text-indigo-600 underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <UserX className="w-3.5 h-3.5" />
                <span>결석자 제외 설정 ({absentList.size}명)</span>
              </button>
            </div>

          </div>

          {/* Spinner Stage Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[380px] border-2 border-indigo-100/80 shadow-md">
            
            {/* Background Glows */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

            {/* Tag Badge */}
            <div className="absolute top-5 left-5 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-xs flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>
                {selectedGrade !== "custom" && selectedClass
                  ? `${selectedGrade}-${selectedClass}반 `
                  : ""}
                {drawnList.length === 0
                  ? "첫 번째 발표자는?"
                  : `다음 발표자 (${drawnList.length + 1}번째)`}
              </span>
            </div>

            {/* Wheel Slot */}
            <div className="my-6 relative">
              <div
                className={`w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-white via-indigo-50/50 to-purple-50 shadow-2xl flex flex-col items-center justify-center border-4 border-white relative overflow-hidden transition-all duration-300 ${
                  isSpinning ? "scale-105 border-purple-400" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-full border-4 transition-all ${
                    isSpinning ? "border-purple-500 animate-pulse" : "border-indigo-200/40"
                  }`}
                />

                <span className="font-extrabold text-7xl sm:text-8xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent transition-all">
                  {displayNumber}
                </span>

                <span className="font-bold text-slate-700 text-sm sm:text-base mt-2 px-4 py-1 rounded-full bg-white/90 shadow-xs border border-slate-100 max-w-[85%] truncate">
                  {displayName}
                </span>
              </div>
            </div>

            {/* Draw Button */}
            <div className="w-full max-w-xs mt-2">
              <button
                disabled={isSpinning}
                onClick={startDraw}
                className={`w-full py-4 px-8 rounded-2xl text-white font-black text-xl tracking-wide shadow-lg flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer ${
                  isSpinning
                    ? "bg-slate-400 cursor-not-allowed opacity-80"
                    : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:scale-[1.02] active:scale-[0.98] shadow-purple-500/25"
                }`}
              >
                <Dice5 className={`w-6 h-6 ${isSpinning ? "animate-spin" : ""}`} />
                <span>{isSpinning ? "추첨 진행 중..." : "발표자 추첨 시작!"}</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-4 font-medium">
              * 한 번 뽑힌 번호는 다시 나오지 않도록 자동 제외됩니다.
            </p>

          </div>

        </section>

        {/* Right Panel: History List (4 Cols) */}
        <section className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm h-full flex flex-col min-h-[500px]">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">이미 나온 번호</h3>
                  <p className="text-[11px] text-slate-400">자동 제외된 발표자 목록입니다.</p>
                </div>
              </div>

              <span className="bg-indigo-100 text-indigo-700 font-extrabold text-xs px-2.5 py-1 rounded-full">
                {drawnList.length}명
              </span>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto max-h-[460px] pr-1 space-y-2">
              {drawnList.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-slate-400">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl mb-3 text-slate-300">
                    🎯
                  </div>
                  <p className="text-xs font-semibold text-slate-500">아직 당첨된 번호가 없습니다.</p>
                  <p className="text-[11px] text-slate-400 mt-1">추첨 시작 버튼을 눌러보세요!</p>
                </div>
              ) : (
                drawnList.map((item) => (
                  <div
                    key={item.number}
                    className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-purple-300 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                        #{item.order}
                      </span>
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                          <span>{item.number}번</span>
                          {studentNamesMap[item.number] && (
                            <span className="text-xs font-semibold text-slate-500">
                              ({studentNamesMap[item.number]})
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {item.timestamp} 추첨
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeSingleDrawn(item.number)}
                      title="이 학생을 다시 추첨 대상으로 변경"
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between text-xs">
              <button
                onClick={handleExportHistory}
                className="text-slate-600 hover:text-indigo-600 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>순서 복사하기</span>
              </button>

              <button
                onClick={handleConfirmResetDrawnOnly}
                className="text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>목록만 비우기</span>
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* MODAL 1: Confirmation Dialog */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-fadeIn space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0 ${
                  confirmConfig.isDanger
                    ? "bg-rose-100 text-rose-600"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{confirmConfig.title}</h3>
            </div>

            <p
              className="text-xs text-slate-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: confirmConfig.message }}
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={() => {
                  confirmConfig.onConfirm();
                  setIsConfirmModalOpen(false);
                }}
                className={`px-5 py-2.5 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer ${
                  confirmConfig.isDanger
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {confirmConfig.actionText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Student Name Register */}
      {isNameModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  <UserPlus className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">학생 이름 등록 (수동 편집)</h3>
              </div>
              <button
                onClick={() => setIsNameModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              줄바꿈으로 번호 순서대로 학생 이름을 붙여넣기하세요.<br />
              (예: 1번째 줄 = 1번 학생 이름, 2번째 줄 = 2번 학생 이름)
            </p>

            <textarea
              rows={8}
              value={textareaNamesText}
              onChange={(e) => setTextareaNamesText(e.target.value)}
              placeholder="김철수&#10;이영희&#10;박민수&#10;..."
              className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsNameModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={handleSaveStudentNames}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Absent Student Selector */}
      {isAbsentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                  <UserX className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">결석 학생 제외</h3>
              </div>
              <button
                onClick={() => setIsAbsentModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              오늘 수업에 결석하거나 추첨에서 제외할 번호를 클릭하세요.
            </p>

            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-60 overflow-y-auto p-1">
              {Array.from({ length: maxNumber }, (_, i) => i + 1).map((num) => {
                const isAbsent = absentList.has(num);
                const sName = studentNamesMap[num];
                return (
                  <button
                    key={num}
                    onClick={() => toggleSingleAbsent(num)}
                    className={`py-2 rounded-xl font-extrabold text-xs transition-all border flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                      isAbsent
                        ? "bg-rose-100 text-rose-600 border-rose-300 line-through"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>{num}번</span>
                    {sName && (
                      <span className="text-[10px] font-normal opacity-80 truncate max-w-[90%]">
                        {sName}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsAbsentModalOpen(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>확인 완료</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer info */}
      <footer className="text-center text-xs text-slate-400 py-4 border-t border-slate-200">
        <p>🎯 즐거운 사회 수업 발표자 추첨기 | 수연쌤의 아카데미</p>
      </footer>

    </div>
  );
}
