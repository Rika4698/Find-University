"use client"

import { Search, X } from "lucide-react";



function SearchBar() {
    return (
        <form className="max-w-2xl mx-auto flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-xl animate-slide-up delay-300 group focus-within:bg-white/10  transition-all">

            <div className="flex-1 flex items-center relative">
             <Search className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors"/>
             <input placeholder="Search by university, city or country... " className="w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-xl text-white placeholder:text-slate-500 pl-12 pr-10 py-3"/>

            </div>

            <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-600/20 active:scale-95">
             Search
            </button>
            
        </form>
    );
}

export default SearchBar;