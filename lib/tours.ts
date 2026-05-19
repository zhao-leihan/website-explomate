"use client";

// Types
export interface Tour {
    id: number | string;
    title: string;
    location: string;
    rating: number;
    price: number;
    duration: string;
    image: string;
    category: "Adventure" | "Culture" | "Food" | "Nature";
    description?: string;
}

// Initial Mock Data
const MOCK_TOURS: Tour[] = [
    {
        id: 1,
        title: "Uluwatu Temple & Sunset Kecak Dance",
        location: "Bali, Indonesia",
        rating: 4.9,
        price: 350000,
        duration: "6 Hours",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        category: "Culture",
        description: "Experience the magic of Uluwatu Temple perched on a cliff edge, followed by a traditional Kecak dance with sunset views."
    },
    {
        id: 2,
        title: "Mount Bromo Midnight Sunrise Adventure",
        location: "East Java, Indonesia",
        rating: 4.8,
        price: 850000,
        duration: "12 Hours",
        image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c26e?auto=format&fit=crop&w=800&q=80",
        category: "Adventure",
        description: "An unforgettable journey to Mount Bromo. Catch the sunrise over the caldera and trek across the sea of sand."
    },
    {
        id: 3,
        title: "Borobudur & Prambanan Heritage Tour",
        location: "Yogyakarta, Indonesia",
        rating: 4.9,
        price: 600000,
        duration: "8 Hours",
        image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=800&q=80",
        category: "Culture",
        description: "Explore the ancient Buddhist temple of Borobudur and the Hindu temple compound of Prambanan."
    },
    {
        id: 4,
        title: "Jakarta Street Food Culinary Journey",
        location: "Jakarta, Indonesia",
        rating: 4.7,
        price: 250000,
        duration: "4 Hours",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
        category: "Food",
        description: "Savor the diverse and rich flavors of Indonesian street food in Jakarta."
    },
    {
        id: 5,
        title: "Komodo National Park Sailing Expedition",
        location: "Labuan Bajo, Indonesia",
        rating: 5.0,
        price: 1500000,
        duration: "24 Hours",
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80",
        category: "Nature",
        description: "Trek to find the legendary Komodo Dragons, snorkel at Pink Beach, and hike Padar Island."
    }
];

const STORAGE_KEY = "explomate_tours_v1";

export const getTours = (): Tour[] => {
    if (typeof window === 'undefined') return MOCK_TOURS;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        // Initialize with mocks if empty
        localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_TOURS));
        return MOCK_TOURS;
    }
    return JSON.parse(stored);
};

export const saveTour = (tour: Omit<Tour, "id" | "rating">) => {
    const tours = getTours();
    const newTour: Tour = {
        ...tour,
        id: Date.now(), // Simple unique ID
        rating: 0, // New tours start with 0 rating
    };
    const updated = [newTour, ...tours];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newTour;
};

export const deleteTour = (id: number | string) => {
    const tours = getTours();
    const updated = tours.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
