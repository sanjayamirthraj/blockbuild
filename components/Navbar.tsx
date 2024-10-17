import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Settings, FolderKanban, FileText, GraduationCap, Bug } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const { theme, setTheme } = useTheme();

    return (
        <nav className="w-full bg-[#141313] text-white border-b border-[#555555]">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex flex-row space-x-4 ">
                    <div className="flex items-center space-x-4 flex-grow">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                            <span className="font-bold">WTV PROTOCOL</span>
                        </div>
                        <span className="text-gray-500">×</span>
                        <span className="text-gray-300">Building Blocks</span>
                    </div>

                    <div className="flex items-center">
                        <NavItem icon={<Settings size={18} />} text="Settings" />
                        <NavItem icon={<FolderKanban size={18} />} text="Projects"/>
                        <NavItem icon={<FolderKanban size={18} />} text="Files" />
                    </div>
                </div>

                <div className="flex flex-row justify-end">
                   
                    <div className="flex items-center">
                        <NavItem icon={<GraduationCap size={18} />} text="Tutorials" />
                        <NavItem icon={<Bug size={18} />} text="Report Bug" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavItem({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="h-16 px-10 justify-center items-center inline-flex border-white/30 border-x-[1px] cursor-pointer">
            <div className="text-white text-base font-normal font-['Satoshi Variable']">{text}</div>
        </div>
    );
}
