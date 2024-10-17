'use client'
import Image from "next/image";
import Web3BlocksComponent from "../components/web3-blocks";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="fixed w-full">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Navbar />
        <div className="pl-32 pr-8 w-full pt-8">
          <Web3BlocksComponent />
        </div>
        <Sidebar />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Made by Sanjay and Oleg</p>
      </footer>
    </div>
  );
}
