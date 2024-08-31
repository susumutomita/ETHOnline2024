"use client";

import Card from "@/components/home/card";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0 text-center">
        <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]">
          Welcome to BlockFeedback
        </h1>
        <p className="mt-6 text-center text-gray-500 md:text-xl">
          Collect and analyze real-time feedback from your customers, securely
          and efficiently.
        </p>
      </div>

      <div className="mt-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-2 xl:px-0">
        <Card
          title="Create Feedback Form"
          description="Want to gather feedback from your customers and improve their experience? Click here to create a feedback form."
          demo={
            <Link href="/feedback">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Create Feedback Form
              </button>
            </Link>
          }
        />

        <Card
          title="View Feedback Results"
          description="Already collected feedback? View the results and analyze customer insights to enhance your services."
          demo={
            <Link href="/feedback/results">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                View Feedback Results
              </button>
            </Link>
          }
        />
      </div>
    </>
  );
}
