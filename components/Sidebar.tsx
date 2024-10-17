import { ul } from 'framer-motion/client';
import React from 'react';

const sidebarItems = [
  { title: 'DeFi', subtitle: 'Most Popular' },
  { title: 'Derivatives' },
  { title: 'Prediction' },
  { title: 'Rebalancing' },
  { title: 'Gaming' },
];

const Sidebar: React.FC = () => {
  return (
    <div className="w-32 bg-[#141313] text-white h-screen fixed left-0 top-20 -mt-4 border-r-[1px] border-t-[1px] border-[#555555]">
      <nav className="h-4">
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index} className="relative group">
              <a
                href="#"
                className="translate-x-[1px] px-4 py-2 h-20 transition-all duration-300 flex flex-col justify-end relative overflow-hidden group hover:bg-gradient-to-r hover:from-[#E073FF]/10 hover:to-transparent before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#E073FF]/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-300 border-b border-r border-[#555555]"
              >
                <div className="mb-2 flex flex-col justify-end ">
                  {item.subtitle && (
                    <span className="text-xs text-[#E073FF] block ">{item.subtitle}</span>
                  )}
                  <div className="text-sm break-words group-hover:translate-x-2 transition-transform duration-300 ease-in-out">{item.title}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
