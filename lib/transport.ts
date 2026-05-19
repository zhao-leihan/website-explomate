import { LucideIcon, Plane, Hotel, Train, Car } from "lucide-react";

// --- Types ---

export interface Flight {
    id: string;
    airline: string;
    airlineLogo: string; // URL to logo
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    currency: string;
    stops: number;
    from: string;
    to: string;
}

export interface HotelData {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    pricePerNight: number;
    currency: string;
    image: string;
    amenities: string[];
}

export interface TrainTrip {
    id: string;
    trainName: string;
    className: "Economy" | "Business" | "Executive" | "Luxury";
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    currency: string;
    fromStation: string;
    toStation: string;
}

export interface RideOption {
    id: string;
    provider: "Gojek" | "Grab" | "Bluebird";
    type: "Bike" | "Car" | "Car XL";
    price: number;
    currency: string;
    eta: string;
}

// --- Mock Data ---

const FLIGHTS: Flight[] = [
    {
        id: "f1",
        airline: "Garuda Indonesia",
        airlineLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Garuda_Indonesia_Logo.svg/1200px-Garuda_Indonesia_Logo.svg.png",
        flightNumber: "GA-402",
        departureTime: "08:00",
        arrivalTime: "10:50",
        duration: "1h 50m",
        price: 150,
        currency: "USD",
        stops: 0,
        from: "CGK",
        to: "DPS",
    },
    {
        id: "f2",
        airline: "Singapore Airlines",
        airlineLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/1200px-Singapore_Airlines_Logo_2.svg.png",
        flightNumber: "SQ-938",
        departureTime: "14:30",
        arrivalTime: "17:15",
        duration: "1h 45m",
        price: 250,
        currency: "USD",
        stops: 0,
        from: "CGK",
        to: "SIN",
    },
    {
        id: "f3",
        airline: "AirAsia",
        airlineLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/1200px-AirAsia_New_Logo.svg.png",
        flightNumber: "QZ-751",
        departureTime: "06:00",
        arrivalTime: "08:55",
        duration: "1h 55m",
        price: 85,
        currency: "USD",
        stops: 0,
        from: "CGK",
        to: "DPS",
    },
];

const HOTELS: HotelData[] = [
    {
        id: "h1",
        name: "The Kayon Jungle Resort",
        location: "Ubud, Bali",
        rating: 4.9,
        reviews: 2150,
        pricePerNight: 450,
        currency: "USD",
        image: "/tours/bali.png", // Reusing existing assets
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
    },
    {
        id: "h3",
        name: "Grand Hyatt",
        location: "Jakarta",
        rating: 4.7,
        reviews: 1800,
        pricePerNight: 280,
        currency: "USD",
        image: "/tours/admin.png", // Placeholder
        amenities: ["City View", "Gym", "Bar"],
    },
];

const TRAINS: TrainTrip[] = [
    {
        id: "t1",
        trainName: "Argo Bromo Anggrek",
        className: "Luxury",
        departureTime: "08:20",
        arrivalTime: "16:30",
        duration: "8h 10m",
        price: 125,
        currency: "USD",
        fromStation: "Gambir (GMR)",
        toStation: "Surabaya Pasar Turi (SBI)",
    },
    {
        id: "t2",
        trainName: "Taksaka",
        className: "Executive",
        departureTime: "09:10",
        arrivalTime: "15:45",
        duration: "6h 35m",
        price: 65,
        currency: "USD",
        fromStation: "Gambir (GMR)",
        toStation: "Yogyakarta (YK)",
    },
    {
        id: "t3",
        trainName: "Fajar Utama",
        className: "Business",
        departureTime: "06:45",
        arrivalTime: "14:15",
        duration: "7h 30m",
        price: 35,
        currency: "USD",
        fromStation: "Pasar Senen (PSE)",
        toStation: "Yogyakarta (YK)",
    },
];

export const RIDE_OPTIONS: RideOption[] = [
    { id: "r1", provider: "Gojek", type: "Bike", price: 1.5, currency: "USD", eta: "5 min" },
    { id: "r2", provider: "Grab", type: "Car", price: 4.5, currency: "USD", eta: "8 min" },
    { id: "r3", provider: "Bluebird", type: "Car XL", price: 6.5, currency: "USD", eta: "12 min" },
];


// --- API Functions (Simulated) ---

export const searchFlights = async (from: string, to: string, date: string): Promise<Flight[]> => {
    // Simulate delay
    await new Promise(r => setTimeout(r, 1000));
    return FLIGHTS; // Return all mocks for now
};

export const searchHotels = async (location: string, date: string): Promise<HotelData[]> => {
    await new Promise(r => setTimeout(r, 1000));
    return HOTELS; // Filter logic could go here
};

export const searchTrains = async (from: string, to: string, date: string): Promise<TrainTrip[]> => {
    await new Promise(r => setTimeout(r, 800));
    return TRAINS;
};

export const getTransportEstimates = async (from: string, to: string): Promise<RideOption[]> => {
    await new Promise(r => setTimeout(r, 500));
    return RIDE_OPTIONS;
};
