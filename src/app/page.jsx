import Image from "next/image";
import SearchBar from "./components/SearchBar";


export default async function Page() {
  return (
    <div className="bg-gray-50 pb-12 overflow-x-hidden">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden animate-fade-in">

          <Image
          src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1600&q=80" width={700} height={700} alt="Modern University Campus"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay scale-110 animate-pulse-subtle"
          />

           <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-[#1e293b]/90 to-[#334155] opacity-0" />

        </div>

        <div className="max-w-7xl mx-auto text-center space-y-6 md:space-y-8 relative z-10">
          <div className="inline-block px-4 py-1.5 mb-2 bg-purple-50/10 border border-purple-500 backdrop-blur-md rounded-full text-purple-400 text-[10px] md:text-sm font-bold tracking-wider uppercase animate-fade-in">
            Global University Discovery
            
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.1] animate-slide-up delay-100"> Find the <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-300">Perfect University</span> <br className="hidden md:block"/> for Your Future

          </h1>
          <p className="text-base md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200 px-4">Navigate your global education journey with precision. Explore 20+ world-class institutions with specialized filters for safety, satisfaction and career outcomes.</p>
          
           {/* Search Bar */}
          <div>
            <SearchBar/>
          </div>

        </div>
      </div>
    
    </div>
  );
}
