"use client"

import Link from 'next/link';
import React from 'react';
import { GraduationCap} from "lucide-react";


function Navbar() {
    return (
        <div className='bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16 items-center'>
                    <Link href="/" className='flex items-center gap-2'>
                    <div className='bg-purple-600 p-2 rounded-lg'>
                         < GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <span className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-violet-700'>
                        UniFinder
                    </span>
                    </Link>

                </div>

            </div>
            
        </div>
    );
}

export default Navbar;