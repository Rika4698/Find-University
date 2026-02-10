"use client"

import React, { useState } from 'react';
import UniversityCard from './UniversityCard';
import Pagination from './Pagination';

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
                    const displayRank = (currentPage - 1) * 12 + index + 1;
                    return (
                        <UniversityCard
                            key={university.id}
                            university={university}
                            displayRank={displayRank}
                            onCompare={toggleCompare}
                            isSelected={compareList.some(u => u.id === university.id)}
                            style={{ animationDelay: `${index * 50}ms` }}
                        />
                    );
                })}

            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
    );
}

export default ClientPage;