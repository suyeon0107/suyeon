import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        {/* 소셜 링크 또는 유틸리티 링크 플레이스홀더 */}
        <div className="flex justify-center space-x-6 md:order-2">
          <Link
            href="#"
            className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200"
          >
            이용약관
          </Link>
          <Link
            href="#"
            className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200"
          >
            개인정보처리방침
          </Link>
          <Link
            href="#"
            className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200"
          >
            문의하기
          </Link>
          
          {/*여기에 추가적인 푸터 링크를 입력하세요. */}
        </div>

        {/* 카피라이트 정보 */}
        <div className="mt-4 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            &copy; {currentYear} 사회공작실. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
