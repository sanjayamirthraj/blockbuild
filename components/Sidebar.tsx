import React from 'react';

const sidebarItems = [
  { title: 'Most Popular', subtitle: 'DeFi' },
  { title: 'Derivatives' },
  { title: 'Prediction Markets' },
  { title: 'Rebalancing' },
  { title: 'Gaming' },
];

const Sidebar: React.FC = () => {
  return (
    <div className="w-30 bg-[#141313] text-white h-screen fixed left-0 top-20">
      <nav className="h-4">
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index} className="relative group">
              <a
                href="#"
                className="block px-4 py-2 h-20 hover:bg-gray-800 transition-colors duration-200 flex flex-col justify-end"
              >
                <div className="mb-2">
                  {item.subtitle && (
                    <span className="text-xs text-purple-400 block">{item.subtitle}</span>
                  )}
                  <div className="text-sm break-words">{item.title}</div>
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
