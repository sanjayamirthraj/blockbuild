'use client'
import Image from "next/image";
import Web3BlocksComponent from "../components/web3-blocks";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <Web3BlocksComponent /> */}
        <Navbar />
        </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Made by Sanjay and Oleg</p>
      </footer>
    </div>
  );
}
