"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Sparkles, 
  Palette, 
  Info, 
  CheckCircle2, 
  BookMarked,
  ArrowRight,
  RefreshCw,
  Heart
} from "lucide-react";

// 테마 배경화면 타입 정의
export type WallpaperId = "lavender" | "aurora" | "ocean" | "midnight";

export interface WallpaperOption {
  id: WallpaperId;
  name: string;
  className: string;
  previewColor: string;
}

export const WALLPAPER_OPTIONS: WallpaperOption[] = [
  {
    id: "lavender",
    name: "라벤더 노을",
    className: "bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-600",
    previewColor: "from-purple-500 to-blue-600",
  },
  {
    id: "aurora",
    name: "오로라 스카이",
    className: "bg-gradient-to-tr from-emerald-400 via-teal-500 to-indigo-600",
    previewColor: "from-emerald-400 to-indigo-600",
  },
  {
    id: "ocean",
    name: "오션 브리즈",
    className: "bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-700",
    previewColor: "from-cyan-400 to-indigo-700",
  },
  {
    id: "midnight",
    name: "미드나잇 다크",
    className: "bg-gradient-to-tr from-zinc-950 via-slate-900 to-neutral-950",
    previewColor: "from-zinc-950 to-neutral-900",
  },
];

// --- 1. 학습 대백과 (Explore App) ---
interface ExploreAppProps {
  onClose: () => void;
}

export function ExploreApp({ onClose }: ExploreAppProps) {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    {
      id: 1,
      title: "태조 이성계와 조선의 건국 (1392)",
      emoji: "👑",
      summary: "고려를 무너뜨리고 한양을 수도로 삼아 유교 국가 조선을 열었습니다.",
      detail: "고려 말의 신흥 무인 세력인 이성계는 위화도 회군을 통해 권력을 장악한 뒤, 신진사대부와 손을 잡고 1392년 새 왕조 조선을 개국했습니다. 그는 고려의 수도인 개경에서 한양(서울)으로 천도하고 경복궁을 창건하여 국가의 기틀을 다졌습니다. 유교 이념을 바탕으로 숭유억불 정책을 시행했습니다.",
      quizTip: "위화도 회군과 한양 천도는 조선 건국의 핵심 사건입니다."
    },
    {
      id: 2,
      title: "세종대왕과 훈민정음 창제 (1443)",
      emoji: "✍️",
      summary: "백성을 사랑하는 마음으로 우리글 훈민정음을 창제했습니다.",
      detail: "세종대왕은 백성들이 어려운 한자를 쓰지 못해 억울한 일을 당하는 것을 안타깝게 여겨, 집현전 학자들과 연구 끝에 1443년 독창적이고 과학적인 글자인 '훈민정음'을 창제했습니다. 3년의 연구 끝에 1446년에 반포하였으며, 이외에도 자격루(물시계), 측우기 등 놀라운 과학 발전을 이룩했습니다.",
      quizTip: "훈민정음은 백성을 사랑하는 '애민 정신'에서 탄생했습니다."
    },
    {
      id: 3,
      title: "이순신 장군과 임진왜란 (1592)",
      emoji: "⛵",
      summary: "거북선과 뛰어난 전술로 나라를 구한 구국의 영웅입니다.",
      detail: "1592년 도요토미 히데요시가 이끄는 왜군이 조선을 침략하면서 임진왜란이 발생했습니다. 국가가 위기에 처했을 때 이순신 장군은 거북선과 판옥선, 그리고 독창적인 학익진 전술 등을 구사하여 남해의 제해권을 장악했습니다. 특히 한산도 대첩, 명량 대첩 등에서 기적적인 승리를 거두어 군량 수송을 차단했습니다.",
      quizTip: "학익진 전술과 거북선은 임진왜란 해전 승리의 일등 공신입니다."
    },
    {
      id: 4,
      title: "실학과 조선 후기의 변화",
      emoji: "🌾",
      summary: "실제 생활에 도움이 되는 학문을 연구하여 조선의 변화를 꾀했습니다.",
      detail: "조선 후기, 실생활과 동떨어진 성리학에서 벗어나 실제 사회 모순을 개혁하고 백성의 삶을 풍요롭게 하려는 실용적 학문인 '실학'이 발흥했습니다. 농업 중심 개혁을 주장한 유형원·이익·정약용(중농학파)과 상공업 진흥 및 기술 도입을 강조한 박지원·박제가(중상학파/북학파) 등이 대표적입니다.",
      quizTip: "정약용은 실학을 집대성하여 여유당전서 및 목민심서를 저술했습니다."
    },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 overflow-hidden">
      {/* 앱 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          <span className="font-bold text-sm">학습 대백과</span>
        </div>
        <button 
          onClick={onClose}
          className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 transition-colors"
        >
          닫기
        </button>
      </div>

      {/* 앱 콘텐츠 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {selectedTopic === null ? (
          <>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl text-white shadow-md">
              <h3 className="font-bold text-base mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> 알아두면 쓸모있는 조선 역사
              </h3>
              <p className="text-xs text-indigo-100">
                조선 시대를 뒤흔든 주요 사건과 인물을 한눈에 정리했습니다. 카드를 터치하여 자세히 알아보세요!
              </p>
            </div>

            <div className="grid gap-3">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800 text-left hover:scale-[1.01] hover:border-indigo-300 dark:hover:border-indigo-900/50 transition-all duration-200 shadow-sm"
                >
                  <span className="text-3xl p-1 bg-zinc-50 dark:bg-zinc-900 rounded-lg">{topic.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50 leading-tight mb-1">
                      {topic.title}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                      {topic.summary}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 self-center shrink-0" />
                </button>
              ))}
            </div>
          </>
        ) : (
          (() => {
            const topic = topics.find((t) => t.id === selectedTopic)!;
            return (
              <div className="space-y-4 animate-fadeIn">
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
                >
                  ← 목록으로 돌아가기
                </button>

                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-4 border border-zinc-200/60 dark:border-zinc-800 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl">{topic.emoji}</span>
                    <h3 className="font-extrabold text-base leading-tight">{topic.title}</h3>
                  </div>
                  
                  <div className="border-t border-zinc-100 dark:border-zinc-900 pt-3">
                    <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
                      {topic.detail}
                    </p>
                  </div>

                  <div className="mt-3 p-3 bg-amber-50/70 dark:bg-amber-950/20 rounded-xl border border-amber-200/30">
                    <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                      💡 퀴즈 꿀팁
                    </h4>
                    <p className="text-xs text-amber-900/90 dark:text-amber-200/90 mt-1">
                      {topic.quizTip}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}

// --- 2. 오답 복습노트 (Review App) ---
export function ReviewApp({ onClose }: ExploreAppProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "memo">("summary");
  const [memos, setMemos] = useState<string[]>([]);
  const [newMemo, setNewMemo] = useState("");

  const summaries = [
    { id: 1, title: "경국대전", desc: "조선 왕조의 근간이 된 최고 법전. 세조 때 짓기 시작해 성종 때 완성됨." },
    { id: 2, title: "의궤", desc: "조선 왕실의 왕위 계승, 홀례 등 주요 행사를 글과 정밀한 그림으로 기록한 문서." },
    { id: 3, title: "대동법", desc: "공납(토산물) 제도를 토지 결수에 따라 쌀, 대동전 등으로 납부하게 한 경제 개혁 조치." },
    { id: 4, title: "수원화성", desc: "정조가 아버지 사도세자의 묘를 이장하며 건설한 신도시이자 과학적 성곽건축의 걸작." },
  ];

  const handleAddMemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemo.trim()) return;
    setMemos([...memos, newMemo.trim()]);
    setNewMemo("");
  };

  const handleClearMemos = () => {
    setMemos([]);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 overflow-hidden">
      {/* 앱 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-emerald-500" />
          <span className="font-bold text-sm">복습 노트</span>
        </div>
        <button 
          onClick={onClose}
          className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 transition-colors"
        >
          닫기
        </button>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <button
          onClick={() => setActiveTab("summary")}
          className={`flex-1 text-center py-2.5 text-xs font-bold transition-all duration-200 ${
            activeTab === "summary" 
              ? "text-emerald-600 border-b-2 border-emerald-500" 
              : "text-zinc-400 hover:text-zinc-600"
          }`}
        >
          핵심 낱말 카드
        </button>
        <button
          onClick={() => setActiveTab("memo")}
          className={`flex-1 text-center py-2.5 text-xs font-bold transition-all duration-200 ${
            activeTab === "memo" 
              ? "text-emerald-600 border-b-2 border-emerald-500" 
              : "text-zinc-400 hover:text-zinc-600"
          }`}
        >
          나만의 요점 메모
        </button>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "summary" ? (
          <div className="space-y-3">
            {summaries.map((item) => (
              <div 
                key={item.id}
                className="p-3.5 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200/60 dark:border-zinc-800 shadow-sm"
              >
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  {item.title}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <form onSubmit={handleAddMemo} className="flex gap-2">
              <input
                type="text"
                value={newMemo}
                onChange={(e) => setNewMemo(e.target.value)}
                placeholder="공부하며 기억할 내용을 적어보세요..."
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-emerald-500 dark:text-white"
              />
              <button
                type="submit"
                className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors shrink-0"
              >
                추가
              </button>
            </form>

            <div className="space-y-2">
              {memos.length === 0 ? (
                <div className="text-center py-12 text-zinc-400 dark:text-zinc-500">
                  <BookMarked className="w-10 h-10 mx-auto opacity-30 mb-2" />
                  <p className="text-xs">작성된 요점 메모가 없습니다.</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs text-zinc-400 font-semibold">총 {memos.length}개</span>
                    <button
                      onClick={handleClearMemos}
                      className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
                    >
                      <RefreshCw className="w-3 h-3" /> 전체 삭제
                    </button>
                  </div>
                  <div className="space-y-2">
                    {memos.map((memo, idx) => (
                      <div 
                        key={idx}
                        className="p-3 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200/30 rounded-xl text-xs text-zinc-700 dark:text-zinc-300"
                      >
                        {memo}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- 3. 배경 설정 (Theme App) ---
interface ThemeAppProps {
  onClose: () => void;
  currentWallpaper: WallpaperId;
  onSelectWallpaper: (id: WallpaperId) => void;
}

export function ThemeApp({ onClose, currentWallpaper, onSelectWallpaper }: ThemeAppProps) {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 overflow-hidden">
      {/* 앱 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-purple-500" />
          <span className="font-bold text-sm">배경 설정</span>
        </div>
        <button 
          onClick={onClose}
          className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 transition-colors"
        >
          닫기
        </button>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 text-center shadow-sm">
          <h3 className="text-sm font-extrabold mb-1">대시보드 배경 테마 선택</h3>
          <p className="text-xs text-zinc-400 mb-4">마음에 드는 그라디언트 테마로 배경을 변경해보세요.</p>

          <div className="grid grid-cols-2 gap-3">
            {WALLPAPER_OPTIONS.map((wp) => (
              <button
                key={wp.id}
                onClick={() => onSelectWallpaper(wp.id)}
                className={`p-3.5 rounded-xl border text-center transition-all duration-200 ${
                  currentWallpaper === wp.id
                    ? "border-purple-500 bg-purple-50/40 dark:bg-purple-950/10 scale-95"
                    : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 hover:scale-[0.98]"
                }`}
              >
                {/* 미리보기 동그라미 */}
                <div className={`w-12 h-12 rounded-full mx-auto mb-2 bg-gradient-to-tr ${wp.previewColor} shadow-md border border-white/20`} />
                <span className="text-xs font-bold block">{wp.name}</span>
                {currentWallpaper === wp.id && (
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold mt-0.5 block">적용됨</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 4. 수연쌤의 아카데미 소개 (About App) ---
export function AboutApp({ onClose }: ExploreAppProps) {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 overflow-hidden">
      {/* 앱 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-500" />
          <span className="font-bold text-sm">정보</span>
        </div>
        <button 
          onClick={onClose}
          className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 transition-colors"
        >
          닫기
        </button>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center py-6">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0b5c8] to-[#e8a87c] text-white text-3xl shadow-lg mx-auto mb-3">
            🎓
          </span>
          <h3 className="font-extrabold text-lg bg-gradient-to-r from-[#c47a5a] to-[#b06a8a] bg-clip-text text-transparent">
            수연쌤의 아카데미
          </h3>
          <p className="text-xs text-zinc-400 mt-1">v1.0.0 (Education Dashboard)</p>
        </div>

        <div className="bg-white dark:bg-zinc-950 rounded-2xl p-4 border border-zinc-200/60 dark:border-zinc-800 shadow-sm space-y-3.5">
          <div>
            <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">📢 소개 및 제작 목적</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              수연쌤의 아카데미는 역사, 지리, 경제 등 사회 교과 학습을 재미있고 효과적으로 할 수 있도록 설계된 인터랙티브 교육용 대시보드입니다.
            </p>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-900 pt-3">
            <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">✨ 핵심 기능</h4>
            <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-1 list-disc pl-4 leading-relaxed">
              <li>아기자기한 파스텔톤 교육용 대시보드</li>
              <li>조선 전·후기를 망라하는 수준 높은 역사 퀴즈</li>
              <li>실시간 리더보드 연동을 통한 협동·경쟁 학습</li>
              <li>언제 어디서나 활용할 수 있는 복습 자료 및 간편 메모</li>
            </ul>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-900 pt-3 flex items-center justify-between text-[10px] text-zinc-400 font-medium">
            <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-500 fill-current" /> Designed for Education</span>
            <span>Gemini & Next.js</span>
          </div>
        </div>
      </div>
    </div>
  );
}
