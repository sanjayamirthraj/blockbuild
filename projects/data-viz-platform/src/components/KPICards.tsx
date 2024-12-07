import { Info } from 'lucide-react'

type KPICardData = {
  title: string
  value: string | number
  description: string
  prefix?: string
  suffix?: string
}

const kpiData: KPICardData[] = [
  {
    title: 'Infrastructure Units',
    value: 421.07,
    description: 'This describes variable two and what the shown data means.',
    prefix: '€'
  },
  {
    title: 'Charging Growth',
    value: 33.07,
    description: 'This describes variable two and what the shown data means.'
  },
  {
    title: 'Localization change',
    value: 21.9,
    description: 'This describes variable two and what the shown data means.',
    suffix: '%'
  },
  {
    title: 'Fleet growth',
    value: 7.03,
    description: 'This describes variable two and what the shown data means.',
    suffix: '%'
  }
]

export function KPICards() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {kpiData.map((card, index) => (
        <div 
          key={index}
          className="rounded-[5px] border border-[#525252] bg-[#222324] p-8 flex flex-col h-[214px]"
        >
          <div className="flex flex-col mb-[78px] text-left">
            <div className="flex w-full items-center justify-between mb-2">
              <h3 className="text-[18px] font-medium text-white">{card.title}</h3>
              <Info className="h-4 w-4 text-gray-400/60" />
            </div>
            <p className="text-[12px] text-[#BBBBBB] text-left">
              {card.description}
            </p>
          </div>
          
          <div className="mt-auto flex justify-end">
            <p className="text-[32px] font-bold text-white leading-none">
              {card.prefix}{card.value}{card.suffix}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}