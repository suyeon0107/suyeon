export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--pastel-border)] bg-[var(--pastel-card)] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        {/* 카피라이트 */}
        <div className="md:order-1">
          <p className="text-center text-sm text-[var(--pastel-fg)]/50">
            &copy; {currentYear} 수연쌤의 아카데미. All rights reserved.
          </p>
        </div>

        {/* 링크 */}
        <div className="flex justify-center space-x-6 mt-3 md:mt-0 md:order-2">
          <a
            href="#"
            className="text-xs text-[var(--pastel-fg)]/40 hover:text-[var(--pastel-accent)] transition-colors duration-200"
          >
            이용약관
          </a>
          <a
            href="#"
            className="text-xs text-[var(--pastel-fg)]/40 hover:text-[var(--pastel-accent)] transition-colors duration-200"
          >
            문의하기
          </a>
        </div>
      </div>
    </footer>
  );
}
