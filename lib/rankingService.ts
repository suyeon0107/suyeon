import { supabase, isSupabaseConfigured } from "./supabaseClient";

export interface Ranking {
  id?: number;
  student_name: string;
  score: number;
  category: "early" | "late";
  created_at?: string;
}

// Initial mock data to present when live Supabase is not connected
const INITIAL_MOCK_RANKINGS: Ranking[] = [
  // 조선 전기 (early)
  { student_name: "세종대왕", score: 100, category: "early", created_at: new Date(2026, 5, 20).toISOString() },
  { student_name: "정도전", score: 100, category: "early", created_at: new Date(2026, 5, 21).toISOString() },
  { student_name: "장영실", score: 80, category: "early", created_at: new Date(2026, 5, 22).toISOString() },
  { student_name: "신사임당", score: 80, category: "early", created_at: new Date(2026, 5, 23).toISOString() },
  { student_name: "이이(율곡)", score: 60, category: "early", created_at: new Date(2026, 5, 23).toISOString() },

  // 조선 후기 (late)
  { student_name: "충무공이순신", score: 100, category: "late", created_at: new Date(2026, 5, 20).toISOString() },
  { student_name: "다산정약용", score: 100, category: "late", created_at: new Date(2026, 5, 21).toISOString() },
  { student_name: "의성허준", score: 80, category: "late", created_at: new Date(2026, 5, 22).toISOString() },
  { student_name: "단원김홍도", score: 60, category: "late", created_at: new Date(2026, 5, 23).toISOString() },
  { student_name: "연암박지원", score: 60, category: "late", created_at: new Date(2026, 5, 23).toISOString() },
];

// LocalStorage Helper for fallback mode
const getLocalRankings = (): Ranking[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("joseon_quiz_rankings");
  if (!stored) {
    localStorage.setItem("joseon_quiz_rankings", JSON.stringify(INITIAL_MOCK_RANKINGS));
    return INITIAL_MOCK_RANKINGS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_MOCK_RANKINGS;
  }
};

const saveLocalRankings = (rankings: Ranking[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("joseon_quiz_rankings", JSON.stringify(rankings));
};

export const rankingService = {
  /**
   * Fetch rankings filtered by category, sorted by score DESC and date ASC.
   */
  async getRankings(category: "early" | "late"): Promise<Ranking[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("rankings")
          .select("*")
          .eq("category", category)
          .order("score", { ascending: false })
          .order("created_at", { ascending: true })
          .limit(50); // Get top 50 rankings

        if (error) {
          console.error("Supabase select error, fallback to localStorage:", error.message);
          return this.getLocalRankingsByCategory(category);
        }

        return data || [];
      } catch (e) {
        console.error("Supabase error, fallback to localStorage:", e);
        return this.getLocalRankingsByCategory(category);
      }
    } else {
      return this.getLocalRankingsByCategory(category);
    }
  },

  /**
   * Submit student quiz score.
   */
  async submitScore(
    studentName: string,
    score: number,
    category: "early" | "late"
  ): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("rankings").insert([
          {
            student_name: studentName,
            score: score,
            category: category,
          },
        ]);

        if (error) {
          console.error("Supabase insert error, saving to localStorage:", error.message);
          this.saveLocalRanking(studentName, score, category);
          return { success: true, error: "서버 저장 실패로 인해 로컬 브라우저에 저장되었습니다." };
        }

        return { success: true };
      } catch (e: any) {
        console.error("Supabase exception, saving to localStorage:", e);
        this.saveLocalRanking(studentName, score, category);
        return { success: true, error: "네트워크 오류로 인해 로컬 브라우저에 저장되었습니다." };
      }
    } else {
      this.saveLocalRanking(studentName, score, category);
      return { success: true };
    }
  },

  // Fallback local functions
  getLocalRankingsByCategory(category: "early" | "late"): Ranking[] {
    const all = getLocalRankings();
    return all
      .filter((r) => r.category === category)
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score; // Higher score first
        }
        // Older timestamp first (meaning they solved it earlier)
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateA - dateB;
      });
  },

  saveLocalRanking(studentName: string, score: number, category: "early" | "late") {
    const all = getLocalRankings();
    const newRecord: Ranking = {
      id: Date.now(),
      student_name: studentName,
      score: score,
      category: category,
      created_at: new Date().toISOString(),
    };
    all.push(newRecord);
    saveLocalRankings(all);
  },
};
