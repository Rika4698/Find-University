"use server"

import universityData from "@/data/universities.json"

export async function getUniversities(filters = {}) {

    let filtered = universityData;


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