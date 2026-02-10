"use server"

import universityData from "@/data/universities.json"

export async function getUniversities(filters = {}) {

    let filtered = universityData;

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(
            (u) =>
                u.name.toLowerCase().includes(searchLower) ||
                u.country.toLowerCase().includes(searchLower) ||
                u.city.toLowerCase().includes(searchLower) ||
                (u.state && u.state.toLowerCase().includes(searchLower))
        );
    }

    if (filters.country && filters.country.length > 0) {
        filtered = filtered.filter((u) => filters.country.includes(u.country));
    }

    if (filters.minTuition !== undefined) {
        filtered = filtered.filter((u) => u.tuition >= filters.minTuition);
    }

    if (filters.maxTuition !== undefined) {
        filtered = filtered.filter((u) => u.tuition <= filters.maxTuition);
    }

    if (filters.maxRanking !== undefined) {
        filtered = filtered.filter((u) => u.ranking <= filters.maxRanking);
    }

    if (filters.minSafetyIndex !== undefined) {
        filtered = filtered.filter((u) => u.safetyIndex >= filters.minSafetyIndex);
    }

    if (filters.minSatisfaction !== undefined) {
        filtered = filtered.filter((u) => u.studentSatisfaction >= filters.minSatisfaction);
    }

    if (filters.minYear !== undefined) {
        filtered = filtered.filter((u) => u.established >= filters.minYear);
    }

    if (filters.maxYear !== undefined) {
        filtered = filtered.filter((u) => u.established <= filters.maxYear);
    }

    if (filters.scholarship !== undefined && filters.scholarship === true) {
        filtered = filtered.filter((u) => u.scholarship === true);
    }

    if (filters.maxRanking !== undefined) {
    filtered = filtered.sort((a, b) => a.ranking - b.ranking);
  }


     const page = filters.page || 1;
    const limit = filters.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const paginated = filtered.slice(startIndex, endIndex);

    return {
        universities: paginated,
        total,
        totalPages,
        currentPage: page
    };
}


export async function getUniqueCountries(){
    const countries = Array.from(new Set (universityData.map((u) => u.country )));

    return countries.sort();
}

export async function getUniversityById(id) {
    return universityData.find(u => u.id === id);
}