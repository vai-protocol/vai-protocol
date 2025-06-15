import Image from "next/image";
import WalletInfo from "@/components/WalletInfo";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">VAI Protocol</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Decentralized Investment Platform
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <appkit-button />
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="/bootstrap-bay"
          >
            Enter Bootstrap Bay
          </a>
        </div>

        <div className="text-center sm:text-left max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <ol className="list-inside list-decimal text-sm/6 font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 tracking-[-.01em]">
              Connect your wallet using the button above
            </li>
            <li className="mb-2 tracking-[-.01em]">
              Explore Bootstrap Bay for investment opportunities
            </li>
            <li className="tracking-[-.01em]">
              Participate in the VAI Protocol ecosystem
            </li>
          </ol>
        </div>

        <WalletInfo />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/bootstrap-bay"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Bootstrap Bay
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/vai-protocol"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          VAI Protocol →
        </a>
      </footer>
    </div>
  );
}
