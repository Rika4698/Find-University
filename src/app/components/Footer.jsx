"use client"

import Link from "next/link";
import { GraduationCap, Twitter, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative text-white">

            {/* wave shape */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none ">
                <svg
                    viewBox="0 0 1440 120"
                    className="w-full h-20"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,120 Q720,0 1440,120 L1440,0 L0,0 Z"
                        className="fill-gray-50"
                    />
                </svg>
            </div>

            {/* Footer content */}
            <div className="bg-[#1d0325] pt-28 pb-16">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                        {/* Logo */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-7 h-7 text-purple-400" />
                                <span className="text-2xl font-bold">UniFinder</span>
                            </div>

                            <p className="text-gray-400 text-sm">
                                Helping students discover and compare universities worldwide
                                with smart filters and insights.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="font-semibold mb-4 text-[17px]">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-purple-400">Search Universities</Link></li>
                                <li><Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-purple-400">Compare Programs</Link></li>
                                <li><Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-purple-400">Scholarships</Link></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="font-semibold mb-4 text-[17px]">Resources</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-purple-400">Blog</Link></li>
                                <li><Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-purple-400">Tips</Link></li>
                                <li><Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-purple-400">Visa Info</Link></li>
                            </ul>
                        </div>

                        {/* Social */}
                        <div>
                            <h4 className="font-semibold mb-4 text-[17px]">Connect</h4>
                            <div className="flex gap-4">
                                <span className="cursor-pointer hover:text-purple-400 mt-1 " > 
                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z"
                fill="none" stroke="currentColor" stroke-width="1"/>
            </svg> 
            </span>
                                <Linkedin className="cursor-pointer hover:text-purple-400" />
                                <Facebook className="cursor-pointer hover:text-purple-400" />
                            </div>
                        </div>
                    </div>

                    {/* copyright */}
                    <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
                        © {new Date().getFullYear()} UniFinder. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}