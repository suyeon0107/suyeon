"use client";

import React, { useState } from "react";
import { 
  Search, 
  Calendar, 
  User, 
  CheckSquare, 
  Square, 
  Sparkles, 
  RotateCcw, 
  ChevronRight, 
  ChevronDown,
  FileText, 
  History,
  Edit3,
  Check,
  Trash2
} from "lucide-react";

// --- ROSTER DATA STRUCTURE ---
interface ClassInfo {
  key: string; // e.g. "1-1", "1-2"
  grade: number;
  classNum: number;
  count: number;
  color: string;
  badgeBg: string;
  badgeText: string;
  names: Record<number, string>;
}

const CLASS_LIST: ClassInfo[] = [
  {
    key: "1-1", grade: 1, classNum: 1, count: 27, color: "#8b5cf6",
    badgeBg: "bg-purple-100 text-purple-700 border-purple-200",
    badgeText: "purple",
    names: {1:"견민준", 2:"김래영", 3:"김유성", 4:"김지호", 5:"김한슬", 6:"김현겸", 7:"노혜미", 8:"문채윤", 9:"박보경", 10:"박혜원", 11:"백지혁", 12:"서윤지", 13:"오시은", 14:"윤건", 15:"이다영", 16:"이림", 17:"이시온", 18:"이준혁", 19:"장서이", 20:"장원진", 21:"정윤수", 22:"주서연", 23:"최보경", 24:"최희윤", 25:"추연서", 26:"황시현", 27:"박하율"}
  },
  {
    key: "1-2", grade: 1, classNum: 2, count: 27, color: "#0284c7",
    badgeBg: "bg-sky-100 text-sky-700 border-sky-200",
    badgeText: "sky",
    names: {1:"곽지훈", 2:"김경훈", 3:"김규언", 4:"김세환", 5:"김아윤", 6:"김은찬", 7:"김주호", 8:"김지윤", 9:"문규린", 10:"박소유", 11:"백영준", 12:"신재민", 13:"심예은", 14:"안소연", 15:"윤수빈", 16:"윤예서", 17:"이상윤", 18:"이서연", 19:"임미래", 20:"임우담", 21:"장수정", 22:"전하유", 23:"정지아", 24:"조은후", 25:"최시은", 26:"최연우", 27:"차하람"}
  },
  {
    key: "1-3", grade: 1, classNum: 3, count: 27, color: "#10b981",
    badgeBg: "bg-emerald-100 text-emerald-700 border-emerald-200",
    badgeText: "emerald",
    names: {1:"강재구", 2:"곽예은", 3:"김가온", 4:"김건일", 5:"김나윤", 6:"김동하", 7:"김예담", 8:"김예은", 9:"김하나", 10:"김하율", 11:"남혜준", 12:"박시은", 13:"박시현", 14:"박연주", 15:"방시효", 16:"양지혁", 18:"이아빈", 19:"이지혁", 20:"이하은", 21:"장빛나", 22:"전세희", 23:"전형준", 24:"정유찬", 25:"정지운", 26:"정하음", 27:"추승윤", 28:"이혜민"}
  },
  {
    key: "1-4", grade: 1, classNum: 4, count: 26, color: "#f59e0b",
    badgeBg: "bg-amber-100 text-amber-700 border-amber-200",
    badgeText: "amber",
    names: {1:"강예찬", 2:"곽채윤", 3:"김나희", 4:"김다민", 5:"김다은", 6:"김민주", 7:"김서울", 8:"김서하", 9:"김유건", 10:"김은슬", 11:"김지원", 12:"김현준", 13:"나민준", 14:"류시원", 15:"박광민", 16:"배재민", 17:"서재이", 18:"성하율", 19:"이다빈", 20:"전출", 21:"전지웅", 22:"정이현", 23:"차수현", 24:"차윤우", 25:"채율", 26:"최민아", 27:"최혜슬"}
  },
  {
    key: "1-5", grade: 1, classNum: 5, count: 27, color: "#f43f5e",
    badgeBg: "bg-rose-100 text-rose-700 border-rose-200",
    badgeText: "rose",
    names: {1:"강민결", 2:"곽채아", 3:"국현", 4:"김아은", 5:"김윤아", 6:"명도환", 7:"박서영", 8:"박성민", 9:"박세진", 10:"박효주", 11:"백서준", 12:"서유나", 13:"양지유", 14:"유서현", 15:"유주원", 16:"유현진", 17:"이보나", 18:"이아린", 19:"이여진", 20:"이예지", 21:"이지아", 22:"이지한", 23:"장주하", 24:"장하율", 25:"차형진", 26:"홍유찬", 27:"황지우"}
  },
  {
    key: "3-1", grade: 3, classNum: 1, count: 25, color: "#2563eb",
    badgeBg: "bg-blue-100 text-blue-700 border-blue-200",
    badgeText: "blue",
    names: {1:"강리운", 2:"강인혜", 3:"김도영", 4:"김수호", 5:"김우재", 6:"박예은", 7:"박채빈", 8:"서정원", 9:"서지우", 10:"성율아", 11:"양희수", 12:"우주영", 13:"유민준", 14:"유원민", 15:"이채아", 16:"이태리", 17:"임다윤", 18:"장한별", 19:"전경준", 20:"정민우", 21:"정우빈", 22:"조준휘", 23:"탁연서", 24:"황라윤", 25:"박은률"}
  },
  {
    key: "3-2", grade: 3, classNum: 2, count: 24, color: "#7c3aed",
    badgeBg: "bg-purple-100 text-purple-700 border-purple-200",
    badgeText: "purple",
    names: {1:"강윤서", 2:"권진수", 3:"김다빈", 4:"김도연", 5:"김도윤", 6:"김민호", 7:"김슬현", 8:"김아윤", 9:"김하린", 10:"김한들", 11:"문지우", 12:"박은솔", 13:"유선율", 14:"유지수", 15:"은희우", 16:"이기창", 17:"이지민", 18:"이하영", 19:"임우건", 20:"정동준", 21:"주시후", 22:"최민지", 23:"최회준", 24:"홍채원"}
  },
  {
    key: "3-3", grade: 3, classNum: 3, count: 24, color: "#0d9488",
    badgeBg: "bg-teal-100 text-teal-700 border-teal-200",
    badgeText: "teal",
    names: {1:"구윤지", 2:"김남우", 3:"김시현", 4:"김준한", 5:"김지한", 6:"김찬휘", 7:"김태희", 8:"박유이", 9:"박준표", 10:"방예은", 11:"방희원", 12:"배민서", 13:"백지헌", 14:"서현서", 15:"위채은", 16:"유우성", 17:"윤나현", 18:"이도헌", 19:"이라운", 20:"이승조", 21:"임건율", 22:"정지율", 23:"정혜원", 24:"최여은"}
  }
];

// Activity record item schema
interface LogEntry {
  id: string;
  classKey: string;
  num: number;
  studentName: string;
  change: number; // e.g. +1, +2, -1
  reason: string;
  dateStr: string;
}

interface StudentScoreData {
  score: number;
  recordCount: number;
  latestReason: string;
}

type TabType = "summary" | "timeline" | "student";

let logIdCounter = 1;

export default function StudentActivityTracker() {
  const [selectedClassKey, setSelectedClassKey] = useState<string>("1-1");
  const [activeTab, setActiveTab] = useState<TabType>("summary");

  // Scores map: `1-1_1` -> StudentScoreData
  const [scoresMap, setScoresMap] = useState<Record<string, StudentScoreData>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const savedScores = localStorage.getItem("suyeon_activity_scores_v1");
      return savedScores ? JSON.parse(savedScores) : {};
    } catch {
      return {};
    }
  });

  // Log history list
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const savedLogs = localStorage.getItem("suyeon_activity_logs_v1");
      return savedLogs ? JSON.parse(savedLogs) : [];
    } catch {
      return [];
    }
  });

  // Teacher per-student memo map: `1-1_1` -> string
  const [memosMap, setMemosMap] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const savedMemos = localStorage.getItem("suyeon_activity_memos_v1");
      return savedMemos ? JSON.parse(savedMemos) : {};
    } catch {
      return {};
    }
  });

  // Class Progress Note Map per class: `1-1` -> "2p 형성 1번"
  const [progressNotesMap, setProgressNotesMap] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return { "1-1": "2p 형성 1번" };
    try {
      const savedProgress = localStorage.getItem("suyeon_class_progress_v1");
      return savedProgress ? JSON.parse(savedProgress) : { "1-1": "2p 형성 1번" };
    } catch {
      return { "1-1": "2p 형성 1번" };
    }
  });

  // Search & Sorting
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"num" | "score" | "name">("num");

  // Selection for batch actions
  const [selectedNums, setSelectedNums] = useState<Set<number>>(new Set());

  // Expanded student row number (for viewing timestamped history dropdown)
  const [expandedNum, setExpandedNum] = useState<number | null>(null);

  // Custom reason modal for single student
  const [customReasonModal, setCustomReasonModal] = useState<{ num: number; name: string; change: number } | null>(null);
  const [modalReasonText, setModalReasonText] = useState<string>("");

  // Detail Modal for single student history
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<{ num: number; name: string } | null>(null);

  // Get current class progress note
  const currentProgressNote = progressNotesMap[selectedClassKey] || "2p 형성 1번";

  // Update progress note for current class and save to LocalStorage
  const handleProgressNoteChange = (newText: string) => {
    const updated = { ...progressNotesMap, [selectedClassKey]: newText };
    setProgressNotesMap(updated);
    try {
      localStorage.setItem("suyeon_class_progress_v1", JSON.stringify(updated));
    } catch {
      // Fallback
    }
  };

  // Save to LocalStorage
  const saveCurrentData = (
    newScores: Record<string, StudentScoreData>, 
    newLogs: LogEntry[], 
    newMemos?: Record<string, string>
  ) => {
    setScoresMap(newScores);
    setLogs(newLogs);
    if (newMemos) setMemosMap(newMemos);

    try {
      localStorage.setItem("suyeon_activity_scores_v1", JSON.stringify(newScores));
      localStorage.setItem("suyeon_activity_logs_v1", JSON.stringify(newLogs));
      if (newMemos) localStorage.setItem("suyeon_activity_memos_v1", JSON.stringify(newMemos));
    } catch {
      // Fallback
    }
  };

  const currentClassObj = CLASS_LIST.find((c) => c.key === selectedClassKey) || CLASS_LIST[0];

  // Helper score getter
  const getStudentScoreData = (num: number): StudentScoreData => {
    const key = `${selectedClassKey}_${num}`;
    return scoresMap[key] || { score: 0, recordCount: 0, latestReason: "-" };
  };

  // Helper memo getter
  const getStudentMemo = (num: number): string => {
    const key = `${selectedClassKey}_${num}`;
    return memosMap[key] || "";
  };

  // Update memo function
  const handleMemoChange = (num: number, text: string) => {
    const key = `${selectedClassKey}_${num}`;
    const updated = { ...memosMap, [key]: text };
    setMemosMap(updated);
    try {
      localStorage.setItem("suyeon_activity_memos_v1", JSON.stringify(updated));
    } catch {
      // Fallback
    }
  };

  // Add Point Function (Supports -1, +1, custom change)
  const addPointToStudents = (nums: number[], changeVal: number, reasonText: string) => {
    if (nums.length === 0) return;

    const dateStr = new Date().toLocaleString("ko-KR", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const updatedScores = { ...scoresMap };
    const newLogsList: LogEntry[] = [...logs];

    const defaultReason = reasonText.trim() || (changeVal >= 0 ? `+${changeVal}점` : `${changeVal}점 (감점)`);

    nums.forEach((num) => {
      const key = `${selectedClassKey}_${num}`;
      const prev = updatedScores[key] || { score: 0, recordCount: 0, latestReason: "-" };
      const sName = currentClassObj.names[num] || `${num}번`;

      // Allow score to change dynamically (e.g. 2점 -> 1점 -> 0점)
      const newScore = Math.max(0, prev.score + changeVal);
      updatedScores[key] = {
        score: newScore,
        recordCount: prev.recordCount + 1,
        latestReason: defaultReason
      };

      newLogsList.unshift({
        id: `${Date.now()}_${logIdCounter++}_${num}`,
        classKey: selectedClassKey,
        num,
        studentName: sName,
        change: changeVal,
        reason: defaultReason,
        dateStr
      });
    });

    saveCurrentData(updatedScores, newLogsList);
  };

  // Delete Log Item Function (Reverts point & removes from history)
  const deleteLogItem = (logId: string) => {
    const targetLog = logs.find((l) => l.id === logId);
    if (!targetLog) return;

    if (!confirm(`[${targetLog.studentName}] 학생의 '${targetLog.reason}' (${targetLog.change >= 0 ? '+' : ''}${targetLog.change}점) 기록을 삭제하시겠습니까?`)) {
      return;
    }

    const newLogs = logs.filter((l) => l.id !== logId);
    const key = `${targetLog.classKey}_${targetLog.num}`;
    const prevScoreData = scoresMap[key] || { score: 0, recordCount: 0, latestReason: "-" };

    // Revert score by subtracting change value (e.g. subtracting +1 score drops score by 1; subtracting -1 score adds 1 back)
    const newScore = Math.max(0, prevScoreData.score - targetLog.change);

    const studentRemainingLogs = newLogs.filter(
      (l) => l.classKey === targetLog.classKey && l.num === targetLog.num
    );

    const updatedScores = {
      ...scoresMap,
      [key]: {
        score: newScore,
        recordCount: Math.max(0, prevScoreData.recordCount - 1),
        latestReason: studentRemainingLogs.length > 0 ? studentRemainingLogs[0].reason : "-"
      }
    };

    saveCurrentData(updatedScores, newLogs);
  };

  // Selection toggle
  const toggleSelectAll = () => {
    const allNums = Object.keys(currentClassObj.names).map(Number);
    if (selectedNums.size === allNums.length) {
      setSelectedNums(new Set());
    } else {
      setSelectedNums(new Set(allNums));
    }
  };

  const toggleSelectOne = (num: number) => {
    setSelectedNums((prev) => {
      const updated = new Set(prev);
      if (updated.has(num)) updated.delete(num);
      else updated.add(num);
      return updated;
    });
  };

  // Filter & Sort student list
  const getFilteredStudentList = () => {
    const list = Object.entries(currentClassObj.names).map(([numStr, name]) => {
      const num = Number(numStr);
      const scoreData = getStudentScoreData(num);
      const memo = getStudentMemo(num);
      return { num, name, memo, ...scoreData };
    });

    // Filter search
    const filtered = list.filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.trim().toLowerCase();
      return (
        item.name.toLowerCase().includes(q) || 
        String(item.num).includes(q) || 
        item.memo.toLowerCase().includes(q)
      );
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "score") return b.score - a.score;
      if (sortBy === "name") return a.name.localeCompare(b.name, "ko");
      return a.num - b.num;
    });

    return filtered;
  };

  const filteredStudentList = getFilteredStudentList();
  const maxClassScore = Math.max(...filteredStudentList.map((s) => s.score), 10);

  // Clear data
  const handleResetClassData = () => {
    if (confirm(`[${selectedClassKey}반]의 모든 학생 점수, 활동 기록, 메모를 초기화하시겠습니까?`)) {
      const updatedScores = { ...scoresMap };
      const updatedMemos = { ...memosMap };
      Object.keys(currentClassObj.names).forEach((numStr) => {
        delete updatedScores[`${selectedClassKey}_${numStr}`];
        delete updatedMemos[`${selectedClassKey}_${numStr}`];
      });
      const updatedLogs = logs.filter((l) => l.classKey !== selectedClassKey);
      saveCurrentData(updatedScores, updatedLogs, updatedMemos);
      setSelectedNums(new Set());
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-fadeIn">
      
      {/* Top Banner Header */}
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <div className="text-xs font-semibold text-slate-400 mb-1">학급 선택</div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-between">
            <span>기록할 학급을 먼저 선택하세요.</span>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {currentClassObj.count}명
            </span>
          </h1>
        </div>

        {/* Class Selection Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {CLASS_LIST.map((cls) => {
            const isSelected = selectedClassKey === cls.key;
            return (
              <button
                key={cls.key}
                onClick={() => {
                  setSelectedClassKey(cls.key);
                  setSelectedNums(new Set());
                  setExpandedNum(null);
                }}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center gap-2 shrink-0 border cursor-pointer ${
                  isSelected
                    ? "bg-purple-600 text-white shadow-md scale-105 border-purple-600"
                    : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: isSelected ? "#ffffff" : cls.color }}
                />
                <span>{cls.key}반</span>
                <span className="opacity-70 font-normal">{cls.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Activity Card Container */}
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Navigation Tabs & Class Progress Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            <button
              onClick={() => setActiveTab("summary")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "summary"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>요약</span>
            </button>

            <button
              onClick={() => setActiveTab("timeline")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "timeline"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span>날짜순</span>
            </button>

            <button
              onClick={() => setActiveTab("student")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "student"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <User className="w-4 h-4 text-purple-500" />
              <span>학생별</span>
            </button>
          </div>

          {/* Yellow Class Progress Input (수업 진도 기록 칸 - 자동 저장) & Quick batch bar */}
          {activeTab === "summary" && (
            <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
              
              {/* Yellow Progress input box */}
              <div className="flex items-center gap-2 bg-amber-50 border-2 border-amber-300 px-3.5 py-1.5 rounded-2xl text-xs font-semibold text-amber-950 shadow-xs flex-1 sm:flex-initial">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <input
                  type="text"
                  value={currentProgressNote}
                  onChange={(e) => handleProgressNoteChange(e.target.value)}
                  placeholder="수업 진도 입력 (예: 2p 형성 1번)"
                  title="선생님 수업 진도 기록 칸 (자동 저장)"
                  className="bg-transparent text-xs font-black text-amber-950 focus:outline-none w-32 sm:w-44 placeholder-amber-400"
                />
                
                {/* Batch Button */}
                <button
                  disabled={selectedNums.size === 0}
                  onClick={() => {
                    addPointToStudents(Array.from(selectedNums), 1, currentProgressNote);
                    setSelectedNums(new Set());
                  }}
                  className={`px-3 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                    selectedNums.size > 0
                      ? "bg-amber-500 text-white shadow-xs hover:bg-amber-600 scale-105"
                      : "bg-amber-200/80 text-amber-600 cursor-not-allowed"
                  }`}
                >
                  선택 {selectedNums.size}명 일괄 부여 (+1p)
                </button>
              </div>

              {/* Search bar */}
              <div className="relative flex-1 sm:flex-initial">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="이름/번호/메모 검색"
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-44"
                />
              </div>

              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "num" | "score" | "name")}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="num">번호순</option>
                <option value="score">점수 높은순</option>
                <option value="name">이름순</option>
              </select>

              <button
                onClick={handleResetClassData}
                title="학급 데이터 초기화"
                className="p-2 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: Summary Table */}
        {activeTab === "summary" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 px-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <button
                  onClick={toggleSelectAll}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-purple-600 cursor-pointer"
                >
                  {selectedNums.size === Object.keys(currentClassObj.names).length ? (
                    <CheckSquare className="w-4 h-4 text-purple-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300" />
                  )}
                  <span>전체 선택</span>
                </button>
                <span>학생 요약 ({filteredStudentList.length}명)</span>
              </div>
              <span className="text-[11px]">학생 이름/화살표( &gt; )를 누르면 삭제 가능한 시간별 누적 기록이 펼쳐집니다.</span>
            </div>

            {/* Student Table List */}
            <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-2xs">
              
              {/* Header row */}
              <div className="grid grid-cols-12 gap-2 p-3.5 bg-slate-50 text-[11px] font-extrabold text-slate-400 items-center">
                <div className="col-span-1 flex items-center justify-center">선택</div>
                <div className="col-span-1">번호</div>
                <div className="col-span-2">학생</div>
                <div className="col-span-3">현재 점수 (게이지 바)</div>
                <div className="col-span-2 text-center">점수 조절</div>
                <div className="col-span-2">교사 메모 (저장)</div>
                <div className="col-span-1 text-right pr-2">기록</div>
              </div>

              {/* Body rows */}
              {filteredStudentList.map((st) => {
                const isChecked = selectedNums.has(st.num);
                const isExpanded = expandedNum === st.num;
                
                // Dynamic gauge score percentage (shrinks on -1, grows on +1)
                const scorePercent = Math.min(100, Math.max(0, (st.score / maxClassScore) * 100));

                // Logs for this specific student
                const studentLogs = logs.filter(
                  (l) => l.classKey === selectedClassKey && l.num === st.num
                );

                return (
                  <React.Fragment key={st.num}>
                    <div
                      className={`grid grid-cols-12 gap-2 p-3.5 items-center text-xs transition-colors hover:bg-purple-50/30 ${
                        isChecked ? "bg-purple-50/50" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <div className="col-span-1 flex items-center justify-center">
                        <button
                          onClick={() => toggleSelectOne(st.num)}
                          className="text-slate-400 hover:text-purple-600 cursor-pointer"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-purple-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-300" />
                          )}
                        </button>
                      </div>

                      {/* Number */}
                      <div className="col-span-1 font-bold text-slate-500">
                        {st.num}
                      </div>

                      {/* Name & Toggle Arrow */}
                      <div className="col-span-2 font-extrabold text-slate-900 flex items-center gap-1">
                        <button
                          onClick={() => setExpandedNum(isExpanded ? null : st.num)}
                          className="flex items-center gap-1 hover:text-purple-600 cursor-pointer text-left"
                        >
                          <span>{st.name}</span>
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-purple-600" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </button>
                      </div>

                      {/* Score Progress Bar (점수 게이지 바 - -1 및 +1 완벽 연동) */}
                      <div className="col-span-3 flex items-center gap-2.5">
                        <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 relative">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              st.score > 0
                                ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500"
                                : "bg-slate-300"
                            }`}
                            style={{ width: `${scorePercent}%` }}
                          />
                        </div>
                        <span className={`font-black text-xs min-w-[28px] text-right ${st.score > 0 ? 'text-indigo-700' : 'text-slate-400'}`}>
                          {st.score}점
                        </span>
                      </div>

                      {/* Quick +1 / -1 buttons with custom note launcher */}
                      <div className="col-span-2 flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            // Auto launcher: Prompt modal for reason or quick confirm
                            setCustomReasonModal({ num: st.num, name: st.name, change: 1 });
                            setModalReasonText(currentProgressNote);
                          }}
                          className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full font-black text-xs transition-transform active:scale-95 cursor-pointer shadow-2xs flex items-center gap-0.5"
                          title="점수 +1 (사유 선택/패스 모달 노출)"
                        >
                          +1
                        </button>
                        
                        <button
                          onClick={() => {
                            setCustomReasonModal({ num: st.num, name: st.name, change: -1 });
                            setModalReasonText("감점 (-1)");
                          }}
                          className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-full font-black text-xs transition-transform active:scale-95 cursor-pointer shadow-2xs flex items-center gap-0.5"
                          title="점수 -1 (감점)"
                        >
                          -1
                        </button>

                        <button
                          onClick={() => {
                            setCustomReasonModal({ num: st.num, name: st.name, change: 1 });
                            setModalReasonText(currentProgressNote);
                          }}
                          className="p-1 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                          title="사유 직접 쓰기 / 패스"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Teacher Memo input field (학생별 메모 저장 칸) */}
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={st.memo}
                          onChange={(e) => handleMemoChange(st.num, e.target.value)}
                          placeholder="작은 메모 입력..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-[11px] font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:bg-white"
                        />
                      </div>

                      {/* Detail History Popup button */}
                      <div className="col-span-1 text-right pr-1">
                        <button
                          onClick={() => setSelectedStudentForModal({ num: st.num, name: st.name })}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                          title="전체 기록 팝업"
                        >
                          <History className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* EXPANDED DROPDOWN TIMELINE WITH DELETE BUTTON (삭제 가능한 일시별 누적 기록) */}
                    {isExpanded && (
                      <div className="col-span-12 bg-purple-50/40 p-4 border-t border-b border-purple-100 space-y-2 animate-fadeIn">
                        <div className="flex items-center justify-between text-xs font-bold text-purple-900 pb-1 border-b border-purple-200/60">
                          <span>[{st.num}번 {st.name}] 시간별 누적 입력 기록</span>
                          <span className="text-[11px] text-purple-600 font-normal">총 {studentLogs.length}건</span>
                        </div>

                        {studentLogs.length === 0 ? (
                          <div className="text-xs text-purple-400 py-3 text-center">
                            아직 기록된 일시별 점수 활동이 없습니다.
                          </div>
                        ) : (
                          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                            {studentLogs.map((lg) => (
                              <div
                                key={lg.id}
                                className="bg-white p-2.5 rounded-xl border border-purple-100 flex items-center justify-between text-xs shadow-2xs"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-[11px] font-semibold text-slate-400">
                                    {lg.dateStr}
                                  </span>
                                  <span className="font-bold text-slate-800">
                                    {lg.reason}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span
                                    className={`font-black text-xs px-2 py-0.5 rounded-md ${
                                      lg.change >= 0
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-rose-100 text-rose-800"
                                    }`}
                                  >
                                    {lg.change >= 0 ? `+${lg.change}점` : `${lg.change}점`}
                                  </span>

                                  {/* Delete Log Item Button */}
                                  <button
                                    onClick={() => deleteLogItem(lg.id)}
                                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                    title="이 기록 삭제하기 (점수 환원)"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

            </div>
          </div>
        )}

        {/* TAB 2: Timeline list (날짜순) */}
        {activeTab === "timeline" && (
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-600 flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-500" />
              <span>[{selectedClassKey}반] 전체 포인트 기록 타임라인</span>
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {logs.filter((l) => l.classKey === selectedClassKey).length === 0 ? (
                <div className="text-center py-16 text-slate-400 text-xs font-medium">
                  아직 기록된 활동 점수가 없습니다.
                </div>
              ) : (
                logs
                  .filter((l) => l.classKey === selectedClassKey)
                  .map((logItem) => (
                    <div
                      key={logItem.id}
                      className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex items-center justify-between hover:border-purple-200 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-extrabold text-xs flex items-center justify-center">
                          {logItem.num}번
                        </span>
                        <div>
                          <div className="font-extrabold text-slate-900 text-xs flex items-center gap-2">
                            <span>{logItem.studentName}</span>
                            <span className="text-[10px] text-slate-400 font-normal">
                              {logItem.dateStr}
                            </span>
                          </div>
                          <span className="text-xs text-slate-600 font-medium">
                            {logItem.reason}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`font-black text-xs px-2.5 py-1 rounded-full ${
                            logItem.change >= 0
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {logItem.change >= 0 ? `+${logItem.change}점` : `${logItem.change}점`}
                        </span>

                        <button
                          onClick={() => deleteLogItem(logItem.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="기록 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: By Student view */}
        {activeTab === "student" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredStudentList.map((st) => (
              <button
                key={st.num}
                onClick={() => setSelectedStudentForModal({ num: st.num, name: st.name })}
                className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-md transition-all text-left flex flex-col justify-between space-y-2 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">{st.num}번</span>
                  <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {st.score}점
                  </span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm group-hover:text-purple-600 transition-colors">
                  {st.name}
                </div>
                {st.memo ? (
                  <div className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md font-semibold truncate">
                    📝 {st.memo}
                  </div>
                ) : (
                  <div className="text-[10px] text-slate-400 font-medium truncate">
                    기록 {st.recordCount}회
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Custom Reason Modal (자동으로 뜨는 긴 사유 입력창 / 패스 선택) */}
      {customReasonModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">
                [{customReasonModal.num}번 {customReasonModal.name}] 점수 ({customReasonModal.change >= 0 ? '+' : ''}{customReasonModal.change}점) 기록 사유
              </h3>
              <span className={`text-xs font-black px-2.5 py-1 rounded-full ${customReasonModal.change >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {customReasonModal.change >= 0 ? `+${customReasonModal.change}점` : `${customReasonModal.change}점`}
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">
                활동 사유 또는 메모를 입력하세요 (선택 사항)
              </label>
              <input
                type="text"
                value={modalReasonText}
                onChange={(e) => setModalReasonText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addPointToStudents([customReasonModal.num], customReasonModal.change, modalReasonText || currentProgressNote);
                    setCustomReasonModal(null);
                  }
                }}
                placeholder="입력 없이 패스 가능"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  // PASS button: Grant point with blank/default progress note
                  addPointToStudents([customReasonModal.num], customReasonModal.change, currentProgressNote || "활동 기록");
                  setCustomReasonModal(null);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                패스 (사유없이 점수만)
              </button>
              
              <button
                onClick={() => {
                  addPointToStudents([customReasonModal.num], customReasonModal.change, modalReasonText || currentProgressNote);
                  setCustomReasonModal(null);
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>기록 저장</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student History Detail Modal */}
      {selectedStudentForModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                  {selectedStudentForModal.num}번
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {selectedStudentForModal.name} 학생 활동 기록
                  </h3>
                  <p className="text-xs text-slate-400">
                    누적 점수: {getStudentScoreData(selectedStudentForModal.num).score}점
                  </p>
                </div>
              </div>
            </div>

            {/* History logs for this student with delete feature */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {logs.filter(
                (l) => l.classKey === selectedClassKey && l.num === selectedStudentForModal.num
              ).length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">
                  아직 부여된 활동 점수가 없습니다.
                </p>
              ) : (
                logs
                  .filter(
                    (l) => l.classKey === selectedClassKey && l.num === selectedStudentForModal.num
                  )
                  .map((logItem) => (
                    <div
                      key={logItem.id}
                      className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{logItem.reason}</div>
                        <div className="text-[10px] text-slate-400">{logItem.dateStr}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-black text-xs px-2 py-0.5 rounded-md ${
                            logItem.change >= 0
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {logItem.change >= 0 ? `+${logItem.change}점` : `${logItem.change}점`}
                        </span>
                        <button
                          onClick={() => deleteLogItem(logItem.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                          title="기록 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-4 border-t border-slate-200">
        <p>📊 학급 활동 기록 및 점수 관리 시스템 | 수연쌤의 아카데미</p>
      </footer>

    </div>
  );
}
