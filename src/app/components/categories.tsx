// components/categories.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allIcons, categories, IconData, CategoryId } from '@/data/icons'; // Assuming this path is correct
import { Bars3Icon } from '@heroicons/react/24/outline'; // For the mobile category burger. Ensure @heroicons/react is installed.

const CategorizedIconsDisplay: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false); // State for mobile category menu

    const getFilteredIcons = (): IconData[] => {
        if (activeCategory === 'all') {
            return allIcons;
        }
        return allIcons.filter(icon => icon.category === activeCategory);
    };

    const filteredIcons = getFilteredIcons();

    const currentCategoryName = categories.find(cat => cat.id === activeCategory)?.name || categories[0].name;


    return (
        <div className="w-full text-white py-6 rounded-lg shadow-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            {/* Header Section: Title and Category Filters/Burger */}
            <div className="flex flex-row items-center justify-center mb-8 border-b border-gray-700 pb-2 w-full px-[4%] mt-[-10]">
                {/* Title (original structure, responsive text size added) */}
                <div className="flex justify-start items-center w-[50%] py-2"> {/* Changed items-left to items-center for better vertical alignment if text wraps */}
                    <h2 className="flex text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold"> {/* Added base and sm text sizes */}
                        Tech <span className="text-[#C1E8FF] ml-2"> Stack</span>
                    </h2>
                </div>

                {/* Right side: Contains Desktop Category Buttons OR Mobile Category Burger */}
                <div className="flex justify-end items-center w-[50%]">
                    {/* Desktop Category Buttons (Original structure, hidden on mobile) */}
                    <div className="hidden md:flex gap-1">
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

                    {/* Mobile Category Burger Button (visible on mobile only) */}
                    <div className="flex md:hidden relative"> {/* Added relative for dropdown positioning */}
                        <button
                            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                            className="flex items-center text-sm py-2 px-3 rounded-lg font-semibold text-gray-200 border border-gray-600 hover:bg-gray-600 hover:text-white transition-colors duration-200"
                        >
                            <span>{currentCategoryName}</span>
                            <Bars3Icon className="h-5 w-5 ml-2" />
                        </button>
                        {/* Mobile Category Dropdown Menu */}
                        {isCategoryMenuOpen && (
                            <div className="absolute top-full right-0 mt-1 w-48 bg-slate-700 rounded-md shadow-lg z-20 py-1 border border-slate-600">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setActiveCategory(category.id as CategoryId);
                                            setIsCategoryMenuOpen(false);
                                        }}
                                        className={`block w-full text-left px-3 py-2 text-sm font-medium
                                            ${activeCategory === category.id
                                                ? 'bg-[#00a6c0] text-white'
                                                : 'text-gray-200 hover:bg-slate-600 hover:text-white'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Icon Display Area */}
            {filteredIcons.length > 0 ? (
                // Grid: 3 cols on mobile, then responsive up to 6. Gap also responsive.
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3 justify-items-center px-2 md:px-0">
                    {filteredIcons.map((icon) => {
                        // Icon Item container: responsive width, height, padding.
                        const itemClasses = `
                            flex flex-col items-center rounded-lg
                            transform hover:scale-110 transition-transform duration-200
                            w-24 h-24 p-2 text-xs
                            md:w-32 md:h-32 md:p-4 md:text-sm
                            justify-center text-center group hover:shadow-md
                        `;
                        // Text: responsive font size and margin.
                        const textClasses = "font-medium text-gray-200";
                        const imageMarginClass = "mb-1 md:mb-2";

                        return icon.link ? (
                            <Link
                                key={icon.id}
                                href={icon.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${itemClasses} cursor-pointer`}
                            >
                                <Image
                                    src={icon.imageSrc}
                                    alt={icon.name}
                                    width={60} // Kept original, will scale down with object-contain
                                    height={60}
                                    className={`${imageMarginClass} object-contain`}
                                />
                                <span className={textClasses}>{icon.name}</span>
                            </Link>
                        ) : (
                            <div
                                key={icon.id}
                                className={itemClasses} // Non-clickable div has same sizing
                            >
                                <Image
                                    src={icon.imageSrc}
                                    alt={icon.name}
                                    width={60} // Kept original
                                    height={60}
                                    className={`${imageMarginClass} object-contain`}
                                />
                                <span className={textClasses}>{icon.name}</span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center text-gray-400 text-xl py-10">
                    No icons found for this category.
                </div>
            )}
        </div>
    );
};

export default CategorizedIconsDisplay;