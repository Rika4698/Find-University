"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

export default function FilterSidebar({ countries }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Derive values directly from searchParams
    const minTuition = parseInt(searchParams.get("minTuition") || "0");
    const maxTuition = parseInt(searchParams.get("maxTuition") || "100000");
    const maxRanking = parseInt(searchParams.get("maxRanking") || "100");
    const minSafetyIndex = parseInt(searchParams.get("minSafetyIndex") || "0");
    const minSatisfaction = parseFloat(searchParams.get("minSatisfaction") || "0");
    const minYear = parseInt(searchParams.get("minYear") || "1000");
    const maxYear = parseInt(searchParams.get("maxYear") || "2025");
    const scholarship = searchParams.get("scholarship") === "true";
    const selectedCountries = searchParams.getAll("country") || [];

    const updateFilters = useCallback((key, value) => {
        const params = new URLSearchParams(searchParams);

        if (Array.isArray(value)) {
            params.delete(key);
            value.forEach(v => params.append(key, v));
        } else {
            if (value === "" || value === 0 || value === false || (key === 'maxTuition' && value === 100000) || (key === 'maxRanking' && value === 100) || (key === 'minYear' && value === 1000) || (key === 'maxYear' && value === 2025)) {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        }

        // Reset to page 1 on any filter change
        params.delete("page");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, router, searchParams]);

    const handleCountryToggle = (country) => {
        const newCountries = selectedCountries.includes(country)
            ? selectedCountries.filter((c) => c !== country)
            : [...selectedCountries, country];

        updateFilters("country", newCountries);
    };

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            <div className={`
                fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm lg:hidden transition-opacity duration-300
                ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `} onClick={() => setIsMobileOpen(false)} />

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden w-full mb-6 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all text-sm uppercase tracking-widest relative z-30"
            >
                <SlidersHorizontal className="w-5 h-5" />
                Filter & Sort Universities
            </button>

            {/* Sidebar Container */}
            <div className={`
                /* Desktop: Standard positioning */
                 lg:block lg:w-full lg:max-w-none lg:p-6 lg:rounded-xl lg:shadow-lg lg:border lg:border-gray-100 lg:sticky lg:top-24 lg:z-0 lg:animate-fade-in lg:translate-x-0 lg:transform-none bg-white
                
                /* Mobile: Drawer positioning */
                fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[110] p-8 space-y-8 overflow-y-auto 
                transition-transform duration-500 ease-in-out
                ${isMobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            `}>
                {/* Mobile-only Header */}
                <div className="flex items-center justify-between lg:hidden mb-4 pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                    <button onClick={() => setIsMobileOpen(false)} className="p-2 bg-gray-50 rounded-xl">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
                        Countries
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {countries.map((country) => (
                            <label key={country} className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedCountries.includes(country)}
                                    onChange={() => handleCountryToggle(country)}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition duration-150 ease-in-out"
                                />
                                <span className="text-gray-600 group-hover:text-blue-600 transition-all text-sm group-hover:translate-x-1 duration-200">{country}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Max Ranking: {maxRanking}</h3>
                    <input
                        type="range"
                        min="1"
                        max="200"
                        value={maxRanking}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            updateFilters("maxRanking", val);
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>Top 1</span>
                        <span>Top 200+</span>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Tuition Range</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <span className="w-16 text-right">${minTuition.toLocaleString()}</span>
                        <span className="text-gray-300">-</span>
                        <span className="w-16">${maxTuition.toLocaleString()}</span>
                    </div>
                    <div className="space-y-4">
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="1000"
                            value={maxTuition}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                updateFilters("maxTuition", val);
                            }}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Campus Safety Score</h3>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Min Score: {minSafetyIndex}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={minSafetyIndex}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            updateFilters("minSafetyIndex", val);
                        }}
                        className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Min Stud. Satisfaction: {minSatisfaction}</h3>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={minSatisfaction}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            updateFilters("minSatisfaction", val);
                        }}
                        className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-600"
                    />
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Established Era</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <span className="w-12">{minYear}</span>
                        <span className="text-gray-300">-</span>
                        <span className="w-12">{maxYear}</span>
                    </div>
                    <div className="space-y-4">
                        <input
                            type="range"
                            min="1000"
                            max="2025"
                            step="10"
                            value={minYear}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                updateFilters("minYear", val);
                            }}
                            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <input
                            type="range"
                            min="1000"
                            max="2025"
                            step="10"
                            value={maxYear}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                updateFilters("maxYear", val);
                            }}
                            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600 mt-2"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Scholarship Available</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={scholarship}
                            onChange={(e) => {
                                const val = e.target.checked;
                                updateFilters("scholarship", val);
                            }}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <button
                    onClick={() => router.push(pathname)}
                    className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                    Reset Filters
                </button>
            </div>
        </>
    );
}
