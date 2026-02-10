"use client"

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function SearchBar({ defaultValue = "" }) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [query, setQuery] = useState(defaultValue);

    useEffect(() => {
        setQuery(defaultValue);
    }, [defaultValue]);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
            params.set("search", trimmedQuery);
        } else {
            params.delete("search");
        }
        params.delete("page");
        const queryString = params.toString();
        router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    };

    const clearSearch = () => {
        setQuery("");
        const params = new URLSearchParams(searchParams);
        params.delete("search");
        params.delete("page");
        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname);
    };

    return (
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-xl animate-slide-up delay-300 group focus-within:bg-white/10  transition-all">

            <div className="flex-1 flex items-center relative">
             <Search className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors"/>
             <input value={query}
                    onChange={(e) => setQuery(e.target.value)} placeholder="Search by university, city or country... " className="w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-xl text-white placeholder:text-slate-500 pl-12 pr-10 py-3"/>

                    {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-2 p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
 
            </div>

            <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-600/20 active:scale-95">
             Search
            </button>
            
        </form>
    );
}

export default SearchBar;