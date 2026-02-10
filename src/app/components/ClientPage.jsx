"use client"

import React, { useState } from 'react';
import UniversityCard from './UniversityCard';
import Pagination from './Pagination';
import ComparisonModal from './ComparisonModal';
import { X } from "lucide-react";
import clsx from "clsx";
import Image from 'next/image';

function ClientPage({universities, totalPages, currentPage, total}) {
    const [compareList, setCompareList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleCompare = (uni) => {
        setCompareList((prev) => 
        prev.find(u => u.id === uni.id) ? prev.filter((u) => u.id !== uni.id): [...prev, uni]);
    };

    const removeComparison = (id) => {
        setCompareList(prev => prev.filter(u=> u.id !== id));
    }
   // Modal close
    if(isModalOpen && compareList.length === 0){
        setIsModalOpen(false);
    }

      // No data found condition
    if (!universities || universities.length === 0 || total === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                    <svg 
                        className="mx-auto h-24 w-24 text-gray-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                    <h3 className="mt-4 text-xl font-semibold text-gray-900">No Universities Found</h3>
                    <p className="mt-2 text-gray-600">There are no universities matching your criteria.</p>
                </div>
            </div>
        );
    }

    const selectedUniversities = compareList;
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6'>
               {universities.map((university, index) => {
                    
                    return (
                        <UniversityCard
                            key={university.id}
                            university={university}
                            
                            onCompare={toggleCompare}
                            isSelected={compareList.some(u => u.id === university.id)}
                            style={{ animationDelay: `${index * 50}ms` }}
                        />
                    );
                })}

            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} />

               {/* Floating Comparison Bar */}
            {compareList.length > 0 && (
                <div className="fixed bottom-4 md:bottom-6 left-0 right-0 z-40 px-4 animate-slide-up">
                    <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-2xl p-3 md:p-4">
                        {/* Mobile Layout */}
                        <div className="flex flex-col gap-3 md:hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-gray-500">Comparing:</span>
                                    <span className="text-sm font-bold text-purple-600">{compareList.length}</span>
                                </div>
                                <button
                                    onClick={() => setCompareList([])}
                                    className="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Universities List */}
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                                {compareList.map(u => (
                                    <div key={u.id} className="flex items-center gap-2 bg-white border border-blue-100 pl-1 pr-2 py-1 rounded-xl shrink-0">
                                        <Image src={u.image} alt={u.name} width={32} height={32} className="w-8 h-8 rounded-lg object-cover" />
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[10px] font-bold text-purple-700 truncate max-w-[100px]">{u.name}</span>
                                            <span className="text-[8px] text-gray-400 truncate">{u.city}</span>
                                        </div>
                                        <button
                                            onClick={() => toggleCompare(u)}
                                            className="p-1 hover:bg-red-50 hover:text-red-500 rounded-lg text-gray-300 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Compare Button */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                disabled={compareList.length < 2}
                                className={clsx(
                                    "w-full py-3 rounded-xl font-bold text-white transition-all text-sm shadow-lg",
                                    compareList.length < 2
                                        ? "bg-gray-200 text-gray-600 cursor-not-allowed shadow-none"
                                        : "bg-purple-600 hover:bg-purple-700 active:scale-95"
                                )}
                            >
                                {compareList.length < 2 ? 'Select 2+ to Compare' : `Compare ${compareList.length} Universities`}
                            </button>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden md:flex items-center gap-4">
                            <div className="flex flex-col items-center px-4 border-r border-gray-100 h-10 justify-center">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Comparing</span>
                                <span className="text-sm font-bold text-purple-600">{compareList.length}</span>
                            </div>

                            <div className="flex-1 overflow-hidden">
                                <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
                                    {compareList.map(u => (
                                        <div key={u.id} className="flex items-center gap-2 bg-white border border-blue-100 pl-1 pr-2 py-1 rounded-xl shrink-0 group hover:border-purple-300 transition-all shadow-sm">
                                            <Image src={u.image} alt={u.name} width={600} height={600} className="w-8 h-8 rounded-lg object-cover" />
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[10px] font-bold text-purple-700 truncate max-w-[120px]">{u.name}</span>
                                                <span className="text-[8px] text-gray-400 truncate">{u.city}</span>
                                            </div>
                                            <button
                                                onClick={() => toggleCompare(u)}
                                                className="p-1 hover:bg-red-50 hover:text-red-500 rounded-lg text-gray-300 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pl-4 border-l border-gray-100">
                                <button
                                    onClick={() => setCompareList([])}
                                    className="text-[10px] font-bold text-gray-400 hover:text-red-500 px-3 py-2 transition-colors uppercase tracking-wider"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    disabled={compareList.length < 2}
                                    className={clsx(
                                        "px-6 py-2.5 rounded-xl font-bold text-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap text-xs shadow-lg",
                                        compareList.length < 2
                                            ? "bg-gray-200 text-gray-600 cursor-not-allowed shadow-none"
                                            : "bg-purple-600 hover:bg-purple-700 shadow-blue-600/20"
                                    )}
                                >
                                 
                                    {compareList.length < 2 ? 'Select 2+ to Compare' : `Compare ${compareList.length} Universities`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <ComparisonModal
                    universities={selectedUniversities}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onRemove={removeComparison}
                />
            )}
        </div>
    );
}

export default ClientPage;