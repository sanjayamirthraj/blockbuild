import { History, Share2, Zap } from 'lucide-react'
import { Button } from './ui/Button'
import { useState } from 'react'
import { VariablesModal } from './VariablesModal'

export function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div className="h-14 flex items-center justify-between px-4 bg-[#161618]">
                <div className="flex items-center gap-3">
                    <Zap className="size-6" />
                    <h1 className="text-[32px] font-semibold text-white">Charging Station</h1>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="standard" className="px-2">
                        <History className="h-5 w-5" />
                    </Button>
                    <Button variant="standard" onClick={() => setIsModalOpen(true)}>
                        Edit Variables
                    </Button>
                    <Button variant="standard" className="px-2">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <VariablesModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
} 