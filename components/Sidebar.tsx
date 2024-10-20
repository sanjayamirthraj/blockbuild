import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { title: 'DeFi', subtitle: 'Most Popular', href: '/' },
  { title: 'Derivatives', href: '/derivatives' },
  { title: 'Prediction', href: '/prediction' },
  { title: 'Rebalancing', href: '/rebalancing' },
  { title: 'Gaming', href: '/gaming' },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-32 bg-[#141313] text-white h-screen fixed left-0 top-20 -mt-4 border-r-[1px] border-t-[1px] border-[#555555]">
      <nav className="h-4">
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link legacyBehavior href={item.href} passHref>
                <a
                  className={`translate-x-[1px] px-4 py-2 h-20 transition-all duration-300 flex flex-col justify-end relative overflow-hidden group hover:bg-gradient-to-r hover:from-[#7392FF]/10 hover:to-transparent before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#7392FF]/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-300 border-b border-r border-[#555555] ${
                    pathname === item.href ? 'bg-[#7392FF]/10' : ''
                  }`}
                >
                  <div className="mb-2 flex flex-col justify-end ">
                    {item.subtitle && (
                      <span className="text-xs text-[#7392FF] block ">{item.subtitle}</span>
                    )}
                    <div className="text-sm break-words group-hover:translate-x-2 transition-transform duration-300 ease-in-out">{item.title}</div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
