import { Search } from 'lucide-react'
import { Button } from './ui/Button'

export function Navigation() {
  return (
    <nav className="flex w-full items-center justify-between px-4">
      <div className="flex space-x-4">
        <Button variant="selected">
          Charging Stations
        </Button>
        <Button>
          Fleet Sizing
        </Button>
        <Button>
          Parking
        </Button>
      </div>
      
      <div className="relative w-[237px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#EDEDED]/80" />
        <input
          type="search"
          className="w-full rounded-[5px] border border-[#5A5A5A] bg-[#2C2E334D]/30 pl-8 pr-3 py-1.5 text-sm text-[#EDEDED] placeholder-[#EDEDED]/80 focus:border-white/40 focus:outline-none"
          placeholder="Search"
        />
      </div>
    </nav>
  )
} 