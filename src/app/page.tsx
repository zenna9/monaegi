import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <main className="flex w-full max-w-xl flex-col items-center justify-center gap-8 bg-white dark:bg-zinc-900 p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Monaegi (모내기)
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            목표를 심고, 잔디로 수확하세요.<br />
          </p>
        </div>
        
        <div className="flex flex-col gap-4 w-full sm:w-auto mt-4">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#24292e] px-8 font-medium text-white transition-colors hover:bg-[#1b1f23] sm:w-auto"
            href="/api/auth/login"
          >
            GitHub으로 로그인
          </a>
        </div>
      </main>
    </div>
  );
}
