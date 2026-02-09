import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { History } from "lucide-react";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "AI 글쓰기 도우미",
  description: "특수교육대상 학생들을 위한 단계별 AI 글쓰기 도우미",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <main className="min-h-screen bg-neutral-50">
          <header className="bg-white border-b border-neutral-200 sticky top-0 z-10 no-print">
            <div className="main-container h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Image 
                  src="/iepon_web_logo.svg" 
                  alt="IEPON Logo" 
                  width={32} 
                  height={32}
                  className="w-auto h-8"
                />
                <h1 className="text-xl font-bold text-primary-600">글쓰기 도우미</h1>
              </Link>
              
              <Link 
                href="/history" 
                className="p-2 text-neutral-500 hover:text-primary-600 hover:bg-neutral-50 rounded-full transition-colors"
                aria-label="작성 이력"
              >
                <History className="w-6 h-6" />
              </Link>
            </div>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
