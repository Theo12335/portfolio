'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allIcons, categories, IconData, CategoryId } from '@/data/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const CategorizedIconsDisplay: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

    const getFilteredIcons = (): IconData[] => {
        if (activeCategory === 'all') {
            return allIcons;
        }
        return allIcons.filter(icon => icon.category === activeCategory);
    };

    const filteredIcons = getFilteredIcons();
    const currentCategoryName = categories.find(cat => cat.id === activeCategory)?.name || categories[0].name;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full py-8">
            {/* Section Header */}
            <div className="text-center mb-12">
                <motion.h2
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Tech <span className="bg-gradient-to-r from-[#06b6d4] to-[#67e8f9] bg-clip-text text-transparent">Stack</span>
                </motion.h2>
                <motion.p
                    className="text-gray-400 text-base sm:text-lg max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Technologies and tools I work with
                </motion.p>
            </div>

            {/* Filter Tabs - Desktop */}
            <motion.div
                className="hidden md:flex justify-center gap-2 mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id as CategoryId)}
                        className={`
                            px-5 py-2.5 rounded-full text-sm font-medium
                            transition-all duration-300 ease-out
                            ${activeCategory === category.id
                                ? 'bg-[#06b6d4] text-white shadow-lg shadow-[#06b6d4]/25'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                            }
                        `}
                    >
                        {category.name}
                    </button>
                ))}
            </motion.div>

            {/* Filter Tabs - Mobile */}
            <motion.div
                className="flex md:hidden justify-center mb-8 px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="relative">
                    <button
                        onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                        {currentCategoryName}
                        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isCategoryMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 sm:w-48 bg-[#0c1929]/95 backdrop-blur-xl rounded-xl shadow-xl z-20 py-2 border border-white/10 overflow-hidden"
                            >
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setActiveCategory(category.id as CategoryId);
                                            setIsCategoryMenuOpen(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2.5 text-sm font-medium transition-colors duration-200
                                            ${activeCategory === category.id
                                                ? 'bg-[#06b6d4] text-white'
                                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Icons Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-3 md:gap-4 px-4 md:px-8"
                >
                    {filteredIcons.map((icon) => {
                        const content = (
                            <>
                                <div className="relative mb-2 transition-transform duration-300 group-hover:scale-110">
                                    <Image
                                        src={icon.imageSrc}
                                        alt={icon.name}
                                        width={40}
                                        height={40}
                                        className="object-contain w-8 h-8 md:w-10 md:h-10"
                                    />
                                </div>
                                <span className="text-[10px] md:text-xs font-medium text-gray-400 group-hover:text-white transition-colors duration-300 text-center leading-tight">
                                    {icon.name}
                                </span>
                            </>
                        );

                        const wrapperClassName = "group flex flex-col items-center justify-center p-3 md:p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-[#06b6d4]/30 transition-all duration-300 cursor-pointer aspect-square";

                        return (
                            <motion.div
                                key={icon.id}
                                variants={itemVariants}
                                transition={{ duration: 0.3 }}
                            >
                                {icon.link ? (
                                    <Link
                                        href={icon.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={wrapperClassName}
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    <div className={wrapperClassName}>
                                        {content}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredIcons.length === 0 && (
                <div className="text-center text-gray-500 py-16">
                    <p className="text-lg">No technologies found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default CategorizedIconsDisplay;
