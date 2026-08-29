"use client";

import React, { useState } from "react";
import { 
  Scale, 
  Search, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Phone, 
  AlertCircle
} from "lucide-react";

// --- TYPES & DATA DEFINITIONS ---

type TabType = "cases" | "orgs" | "quiz";

interface PresetCase {
  id: number;
  title: string;
  source: string;
  badge: string;
  badgeColor: string;
  summary: string;
  primaryOrg: string;
  actionPlan: {
    agency: string;
    type: string;
    desc: string;
  }[];
  tips: string;
}

interface ConclusionItem {
  agency: string;
  badge: string;
  title: string;
  desc: string;
  howTo: string;
  iconBg: string;
  icon: string;
}

interface OrganizationItem {
  id: string;
  name: string;
  category: "사법부" | "헌법기구" | "독립기구" | "전문기관";
  badge: string;
  badgeColor: string;
  icon: string;
  description: string;
  helpline: string;
  details: {
    title: string;
    desc: string;
  }[];
}

interface QuizItem {
  id: number;
  category: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

// 1. 대표 사례 데이터
const PRESET_CASES: PresetCase[] = [
  {
    id: 0,
    title: "분식집 억울한 영업정지 처분",
    source: "교과서 20페이지 사례 1",
    badge: "행정 처분",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    summary: "선물받은 식품을 보관했을 뿐인데, 유통기한 경과 재료 사용 오해를 받아 15일 영업정지 처분을 받아 생계가 막막해진 상황.",
    primaryOrg: "국민권익위원회 (행정심판) & 법원 (행정소송)",
    actionPlan: [
      {
        agency: "국민권익위원회 (중앙행정심판위원회)",
        type: "행정심판",
        desc: "행정기관의 잘못되거나 가혹한 처분(영업정지)에 대해 행정심판을 청구하여 법원 재판보다 신속하고 무료로 구제받을 수 있습니다."
      },
      {
        agency: "법원 (행정법원)",
        type: "행정재판 (행정소송)",
        desc: "구청 등 행정기관의 영업정지 처분을 취소해 달라는 행정소송 및 판결 확정 전까지 영업을 계속할 수 있도록 집행정지를 신청합니다."
      }
    ],
    tips: "💡 신속한 생계 유지가 필요한 경우 먼저 '국민권익위원회(행정심판)'를 이용하면 빠르고 간편하게 구제받을 수 있습니다."
  },
  {
    id: 1,
    title: "동의 없는 방송 사진 노출 (초상권 침해)",
    source: "교과서 20페이지 사례 2",
    badge: "초상권·언론",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    summary: "극장 로비에서 연예인 사인을 받다 찍힌 본인의 얼굴이 동의 없이 TV 뉴스/예능 프로그램에 그대로 방영된 상황.",
    primaryOrg: "언론중재위원회 & 법원",
    actionPlan: [
      {
        agency: "언론중재위원회",
        type: "조정 및 중재 신청",
        desc: "해당 방송사에 초상권 침해에 따른 정정보도, 사과문 게재, 반론보도 및 손해배상 합의 조정을 신청합니다. 재판보다 간편하고 신속합니다."
      },
      {
        agency: "법원",
        type: "민사소송 (손해배상 청구)",
        desc: "초상권 침해 및 정신적 고통에 대한 위자료를 청구하는 민사재판을 진행할 수 있습니다."
      }
    ],
    tips: "💡 언론 보도로 인한 피해는 '언론중재위원회'를 통하는 것이 가장 전문적이고 빠릅니다."
  },
  {
    id: 2,
    title: "정부의 기후위기 방관 청소년 헌법소원",
    source: "교과서 19페이지 헌법소원 사례",
    badge: "기본권 침해",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    summary: "정부의 부실한 온실가스 감축 법률과 정책으로 인해 청소년의 환경권과 안전하게 살아갈 기본권이 침해당한 상황.",
    primaryOrg: "헌법재판소",
    actionPlan: [
      {
        agency: "헌법재판소",
        type: "헌법소원 심판 청구",
        desc: "국민 개인이 국가의 법률 또는 공권력 행사/불행사로 인해 헌법상 보장된 기본권을 직접 침해받았을 때 헌법소원을 제기하여 해당 정책의 위헌성을 다툽니다."
      }
    ],
    tips: "💡 국가 공권력이나 법률 자체가 국민의 기본권을 침해할 때는 '헌법재판소'의 헌법소원 심판을 청구합니다."
  },
  {
    id: 3,
    title: "인터넷 악플 및 물리적 폭행 피해",
    source: "교과서 19페이지 그림 사례",
    badge: "개인 간 침해",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    summary: "온라인 게시판에서 심한 모욕과 허위사실 유포를 당했거나, 타인에게 신체적 폭행을 당해 상해를 입은 상황.",
    primaryOrg: "법원 (형사재판 및 민사재판)",
    actionPlan: [
      {
        agency: "법원 (형사재판)",
        type: "경찰/검찰 고소 후 형사처벌",
        desc: "가해자를 고소하여 모욕죄, 명예훼손죄, 폭행죄 등으로 형사재판을 거쳐 형벌(벌금, 징역)을 받게 합니다."
      },
      {
        agency: "법원 (민사재판)",
        type: "민사소송 (손해배상 청구)",
        desc: "폭행 치료비나 명예훼손으로 인한 정신적 위자료 등을 지급하도록 개인 대 개인 민사재판을 제기합니다."
      }
    ],
    tips: "💡 개인 간의 불법행위로 인한 분쟁은 '법원'의 민사·형사 재판이 가장 보편적인 수단입니다."
  },
  {
    id: 4,
    title: "합리적 이유 없는 차별 & 불합리한 제도",
    source: "교과서 19페이지 국가인권위원회 사례",
    badge: "차별·제도",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    summary: "특정 성별, 장애, 나이 등을 이유로 채용에서 배제되거나 인권을 제약하는 불합리한 내부 규칙이 존재하는 상황.",
    primaryOrg: "국가인권위원회",
    actionPlan: [
      {
        agency: "국가인권위원회",
        type: "진정서 제출 및 시정 권고",
        desc: "어느 권력에도 속하지 않는 독립기구인 인권위에 진정(신고)을 내면 사실관계를 조사하여 차별 시정 및 법·제도 개선을 해당 기관에 권고합니다."
      }
    ],
    tips: "💡 국가인권위원회는 재판을 하지는 않지만, 독립된 지위에서 인권 침해와 차별을 조사하고 개선을 권고합니다."
  },
  {
    id: 5,
    title: "결함 있는 전자제품 환불 거부",
    source: "교과서 19페이지 그 밖의 기관",
    badge: "소비자 권리",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    summary: "구입한 전자제품에 명백한 결함이 있음에도 판매자가 환불이나 수리를 부당하게 거부하여 재산상 피해를 본 상황.",
    primaryOrg: "한국소비자원",
    actionPlan: [
      {
        agency: "한국소비자원",
        type: "소비자 피해구제 및 분쟁조정",
        desc: "소비자상담(1372) 후 피해구제 신청을 접수하면 사실조사와 전문가 심의를 거쳐 환불, 교환 등의 분쟁 조정을 권고합니다."
      }
    ],
    tips: "💡 소비자 권리 침해는 소송 전 '한국소비자원'을 통해 비용 없이 합리적인 합의를 이끌어낼 수 있습니다."
  }
];

// 2. 진단 마법사 결과 데이터
const CONCLUSION_DATA: Record<string, ConclusionItem> = {
  court_criminal: {
    agency: "법원 (형사재판)",
    badge: "사법부 / 보편적 구제",
    title: "형사고소 후 형사재판을 통한 가해자 처벌",
    desc: "수사기관(경찰·검찰)에 고소장을 접수한 뒤, 기소되어 법원에서 열리는 형사재판을 통해 법률에 정해진 형벌(징역, 벌금)을 내립니다.",
    howTo: "경찰서에 피해 사실 진술서 및 증거 제출 → 검찰 기소 → 법원 형사재판 진행",
    iconBg: "bg-rose-500",
    icon: "⚖️"
  },
  court_civil: {
    agency: "법원 (민사재판)",
    badge: "사법부 / 보편적 구제",
    title: "민사소송을 통한 손해배상 및 권리 구제",
    desc: "개인 간의 권리 침해나 금전적 손해에 대하여 법원에 민사소송 소장을 제출하여 손해배상금 지급 또는 원상회복 판결을 받습니다.",
    howTo: "관할 법원에 민사 소장 접수 → 변론 기일 출석 → 판결 및 강제집행",
    iconBg: "bg-blue-500",
    icon: "📜"
  },
  acrc: {
    agency: "국민권익위원회 (중앙행정심판위원회)",
    badge: "행정부 소속 / 신속·무료",
    title: "행정심판 청구를 통한 신속 구제",
    desc: "행정청의 위법·부당한 처분(영업정지, 면허취소 등)에 대해 법원 소송보다 신속하고 비용 부담 없이 해결할 수 있는 제도입니다.",
    howTo: "처분이 있음을 안 날부터 90일 이내에 온라인 행정심판 포털 또는 위원회에 청구서 제출",
    iconBg: "bg-amber-500",
    icon: "🏛️"
  },
  court_admin: {
    agency: "법원 (행정소송)",
    badge: "사법부 / 법적 최종 판결",
    title: "행정법원에 행정소송 제기",
    desc: "행정기관의 잘못된 처분을 취소해 달라는 행정소송을 행정법원에 제기하여 법적 효력 판결을 구합니다.",
    howTo: "관할 행정법원에 처분 취소 소송 및 집행정지 신청서 접수",
    iconBg: "bg-indigo-500",
    icon: "⚖️"
  },
  ccourt_appeal: {
    agency: "헌법재판소 (헌법소원 심판)",
    badge: "헌법 수호 / 기본권 구제",
    title: "국민의 기본권 보장을 위한 헌법소원 심판 청구",
    desc: "국가 공권력의 행사나 불행사로 인하여 헌법상 보장된 자신의 기본권(행복추구권, 평등권, 환경권 등)을 직접 침해당했을 때 청구합니다.",
    howTo: "사유가 있음을 안 날부터 90일 이내에 헌법재판소에 헌법소원 심판 청구서 제출",
    iconBg: "bg-purple-500",
    icon: "🏛️"
  },
  ccourt_statute: {
    agency: "헌법재판소 (위헌법률 심판)",
    badge: "법률의 위헌 여부 심판",
    title: "법원을 통한 위헌법률 심판 제청",
    desc: "재판의 전제가 되는 법률이 헌법에 위반되는지 여부를 판단하기 위해, 당사자가 법원에 위헌법률심판제청을 신청하거나 법원이 직권으로 제청합니다.",
    howTo: "소송이 계속 중인 법원에 '위헌법률심판 제청 신청서' 제출",
    iconBg: "bg-violet-500",
    icon: "⚖️"
  },
  nhrc: {
    agency: "국가인권위원회",
    badge: "3부 어디에도 속하지 않는 독립기구",
    title: "인권 침해 및 차별 행위 조사와 시정 권고",
    desc: "성별, 종교, 장애, 출신 등을 이유로 한 차별 행위나 국가기관의 인권 침해에 대해 진정을 접수받아 사실조사 후 법·제도 개선을 권고합니다.",
    howTo: "국가인권위원회 홈페이지(진정 접수) 또는 국번없이 1331 전화 상담",
    iconBg: "bg-emerald-500",
    icon: "🔍"
  },
  pac: {
    agency: "언론중재위원회",
    badge: "언론 피해 구제 전문",
    title: "언론보도 피해 조정 및 정정보도 청구",
    desc: "방송, 신문, 인터넷 뉴스 등의 허위·과장·왜곡 보도나 무단 사진 보도(초상권 침해)로 입은 피해를 신속하게 조정·중재합니다.",
    howTo: "보도가 있은 날부터 3개월 이내에 언론중재위원회에 조정 신청서 접수",
    iconBg: "bg-cyan-500",
    icon: "📡"
  },
  kca: {
    agency: "한국소비자원",
    badge: "소비자 권익 보호",
    title: "소비자 피해 구제 및 분쟁조정",
    desc: "물품 결함, 환불 거부, 부당한 약관 등 소비 생활 중 발생한 분쟁을 전문적으로 조사하여 합의 권고 및 분쟁조정을 진행합니다.",
    howTo: "소비자상담센터(국번없이 1372) 상담 후 피해구제 신청 접수",
    iconBg: "bg-orange-500",
    icon: "🛒"
  }
};

// 3. 기관 사전 데이터
const ORGANIZATIONS: OrganizationItem[] = [
  {
    id: "court",
    name: "1. 법원 (사법부)",
    category: "사법부",
    badge: "가장 보편적인 구제 기관",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    icon: "⚖️",
    description: "법을 어겨 인권을 침해한 상대에게 법적 책임을 묻거나 피해를 보상받는 가장 대표적인 국가 사법 기관입니다.",
    helpline: "국민연합법률콜 (132 / 법률구조공단)",
    details: [
      {
        title: "🔹 민사재판 (개인 vs 개인)",
        desc: "개인 간 갈등으로 인한 손해배상 청구, 계약 위반 분쟁 해결 (예: 명예훼손 손해배상)"
      },
      {
        title: "🔹 형사재판 (범죄 처벌)",
        desc: "폭행, 사기, 절도 등 범죄를 저지른 자에게 국가가 형벌(징역, 벌금)을 부과"
      },
      {
        title: "🔹 행정재판 (행정소송)",
        desc: "행정청의 위법하거나 부당한 행정처분(영업정지 취소 등)에 대해 재판을 청구"
      }
    ]
  },
  {
    id: "constitutional-court",
    name: "2. 헌법재판소",
    category: "헌법기구",
    badge: "헌법 수호 & 기본권 보장",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    icon: "🏛️",
    description: "국가의 법률이나 공권력이 헌법에 어긋나 국민의 기본권을 침해했을 때 이를 전문적으로 심판합니다.",
    helpline: "02-708-3456 (헌법재판소 민원실)",
    details: [
      {
        title: "🔹 헌법소원 심판 (국민이 직접 청구)",
        desc: "국민 개인이 공권력 행사/불행사로 기본권(행복추구권, 환경권 등)을 침해당했을 때 직접 헌재에 구제 청구"
      },
      {
        title: "🔹 위헌법률 심판 (법원이 제청)",
        desc: "재판 중 적용될 법률이 헌법에 위반되는지 여부를 법원의 제청으로 심판"
      }
    ]
  },
  {
    id: "nhrc",
    name: "3. 국가인권위원회",
    category: "독립기구",
    badge: "어디에도 속하지 않는 독립기구",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: "🔍",
    description: "입법부, 사법부, 행정부 어디에도 속하지 않는 독립 기관으로 인권 보호의 보루 역할을 수행합니다.",
    helpline: "국번없이 1331 (인권상담)",
    details: [
      {
        title: "🔹 인권침해 및 차별행위 조사·진정 처리",
        desc: "성별·장애·학벌 등 차별 행위나 국가기관의 인권 침해 피해자의 진정을 접수하여 엄정하게 조사"
      },
      {
        title: "🔹 법·제도 개선 '권고' (재판권 없음 ❌)",
        desc: "직접 재판이나 처벌을 내리지는 않으며, 정부나 국회에 법과 정책을 고치도록 시정 권고"
      }
    ]
  },
  {
    id: "acrc",
    name: "4. 국민권익위원회 (중앙행정심판위원회)",
    category: "전문기관",
    badge: "행정부 소속 / 신속·무료",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    icon: "🤝",
    description: "행정기관의 부당한 행정처분으로 인한 피해를 행정심판 등을 통해 법원보다 신속하고 무료로 해결합니다.",
    helpline: "국번없이 110 (정부합동민원센터)",
    details: [
      {
        title: "🔹 행정심판 제도",
        desc: "위법·부당한 행정 처분에 대해 소송 비용 없이 빠른 판단으로 권리를 구제"
      },
      {
        title: "🔹 고충민원 및 위법 시정",
        desc: "행정기관의 잘못된 일처리로 인한 불합리한 피해 고충을 해결"
      }
    ]
  },
  {
    id: "pac",
    name: "5. 언론중재위원회",
    category: "전문기관",
    badge: "언론 피해 구제 전문",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    icon: "📡",
    description: "언론의 허위·왜곡 보도, 초상권 침해 등으로 인한 피해 조정 및 정정보도 청구를 담당합니다.",
    helpline: "02-397-3000",
    details: [
      {
        title: "🔹 언론보도 피해 조정 및 중재",
        desc: "방송·신문·인터넷 신문의 잘못된 보도로 인한 명예훼손, 초상권 침해 조정"
      },
      {
        title: "🔹 정정보도 & 반론보도",
        desc: "사실과 다른 보도 내용의 정정 보도 게시 및 반론 기사 청구 지원"
      }
    ]
  },
  {
    id: "kca",
    name: "6. 한국소비자원",
    category: "전문기관",
    badge: "소비자 권익 보호",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    icon: "🛒",
    description: "물품 및 서비스 이용 중 발생하는 소비자의 권익 침해 구제 및 분쟁 조정을 전문 수행합니다.",
    helpline: "국번없이 1372 (소비자상담센터)",
    details: [
      {
        title: "🔹 소비자 피해 구제",
        desc: "결함 상품 환불 거부, 부당한 약관 피해에 대해 전문 조사 및 합의 권고"
      },
      {
        title: "🔹 분쟁조정위원회",
        desc: "당사자 간 합의가 불가능할 때 법적 효력에 준하는 분쟁 조정 결정"
      }
    ]
  }
];

// 4. 자가진단 퀴즈 데이터
const QUIZ_DATA: QuizItem[] = [
  {
    id: 1,
    category: "교과서 20p 스스로 확인 1번",
    question: "법원은 권리를 구제하는 보편적인 수단인 ( 　　 )을/를 통해 침해된 권리를 보장한다. 괄호에 알맞은 말은?",
    options: ["재판", "행정심판", "권고", "서명운동"],
    answer: 0,
    explanation: "법원은 권리를 구제하는 가장 보편적인 기관으로, 민사·형사·행정 등 '재판'을 통해 침해된 권리를 보장합니다."
  },
  {
    id: 2,
    category: "교과서 20p 스스로 확인 2번",
    question: "입법부, 사법부, 행정부 어디에도 속하지 않는 '독립 기구'로 인권 보장과 차별 개선을 위해 설립된 기관은?",
    options: ["법원", "헌법재판소", "국가인권위원회", "국민권익위원회"],
    answer: 2,
    explanation: "국가인권위원회는 어느 국가기관에도 소속되지 않는 독립 기구로서 인권 침해 및 차별 행위를 조사하고 법과 제도의 개선을 '권고'합니다."
  },
  {
    id: 3,
    category: "상황 판단 문제",
    question: "퇴직금으로 분식집을 열었는데 억울하게 영업정지 처분을 받았습니다. 법원 재판보다 신속하고 무료로 구제받을 수 있는 기관과 수단은?",
    options: [
      "한국소비자원 - 분쟁조정",
      "국민권익위원회 - 행정심판",
      "언론중재위원회 - 정정보도",
      "헌법재판소 - 위헌법률심판"
    ],
    answer: 1,
    explanation: "행정기관의 잘못된 처분으로 인한 피해는 국민권익위원회(중앙행정심판위원회)의 '행정심판'을 통해 신속하게 구제받을 수 있습니다."
  },
  {
    id: 4,
    category: "기본권 침해 문제",
    question: "국가의 부당한 법률이나 공권력 행사로 인해 헌법상 보장된 기본권을 침해당했을 때, 국민 개인이 직접 청구하는 제도는?",
    options: [
      "민사소송",
      "헌법소원 심판",
      "형사고소",
      "소비자 분쟁조정"
    ],
    answer: 1,
    explanation: "헌법재판소의 '헌법소원 심판'은 국민 개인이 공권력이나 법률로 인해 헌법상 기본권을 침해받았을 때 청구하는 제도입니다."
  },
  {
    id: 5,
    category: "언론 피해 문제",
    question: "내 얼굴 사진이 본인 동의 없이 TV 뉴스나 방송 프로그램에 무단으로 보도되어 초상권을 침해당했을 때 가장 적절한 구제 기관은?",
    options: [
      "언론중재위원회",
      "한국소비자원",
      "국가인권위원회",
      "공정거래위원회"
    ],
    answer: 0,
    explanation: "언론의 잘못된 보도나 초상권·사생활 침해 피해는 '언론중재위원회'를 통해 정정보도 청구나 손해배상 조정을 신청할 수 있습니다."
  }
];

export default function HumanRightsGuide() {
  const [activeTab, setActiveTab] = useState<TabType>("cases");

  // 진단 마법사 상태
  const [wizardStep1, setWizardStep1] = useState<string | null>(null);
  const [selectedResultKey, setSelectedResultKey] = useState<string | null>(null);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number | null>(null);

  // 기관 사전 검색 및 필터 상태
  const [orgSearchQuery, setOrgSearchQuery] = useState("");
  const [orgCategoryFilter, setOrgCategoryFilter] = useState<string>("전체");

  // 퀴즈 상태
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // --- WIZARD HANDLERS ---
  const handlePresetSelect = (idx: number) => {
    setSelectedPresetIndex(idx);
    setSelectedResultKey(null);
    setWizardStep1(null);
  };

  const handleResetWizard = () => {
    setWizardStep1(null);
    setSelectedResultKey(null);
    setSelectedPresetIndex(null);
  };

  const handleStep1Select = (choice: string) => {
    setWizardStep1(choice);
    setSelectedPresetIndex(null);
    setSelectedResultKey(null);

    // 즉시 결론이 나오는 항목 처리
    if (choice === "discrimination_institution") {
      setSelectedResultKey("nhrc");
    } else if (choice === "media") {
      setSelectedResultKey("pac");
    } else if (choice === "consumer") {
      setSelectedResultKey("kca");
    }
  };

  const handleStep2Select = (resultKey: string) => {
    setSelectedResultKey(resultKey);
    setSelectedPresetIndex(null);
  };

  // --- QUIZ HANDLERS ---
  const handleAnswerQuiz = (chosenIdx: number) => {
    if (isAnswered) return;
    setSelectedQuizAnswer(chosenIdx);
    setIsAnswered(true);

    const currentQuiz = QUIZ_DATA[currentQuizIdx];
    if (chosenIdx === currentQuiz.answer) {
      setQuizScore((prev) => prev + 20);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIdx < QUIZ_DATA.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedQuizAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIdx(0);
    setQuizScore(0);
    setSelectedQuizAnswer(null);
    setIsAnswered(false);
    setQuizFinished(false);
  };

  // --- ORG FILTER LOGIC ---
  const filteredOrgs = ORGANIZATIONS.filter((org) => {
    const matchesQuery = org.name.toLowerCase().includes(orgSearchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(orgSearchQuery.toLowerCase()) ||
      org.details.some(d => d.title.includes(orgSearchQuery) || d.desc.includes(orgSearchQuery));
    
    const matchesCategory = orgCategoryFilter === "전체" || org.category === orgCategoryFilter;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fadeIn">
      
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 border border-blue-400/30 px-3.5 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span>중3 사회 · 1. 인권과 헌법 단원 연계</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            인권 침해 구제 가이드 & 시뮬레이터 ⚖️
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            나에게 닥친 억울한 상황이나 교과서 속 사례를 진단하고, 대한민국 대표 구제 기관과 적합한 해결 경로를 쉽게 탐색해보세요!
          </p>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="relative z-10 mt-8 flex flex-wrap gap-2 pt-4 border-t border-slate-700/60">
          <button
            onClick={() => setActiveTab("cases")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === "cases"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]"
                : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>사례 진단 마법사</span>
          </button>
          <button
            onClick={() => setActiveTab("orgs")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === "orgs"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]"
                : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>구제 기관 사전</span>
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === "quiz"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]"
                : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>자가진단 퀴즈</span>
          </button>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CASES & DIAGNOSIS WIZARD */}
      {/* ========================================================================= */}
      {activeTab === "cases" && (
        <div className="space-y-10 animate-slideUp">
          
          {/* Preset Cases Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm">
                  📚
                </span>
                교과서 속 주요 침해 사례 바로 확인
              </h2>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">카드를 클릭하여 구제 경로를 분석해보세요</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRESET_CASES.map((preset) => {
                const isSelected = selectedPresetIndex === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset.id)}
                    className={`cursor-pointer group relative p-5 rounded-2xl border bg-white transition-all duration-200 flex flex-col justify-between hover:shadow-lg ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md bg-blue-50/20"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${preset.badgeColor}`}>
                          {preset.badge}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">
                          {preset.source}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {preset.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                        {preset.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                      <span>해결 경로 분석</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Decision Engine / Wizard */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 text-blue-700 rounded-xl text-sm">🧭</span>
                  맞춤형 구제 기관 진단 마법사
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  질문에 답하며 상황에 맞는 최적의 구제 경로를 찾아보세요.
                </p>
              </div>
              <button
                onClick={handleResetWizard}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>처음부터 다시</span>
              </button>
            </div>

            {/* Q1 Section */}
            <div className="space-y-3">
              <label className="block text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                Q1. 누구(어떤 주체)에 의해 권리가 침해되었나요?
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <button
                  onClick={() => handleStep1Select("individual")}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    wizardStep1 === "individual"
                      ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20 font-bold"
                      : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/80"
                  }`}
                >
                  <span className="font-bold text-sm block text-slate-900">👤 다른 개인 / 일반인</span>
                  <span className="text-xs text-slate-500 mt-1 block">폭행, 사기, 악플, 빌려준 돈 미지급 등</span>
                </button>

                <button
                  onClick={() => handleStep1Select("government_action")}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    wizardStep1 === "government_action"
                      ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20 font-bold"
                      : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/80"
                  }`}
                >
                  <span className="font-bold text-sm block text-slate-900">🏢 행정기관 / 지자체</span>
                  <span className="text-xs text-slate-500 mt-1 block">위법·부당한 영업정지, 과태료, 행정 처분</span>
                </button>

                <button
                  onClick={() => handleStep1Select("law_power")}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    wizardStep1 === "law_power"
                      ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20 font-bold"
                      : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/80"
                  }`}
                >
                  <span className="font-bold text-sm block text-slate-900">📜 법률 / 국가 공권력 전체</span>
                  <span className="text-xs text-slate-500 mt-1 block">국가 법률이나 공권력이 헌법상 기본권 침해</span>
                </button>

                <button
                  onClick={() => handleStep1Select("discrimination_institution")}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    wizardStep1 === "discrimination_institution"
                      ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20 font-bold"
                      : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/80"
                  }`}
                >
                  <span className="font-bold text-sm block text-slate-900">🚫 차별 행위 / 부당한 제도</span>
                  <span className="text-xs text-slate-500 mt-1 block">성별·장애·출신 차별, 인권 침해적 관행 개선</span>
                </button>

                <button
                  onClick={() => handleStep1Select("media")}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    wizardStep1 === "media"
                      ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20 font-bold"
                      : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/80"
                  }`}
                >
                  <span className="font-bold text-sm block text-slate-900">📡 언론사 (신문, 방송, 인터넷)</span>
                  <span className="text-xs text-slate-500 mt-1 block">허위·왜곡 보도, 초상권 침해, 명예훼손</span>
                </button>

                <button
                  onClick={() => handleStep1Select("consumer")}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    wizardStep1 === "consumer"
                      ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20 font-bold"
                      : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/80"
                  }`}
                >
                  <span className="font-bold text-sm block text-slate-900">🛒 기업 / 판매자 (소비자 피해)</span>
                  <span className="text-xs text-slate-500 mt-1 block">불량 제품 환불 거부, 부당한 계약 위반</span>
                </button>
              </div>
            </div>

            {/* Q2 Section (Dynamic based on Q1) */}
            {wizardStep1 && ["individual", "government_action", "law_power"].includes(wizardStep1) && (
              <div className="pt-4 border-t border-slate-100 space-y-3 animate-fadeIn">
                <label className="block text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  Q2. 세부 상황 및 원하는 구제 방식을 선택하세요.
                </label>

                {wizardStep1 === "individual" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => handleStep2Select("court_criminal")}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        selectedResultKey === "court_criminal"
                          ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20"
                          : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/80"
                      }`}
                    >
                      <span className="font-bold text-sm block text-slate-900">🚨 폭행, 사기, 절도 등 범죄 피해</span>
                      <span className="text-xs text-slate-500 mt-1 block">가해자의 엄중한 처벌을 원함</span>
                    </button>

                    <button
                      onClick={() => handleStep2Select("court_civil")}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        selectedResultKey === "court_civil"
                          ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20"
                          : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/80"
                      }`}
                    >
                      <span className="font-bold text-sm block text-slate-900">💸 금전 피해, 명예훼손 손해배상</span>
                      <span className="text-xs text-slate-500 mt-1 block">피해 보상 및 권리 회복을 원함</span>
                    </button>
                  </div>
                )}

                {wizardStep1 === "government_action" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => handleStep2Select("acrc")}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        selectedResultKey === "acrc"
                          ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20"
                          : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/80"
                      }`}
                    >
                      <span className="font-bold text-sm block text-slate-900">⚡ 비용 부담 없이 신속한 해결</span>
                      <span className="text-xs text-slate-500 mt-1 block">행정심판을 통해 빠르고 간편하게 구제</span>
                    </button>

                    <button
                      onClick={() => handleStep2Select("court_admin")}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        selectedResultKey === "court_admin"
                          ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20"
                          : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/80"
                      }`}
                    >
                      <span className="font-bold text-sm block text-slate-900">⚖️ 정식 법원 판결을 통한 해결</span>
                      <span className="text-xs text-slate-500 mt-1 block">행정소송을 제기하여 처분의 적법성 판결</span>
                    </button>
                  </div>
                )}

                {wizardStep1 === "law_power" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => handleStep2Select("ccourt_appeal")}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        selectedResultKey === "ccourt_appeal"
                          ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20"
                          : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/80"
                      }`}
                    >
                      <span className="font-bold text-sm block text-slate-900">👤 국민 개인이 기본권을 침해당함</span>
                      <span className="text-xs text-slate-500 mt-1 block">공권력 행사/불행사로 인한 기본권 피해 구제</span>
                    </button>

                    <button
                      onClick={() => handleStep2Select("ccourt_statute")}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        selectedResultKey === "ccourt_statute"
                          ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20"
                          : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/80"
                      }`}
                    >
                      <span className="font-bold text-sm block text-slate-900">⚖️ 진행 중인 재판의 법률 조항이 헌법에 위배됨</span>
                      <span className="text-xs text-slate-500 mt-1 block">법원에 위헌 심판 제청 신청</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Dynamic Result Display Card (Wizard Selection) */}
            {selectedResultKey && CONCLUSION_DATA[selectedResultKey] && (
              <div className="mt-6 pt-6 border-t border-slate-200 animate-fadeIn">
                {(() => {
                  const res = CONCLUSION_DATA[selectedResultKey];
                  return (
                    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-8 shadow-xl space-y-4 relative overflow-hidden">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-500 text-white shadow-md">
                          {res.agency}
                        </span>
                        <span className="text-xs font-medium text-slate-300">
                          {res.badge}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {res.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                        {res.desc}
                      </p>

                      <div className="pt-3 border-t border-slate-700/60 space-y-1">
                        <span className="text-xs font-bold text-blue-300 block">
                          📋 대표 구제 신청 및 진행 절차
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {res.howTo}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Selected Preset Case Result Display Card */}
            {selectedPresetIndex !== null && PRESET_CASES[selectedPresetIndex] && (
              <div className="mt-6 pt-6 border-t border-slate-200 animate-fadeIn">
                {(() => {
                  const p = PRESET_CASES[selectedPresetIndex];
                  return (
                    <div className="rounded-3xl bg-blue-50/70 border border-blue-200 p-6 sm:p-8 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-700 bg-blue-100 border border-blue-200 px-3 py-1 rounded-full">
                          {p.source}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">선택한 사례 분석</span>
                      </div>

                      <h3 className="text-xl font-extrabold text-slate-900">
                        {p.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-700 bg-white p-4 rounded-2xl border border-slate-200 leading-relaxed">
                        {p.summary}
                      </p>

                      <div className="space-y-3">
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          🎯 권장 구제 기관 및 절차
                        </div>
                        <div className="space-y-2.5">
                          {p.actionPlan.map((act, i) => (
                            <div key={i} className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-sm">{act.agency}</span>
                                <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  {act.type}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed">{act.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium">
                        {p.tips}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: RELIEF ORGANIZATIONS ENCYCLOPEDIA */}
      {/* ========================================================================= */}
      {activeTab === "orgs" && (
        <div className="space-y-8 animate-slideUp">
          
          {/* Header Banner for Encyclopedia */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-4">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
                🏛️ 대한민국 대표 인권 구제 기관 사전
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                인권이 침해당했을 때 사안의 성격에 따라 구제를 신청할 수 있는 국가 기관과 전문 구제 기구의 역할과 접수 창구를 살펴보세요.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="기관명 또는 단어 검색 (예: 민사, 행정, 헌법, 차별...)"
                  value={orgSearchQuery}
                  onChange={(e) => setOrgSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800 text-white placeholder-slate-400 rounded-2xl border border-slate-700 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 items-center">
                {["전체", "사법부", "헌법기구", "독립기구", "전문기관"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setOrgCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      orgCategoryFilter === cat
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Organization Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOrgs.map((org) => (
              <div
                key={org.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-extrabold text-2xl border border-blue-100 shadow-xs">
                      {org.icon}
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${org.badgeColor}`}>
                      {org.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-4">
                    {org.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {org.description}
                  </p>

                  <div className="mt-4 space-y-2.5">
                    {org.details.map((detail, idx) => (
                      <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs">
                        <span className="font-bold text-slate-900 block mb-0.5">{detail.title}</span>
                        <p className="text-slate-600 leading-relaxed">{detail.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    상담/구제 문의:
                  </span>
                  <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                    {org.helpline}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredOrgs.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
              <AlertCircle className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold">검색 조건에 해당되는 구제 기관이 없습니다.</p>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SELF-DIAGNOSIS QUIZ */}
      {/* ========================================================================= */}
      {activeTab === "quiz" && (
        <div className="space-y-8 animate-slideUp">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            
            {/* Quiz Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  ✏️ 인권 구제 기관 자가진단 퀴즈
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  교과서 핵심 내용 및 실전에 응용하는 퀴즈를 풀며 학습 상태를 확인해보세요!
                </p>
              </div>

              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <span className="text-xs font-bold px-3 py-1.5 bg-slate-100 rounded-xl text-slate-700">
                  문제: <span className="text-blue-600">{currentQuizIdx + 1}</span> / {QUIZ_DATA.length}
                </span>
                <span className="text-xs font-extrabold px-3 py-1.5 bg-blue-100 text-blue-800 rounded-xl border border-blue-200">
                  점수: {quizScore}점
                </span>
              </div>
            </div>

            {!quizFinished ? (
              <div className="space-y-6">
                
                {/* Question Info */}
                <div>
                  <span className="inline-block text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-2">
                    {QUIZ_DATA[currentQuizIdx].category}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                    {QUIZ_DATA[currentQuizIdx].question}
                  </h3>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {QUIZ_DATA[currentQuizIdx].options.map((opt, idx) => {
                    const isChosen = selectedQuizAnswer === idx;
                    const isCorrect = idx === QUIZ_DATA[currentQuizIdx].answer;

                    let btnStyle = "border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-slate-50";

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20";
                      } else if (isChosen) {
                        btnStyle = "border-rose-500 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-500/20";
                      } else {
                        btnStyle = "border-slate-200 text-slate-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAnswerQuiz(idx)}
                        className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>
                          {idx + 1}. {opt}
                        </span>

                        {isAnswered && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        )}
                        {isAnswered && isChosen && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Box */}
                {isAnswered && (
                  <div
                    className={`p-5 rounded-2xl text-xs sm:text-sm leading-relaxed border animate-fadeIn ${
                      selectedQuizAnswer === QUIZ_DATA[currentQuizIdx].answer
                        ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                        : "bg-rose-50 border-rose-200 text-rose-950"
                    }`}
                  >
                    <div className="font-extrabold text-sm mb-1 flex items-center gap-1.5">
                      {selectedQuizAnswer === QUIZ_DATA[currentQuizIdx].answer ? (
                        <>🎉 정답입니다!</>
                      ) : (
                        <>❌ 아쉽네요! 정답은 {QUIZ_DATA[currentQuizIdx].answer + 1}번입니다.</>
                      )}
                    </div>
                    <p className="mt-1">{QUIZ_DATA[currentQuizIdx].explanation}</p>
                  </div>
                )}

                {/* Action Button */}
                {isAnswered && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextQuiz}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
                    >
                      <span>{currentQuizIdx < QUIZ_DATA.length - 1 ? "다음 문제" : "최종 결과 확인"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

              </div>
            ) : (
              /* Quiz Result Screen */
              <div className="text-center py-10 space-y-6 animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto text-4xl shadow-inner">
                  🏆
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    퀴즈를 완료했습니다!
                  </h3>
                  <p className="text-slate-600 text-sm">
                    최종 점수: <span className="text-3xl font-black text-blue-600 ml-1">{quizScore}</span> / 100점
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  {quizScore === 100
                    ? "완벽합니다! 인권 침해 구제 기관에 대한 모든 핵심 개념을 마스터하셨습니다. 👏"
                    : quizScore >= 60
                    ? "수고하셨습니다! 틀린 문제의 구제 기관 설명을 다시 한번 정독해보세요. 💡"
                    : "사례 진단 마법사와 구제 기관 사전을 읽고 다시 도전해보세요! 📖"}
                </p>

                <div>
                  <button
                    onClick={handleRestartQuiz}
                    className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-2xl shadow-lg transition-all inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>다시 도전하기</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Footer info */}
      <footer className="text-center text-xs text-slate-400 py-4 border-t border-slate-200">
        <p>중3 사회 · 1단원 인권과 헌법 학습 도우미 | 수연쌤의 아카데미</p>
      </footer>

    </div>
  );
}
