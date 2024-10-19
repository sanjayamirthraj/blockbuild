'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { RainbowButton } from '@/components/ui/rainbow-button';
import { Sparkles } from 'lucide-react';
import { Blocks } from 'lucide-react';
import { HeartCrack } from 'lucide-react';

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center min-h-screen text-white">
            <Sidebar />
            <Navbar />
            <div className="flex flex-col items-center justify-center text-center min-h-screen">
                <div className="flex flex-row py-2 px-3 bg-[#312113] rounded-full border border-[#583115] justify-center items-center mb-4">
                    <div className="text-[#de8d41] text-xs font-normal flex flex-row  items-center">No Projects Deployed Yet <HeartCrack className="ml-2 h-3 w-3"/></div>
                </div>

                <div className="flex flex-col space-y-4 w-full max-w-xs">
                    <p className="text-4xl font-light mb-2">Deploy Your First Project Now</p>
                    <div className="flex flex-col space-y-4 w-full px-6">
                        <Button variant="outline" className="h-11 group">
                            Start Manually
                            <Blocks className="ml-2 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                        <RainbowButton className="h-10 rounded-md text-sm group">
                            Use AI
                            <Sparkles className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </RainbowButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
