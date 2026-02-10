"use client";

import { X, MapPin } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

export default function ComparisonModal({ universities, isOpen, onClose, onRemove }) {
    if (!isOpen || universities.length === 0) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-2 md:p-4 animate-fade-in overflow-hidden">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col border border-white/20 relative">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
                    <div>
                        <h2 className="text-2xl font-extrabold text-purple-900">Compare Institutions</h2>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Side-by-side analysis</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-gray-100 rounded-2xl transition-all active:scale-95 border border-transparent hover:border-gray-200 group"
                    >
                        <X className="w-6 h-6 text-gray-500 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                <div className="flex-1 overflow-auto group/scroll relative">
                    <div className="min-w-[700px] md:min-w-[900px]  border-collapse">
                        {/* Header Row: Mini Cards */}
                        <div className="grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] border-b border-gray-100 bg-gray-50/50 sticky top-0 z-30">
                            <div className="flex items-center px-3 md:px-8 font-extrabold text-[#94a3b8] text-[10px] md:text-[13px] uppercase tracking-[0.2em] bg-gray-50 sticky left-0 z-40 border-r border-gray-100 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.05)] ">
                                Parameter
                            </div>
                            <div className="flex divide-x divide-gray-100 bg-white">
                                {universities.map((u) => (
                                    <div key={u.id} className="flex-1 p-4 md:p-6 relative group animate-fade-in bg-white/40 min-w-[200px] md:min-w-[220px]">
                                        <button
                                            onClick={() => onRemove(u.id)}
                                            className="absolute top-2 md:top-4 right-2 md:right-4 p-1.5 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm active:scale-90 z-10"
                                        >
                                            <X className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                        </button>
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden mb-3 md:mb-4 border-2 md:border-4 border-white shadow-xl ring-1 ring-gray-100 group-hover:scale-105 transition-transform duration-500">
                                                <Image src={u.image} alt={u.name} width={900} height={900} className="w-full h-full object-cover" />
                                            </div>
                                            <h4 className="font-extrabold text-purple-900 text-[12px] md:text-base leading-tight mb-1 md:mb-2 line-clamp-2 px-1">{u.name}</h4>
                                            <div className="hidden md:flex text-[12px] text-gray-500 font-semibold items-center justify-center gap-1.5 bg-gray-100/50 px-3 py-1 rounded-full">
                                                <MapPin className="w-3 h-3 text-red-500 text-base" />
                                                {u.city}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Comparison Rows */}
                        {[
                            { label: "Tuition", key: "tuition", format: (v) => <span className="font-bold text-green-600">${v.toLocaleString()}</span> },
                            { label: "Rank", key: "ranking", format: (v) => <span className="font-extrabold text-blue-600">#{v}</span> },
                            { label: "Safety", key: "safetyIndex", format: (v) => <span className="font-semibold text-gray-700">{v}/100</span> },
                            { label: "Rating", key: "studentSatisfaction", format: (v) => <span className="font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-lg">{v} ★</span> },
                            { label: "Visa", key: "postStudyWork", format: (v) => <span className="text-[10px] md:text-[13px] font-bold text-gray-400">{v}</span> },
                            { label: "Founded", key: "established", format: (v) => <span className="text-gray-500">{v}</span> },
                            {
                                label: "Grant",
                                key: "scholarship",
                                format: (v) => v ?
                                    <span className="bg-green-500 text-white px-2 py-0.5 rounded text-[10px] md:text-base font-black uppercase shadow-sm">Yes</span> :
                                    <span className="text-gray-300 text-[10px] md:text-base  font-bold uppercase">N/A</span>
                            },
                        ].map((row, rowIndex) => (
                            <div key={row.key} className="grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] border-b border-gray-50 group hover:bg-blue-50/20 transition-colors">
                                <div className={clsx(
                                    "p-3 md:p-6 font-bold text-gray-500 flex items-center text-[10px] md:text-[13px] uppercase tracking-widest transition-colors border-r border-gray-50/50 sticky left-0 z-20 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.05)]",
                                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                                )}>
                                    {row.label}
                                </div>
                                <div className="flex divide-x divide-gray-50">
                                    {universities.map((u) => (
                                        <div key={`${u.id}-${row.key}`} className={clsx(
                                            "flex-1 p-4 md:p-6 text-[10px] md:text-sm text-gray-800 text-center min-w-[200px] md:min-w-[220px] flex items-center justify-center transition-colors",
                                            rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                                        )}>
                                            {row.format(u[row.key])}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="p-3 bg-gray-50/80 border-t border-gray-100 backdrop-blur-md flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-white text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition-all border border-gray-200 shadow-sm active:scale-95"
                    >
                        Close Comparison
                    </button>
                   
                </div>
            </div>
        </div>
    );
}
