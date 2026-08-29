import type { Metadata } from "next";
import StudentActivityTracker from "@/components/StudentActivityTracker";

export const metadata: Metadata = {
  title: "학급 활동 기록 및 점수 관리 📊 - 수연쌤의 아카데미",
  description: "학년별 학급 명렬표 연동 활동 점수 기록, 점수 게이지 바, 일괄 부여 및 누적 이력 관리 시스템",
};

export default function ActivityTrackerPage() {
  return (
    <div className="flex-1 bg-slate-50/50">
      <StudentActivityTracker />
    </div>
  );
}
