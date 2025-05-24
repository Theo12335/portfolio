// components/categories.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { allIcons, categories, IconData, CategoryId } from '@/data/icons';

const CategorizedIconsDisplay: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  // Function to filter icons based on the active category
  const getFilteredIcons = (): IconData[] => {
    if (activeCategory === 'all') {
      return allIcons;
    }
    return allIcons.filter(icon => icon.category === activeCategory);
  };

  const filteredIcons = getFilteredIcons();

  return (
    <div className="w-full text-white py-6 rounded-lg shadow-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
      <div className="flex flex-row items-center justify-center mb-8 border-b border-gray-700 pb-2 w-full px-[4%] mt-[-10]">
        <div className="flex justify-start items-left w-[50%] py-2">
          <h2 className="flex lg:text-4xl md:text-3xl font-bold">
            Tech <span className="text-[#C1E8FF]">Stack</span>
          </h2>
        </div>
        <div className="flex justify-end items-right w-[50%] gap-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as CategoryId)}
              className={`
              text-base py-1 px-2 rounded-3xl text-sm font-semibold
              transition-all duration-300 ease-in-out
              ${activeCategory === category.id
                  ? 'bg-[#00a6c0] text-white shadow-lg transform scale-105' // Active style
                  : ' text-gray-300 hover:bg-gray-600 hover:text-white' // Inactive style
                }
            `}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Icon Display Area */}
      {
        filteredIcons.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 justify-items-center">
            {filteredIcons.map((icon) => (
              <div
                key={icon.id}
                className="flex flex-col backdrop-filter-none items-center p-4 rounded-lg
                         transform hover:scale-110 transition-transform duration-200 cursor-pointer
                         w-32 h-32 justify-center text-center group hover:shadow-md"
              >
                {/* Render the icon image directly */}
                <Image
                  src={icon.imageSrc}
                  alt={icon.name}
                  width={60} // Adjust width as needed for your icons
                  height={60} // Adjust height as needed for your icons
                  className="mb-2 object-contain" // object-contain ensures image fits without cropping
                />
                <span className="text-sm font-medium text-gray-200">{icon.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-xl py-10">
            No icons found for this category.
          </div>
        )
      }
    </div >
  );
};

export default CategorizedIconsDisplay;