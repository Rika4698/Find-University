import { getUniversityById } from "@/lib/server";
import {
    MapPin, GraduationCap, Trophy, ShieldCheck,
    Banknote, Sparkles, Building2, Globe2,
    Users2, BookOpen, ArrowLeft
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UniversityDetails({ params }) {
    const { id } = await params;
    const university = await getUniversityById(id);

    if (!university) notFound();

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Full Width Hero */}
            <div className="h-[70vh] md:h-[80vh] relative overflow-hidden">
                <Image
                    src={university.image}
                    alt={university.name}
                    width={700} height={700}
                    className="w-full h-full object-cover animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

                <div className="absolute top-8 left-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-black/70 transition-all group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Search
                    </Link>
                </div>

                <div className="absolute bottom-12 md:bottom-20 xl:bottom-32 left-0 right-0 max-w-7xl mx-auto px-4 animate-slide-up">
                    <div className="flex flex-wrap items-center gap-4 mb-4 ">
                        <span className="px-4 py-1.5 bg-purple-600/60 text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg">
                            Global Rank #{university.ranking}
                        </span>
                        {university.scholarship && (
                            <span className="px-4 py-1.5 bg-green-500/60 text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5" />
                                Scholarships Available
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold text-white mb-4 drop-shadow-xl">{university.name}</h1>
                    <div className="flex items-center text-white/90 text-lg md:text-xl font-medium">
                        <MapPin className="w-5 h-5 mr-2 text-red-500" />
                        {university.city}, {university.country}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1  gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span- space-y-8">
                        {/* Highlights Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Satisfaction", value: `${university.studentSatisfaction} ★`, icon: Users2, color: "text-orange-500", bg: "bg-orange-50" },
                                { label: "Safety Index", value: `${university.safetyIndex}/100`, icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50" },
                                { label: "Established", value: university.established, icon: Building2, color: "text-purple-600", bg: "bg-purple-50" },
                                { label: "Language", value: "English", icon: Globe2, color: "text-blue-600", bg: "bg-blue-50" },
                            ].map((stat) => (
                                <div key={stat.label} className={`${stat.bg} p-6 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow animate-fade-in`}>
                                    <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Description Section */}
                        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-slide-up delay-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                                About the Institution
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                {university.name} is a world-class institution located in the heart of {university.city}.
                                Recognized for its academic excellence and vibrant campus life, it attracts thousands of international
                                students every year. The university is particularly noted for its research output and student career support.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <span className="text-sm font-bold text-gray-900 block mb-1">Post-Study Work Visa</span>
                                    <span className="text-sm text-gray-600">{university.postStudyWork}</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <span className="text-sm font-bold text-gray-900 block mb-1">Tuition Fees</span>
                                    <span className="text-sm text-gray-600">${university.tuition.toLocaleString()} per year</span>
                                </div>
                            </div>
                        </section>

                        {/* Features List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up delay-200">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100">
                                <h3 className="font-bold  mb-4 uppercase text-xs tracking-widest text-blue-600">Why Study Here?</h3>
                                <ul className="space-y-3">
                                    {["High Global Ranking", "Strong Career Outcomes", "Modern Campus Facilities", "Global Network"].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100">
                                <h3 className="font-bold  mb-4 uppercase text-xs tracking-widest text-green-600">Top Facilities</h3>
                                <ul className="space-y-3">
                                    {["Digital Library", "Innovation Hubs", "Sports Complex", "Student Accommodation"].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                   
                </div>
            </div>
        </main>
    );
}
