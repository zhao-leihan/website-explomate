import { Flight, HotelData, TrainTrip, RIDE_OPTIONS } from "./transport";
import { Tour, getTours } from "./tours";

export interface AIResponse {
    type: "text" | "itinerary" | "product-carousel";
    text?: string;
    data?: any;
    chips?: string[];
}

export interface DayPlan {
    day: number;
    title: string;
    activities: string[];
}

export interface Itinerary {
    title: string;
    days: DayPlan[];
}

const SAMPLE_ITINERARY: Itinerary = {
    title: "3 Days in Bali: Culture & Nature",
    days: [
        {
            day: 1,
            title: "Ubud Cultural Immersion",
            activities: [
                "09:00 AM - Sacred Monkey Forest Sanctuary",
                "12:00 PM - Lunch at Bebek Bengil (Crispy Duck)",
                "02:00 PM - Tegalalang Rice Terrace Walk",
                "06:00 PM - Traditional Legong Dance Performance"
            ]
        },
        {
            day: 2,
            title: "Water Temples & Volcano Views",
            activities: [
                "08:00 AM - Visit Tirta Empul Temple (Holy Spring)",
                "11:00 AM - Coffee Plantation Tour",
                "01:00 PM - Lunch with Mount Batur View",
                "04:00 PM - Sunset at Tanah Lot Temple"
            ]
        },
        {
            day: 3,
            title: "Beach & Relaxation",
            activities: [
                "10:00 AM - Surfing Lesson at Kuta/Seminyak",
                "01:00 PM - Seafood Lunch at Jimbaran Bay",
                "04:00 PM - Uluwatu Temple Cliff Walk",
                "06:00 PM - Kecak Fire Dance at Uluwatu"
            ]
        }
    ]
};

export const generateAIResponse = async (input: string): Promise<AIResponse[]> => {
    // Simulate thinking delay
    await new Promise(r => setTimeout(r, 1500));

    const lowerInput = input.toLowerCase();

    // 1. Itinerary Request
    if (lowerInput.includes("plan") || lowerInput.includes("itinerary") || lowerInput.includes("trip")) {
        return [
            {
                type: "text",
                text: "I've created a personalized 3-day itinerary for your trip to Bali. It covers culture, nature, and relaxation!",
            },
            {
                type: "itinerary",
                data: SAMPLE_ITINERARY,
                chips: ["Book Hotels", "Find Flights", "Customize Plan"]
            }
        ];
    }

    // 2. Hotel Request
    if (lowerInput.includes("hotel") || lowerInput.includes("stay")) {
        // Mock fetching hotels (normally would call transport.ts)
        const hotels: HotelData[] = [
            {
                id: "h1",
                name: "The Kayon Jungle Resort",
                location: "Ubud, Bali",
                rating: 4.9,
                reviews: 2150,
                pricePerNight: 450,
                currency: "USD",
                image: "/tours/bali.png",
                amenities: ["Pool", "Spa", "Wifi", "Breakfast"],
            },
            {
                id: "h2",
                name: "Padma Resort Legian",
                location: "Legian, Bali",
                rating: 4.8,
                reviews: 3400,
                pricePerNight: 320,
                currency: "USD",
                image: "/tours/bali.png",
                amenities: ["Beachfront", "Pool", "Kids Club"],
            }
        ];

        return [
            {
                type: "text",
                text: "Here are some top-rated hotels in Bali that match your preferences:",
            },
            {
                type: "product-carousel",
                data: { type: "hotel", items: hotels },
                chips: ["Filter by Price", "Show more"]
            }
        ];
    }

    // 3. Flight Request
    if (lowerInput.includes("flight") || lowerInput.includes("fly")) {
        return [
            {
                type: "text",
                text: "I found great flight deals to Bali for next week:",
            },
            {
                type: "product-carousel",
                data: { type: "flight", items: [] }, // We will populate this in the UI component logic or fetch here
                chips: ["Change Dates", "Cheapest First"]
            }
        ];
    }

    // Default Chat
    return [
        {
            type: "text",
            text: "I can help you plan your trip, find hotels, book flights, or suggest local tours. What would you like to do?",
            chips: ["Plan a trip to Bali", "Find hotels in Jakarta", "Book a flight"]
        }
    ];
};
