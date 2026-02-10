import React from 'react';
import clsx from "clsx";
import Link from 'next/link';
import { MapPin, GraduationCap, Trophy, ShieldCheck, Banknote, CheckCircle, ExternalLink } from "lucide-react";
import Image from 'next/image';

function UniversityCard({ university, onCompare, isSelected, style }) {
    return (
       <div
            style={style}
            className={clsx(
                "bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border flex flex-col h-full animate-slide-up opacity-0 [animation-fill-mode:forwards]",
                isSelected ? "border-purple-500 ring-2 ring-purple-500/20" : "border-gray-100"
            )}
        >
            <Link href={`/universities/${university.id}`} className="h-48 relative overflow-hidden block">
                <Image
                    src={university.image}
                    alt={university.name}
                    width={700} height={700}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                {isSelected && (
                    <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center animate-fade-in">
                        <CheckCircle className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                )}
                <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-purple-900 shadow-sm">
                        Rank #{university.ranking}
                    </span>
                </div>
             
            </Link>

            <div className="p-5 flex-1 flex flex-col">

                   <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-purple-700 drop-shadow-md leading-tight">{university.name}</h3>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-red-500" />
                    {university.city}, {university.country}
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mb-6">
                    <div title='Tuition' className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-lg">
                        <Banknote className="w-4 h-4 mr-2 text-green-600" />
                        <span className="font-semibold">${university.tuition.toLocaleString()}</span>
                    </div>
                    <div title='Safety Index ' className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-lg">
                        <ShieldCheck className="w-4 h-4 mr-2 text-blue-600" />
                        <span  className="font-semibold">{university.safetyIndex}/100</span>
                    </div>
                    <div title='Student Satisfaction' className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-lg">
                        <GraduationCap className="w-4 h-4 mr-2 text-purple-600" />
                        <span className="font-semibold">{university.studentSatisfaction} \u2605</span>
                    </div>
                    <div title='Established' className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-lg">
                        <Trophy className="w-4 h-4 mr-2 text-yellow-600" />
                        <span className="font-semibold">Est. {university.established}</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className={clsx(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            university.scholarship ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        )}>
                            {university.scholarship ? "Scholarships" : "No Scholarship"}
                        </span>
                        <div title='Post Study Work' className="text-[10px] text-gray-400 font-medium">
                            {university.postStudyWork}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Link
                            href={`/universities/${university.id}`}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all border border-gray-100"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Details
                        </Link>
                        <button
                            onClick={() => onCompare(university)}
                            className={clsx(
                                "px-4 py-2 rounded-xl text-xs font-bold transition-all transform active:scale-95 border",
                                isSelected
                                    ? "bg-purple-600 text-white shadow-lg shadow-blue-200 border-purple-600"
                                    : "bg-white text-purple-600 border-blue-100 hover:border-purple-600"
                            )}
                        >
                            {isSelected ? "Selected" : "Compare"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UniversityCard;