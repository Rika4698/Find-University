"use client"

import React, { useState } from 'react';
import UniversityCard from './UniversityCard';
import Pagination from './Pagination';

function ClientPage({universities, totalPages, currentPage}) {
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

    const selectedUniversities = compareList;
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6'>
                {
                    universities.map((university, index) => (
                        <UniversityCard key={university.id} university={university}     onCompare={toggleCompare}
                        isSelected={compareList.some(u => u.id === university.id)}
                        style={{ animationDelay: `${index * 50}ms` }}/>
                    ))
                }

            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
    );
}

export default ClientPage;