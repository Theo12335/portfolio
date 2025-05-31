// components/categories.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import Link from 'next/link'; // <--- IMPORT Link HERE
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
            Tech <span className="text-[#C1E8FF] ml-2"> Stack</span>
          </h2>
        </div>
        <div className="flex justify-end items-right w-[50%] gap-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as CategoryId)}
              className={`
              text-base py-1 px-2 rounded-3xl font-semibold
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
              // <--- ADD THIS CONDITIONAL LINK WRAPPER HERE ---
              icon.link ? (
                <Link
                  key={icon.id} // Key should be on the outermost element of the map
                  href={icon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col backdrop-filter-none items-center p-4 rounded-lg
                             transform hover:scale-110 transition-transform duration-200 cursor-pointer
                             w-32 h-32 justify-center text-center group hover:shadow-md"
                >
                  <Image
                    src={icon.imageSrc}
                    alt={icon.name}
                    width={60}
                    height={60}
                    className="mb-2 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-200">{icon.name}</span>
                </Link>
              ) : (
                // If no link, render a non-clickable div
                <div
                  key={icon.id}
                  className="flex flex-col backdrop-filter-none items-center p-4 rounded-lg
                             transform hover:scale-110 transition-transform duration-200
                             w-32 h-32 justify-center text-center group hover:shadow-md" // Removed cursor-pointer as it's not clickable
                >
                  <Image
                    src={icon.imageSrc}
                    alt={icon.name}
                    width={60}
                    height={60}
                    className="mb-2 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-200">{icon.name}</span>
                </div>
              )
              // <--- END OF CONDITIONAL LINK WRAPPER ---
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