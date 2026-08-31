import type { Metadata } from "next";
import LaborRightsChatbot from "@/components/LaborRightsChatbot";

export const metadata: Metadata = {
  title: "청소년 노동인권 지킴이 챗봇 - 수연쌤의 사회·역사 아카데미",
  description: "한국공인노무사회 & 청소년근로권익센터 1:1 맞춤 챗봇. 근로계약서, 최저임금, 주휴수당, 근로시간, 알바비 계산기",
};

export default function LaborRightsPage() {
  return (
    <div className="flex-1 bg-slate-100">
      <LaborRightsChatbot />
    </div>
  );
}
