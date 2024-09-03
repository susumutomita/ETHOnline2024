"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import MinaWalletConnect from "@/components/AuroWallet/MinaWalletConnect"; // MinaWalletConnectをインポート
import { ConnectKitButton } from "connectkit";

export default function NavBar() {
  const scrolled = useScroll(50);

  return (
    <>
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="BlockFeedback logo"
              width={30}
              height={30}
              className="mr-2 rounded-sm"
            />
            <p>BlockFeedback</p>
          </Link>
          <nav className="flex items-center space-x-4 ml-10">
            <Link
              href="/feedback/create"
              className="text-gray-500 hover:underline"
            >
              Create Feedback Form
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/feedback/results"
              className="text-gray-500 hover:underline"
            >
              View Feedback Results
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/about" className="text-gray-500 hover:underline">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4 ml-auto">
            {/* ConnectKitButtonの代わりにMinaWalletConnectを使用 */}
            <MinaWalletConnect />
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <ConnectKitButton />
          </div>
        </div>
      </div>
    </>
  );
}
