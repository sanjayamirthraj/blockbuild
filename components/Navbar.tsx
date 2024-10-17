import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Settings, FolderKanban, FileText, GraduationCap, Bug } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const { theme, setTheme } = useTheme();

    return (
        <nav className="w-full bg-[#141313] text-white border-b border-gray-800">
            <div className="container mx-auto px-4 py-2 flex items-center">
                <div className="flex items-center space-x-4 flex-grow">
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                        <span className="font-bold">AVA PROTOCOL</span>
                    </div>
                    <span className="text-gray-500">×</span>
                    <span className="text-gray-300">Building Blocks</span>
                </div>
                <div className="flex items-center space-x-6">
                    <NavItem icon={<Settings size={18} />} text="Settings" />
                    <NavItem icon={<FolderKanban size={18} />} text="Projects" />
                    <NavItem icon={<FileText size={18} />} text="Files" />
                    <NavItem icon={<GraduationCap size={18} />} text="Tutorials" />
                    <NavItem icon={<Bug size={18} />} text="Report Bug" />
                </div>
            </div>
        </nav>
    );
}

function NavItem({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <Link href="#" className="flex items-center space-x-1 text-sm text-gray-300 hover:text-white">
            {icon}
            <span>{text}</span>
        </Link>
    );
}
