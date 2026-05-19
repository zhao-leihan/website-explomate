"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const bookings = [
    {
        id: "INV001",
        tour: "Hidden Gems of Bali",
        guest: "Sarah Smith",
        email: "sarah.smith@example.com",
        date: "Oct 24, 2024",
        amount: "$300.00",
        status: "Confirmed",
        avatar: "/avatars/01.png",
    },
    {
        id: "INV002",
        tour: "Kyoto Ancient Walk",
        guest: "Michael Doe",
        email: "m.doe@example.com",
        date: "Oct 26, 2024",
        amount: "$200.00",
        status: "Pending",
        avatar: "/avatars/02.png",
    },
    {
        id: "INV003",
        tour: "Swiss Alps Hiking",
        guest: "Emma Watson",
        email: "emma.w@example.com",
        date: "Nov 02, 2024",
        amount: "$350.00",
        status: "Confirmed",
        avatar: "/avatars/03.png",
    },
    {
        id: "INV004",
        tour: "Hidden Gems of Bali",
        guest: "John Chen",
        email: "john.c@example.com",
        date: "Nov 05, 2024",
        amount: "$150.00",
        status: "Cancelled",
        avatar: "/avatars/04.png",
    },
];

export function BookingsTable() {
    return (
        <div className="space-y-4">
            {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={booking.avatar} alt={booking.guest} />
                            <AvatarFallback>{booking.guest[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-bold text-slate-900 leading-none">{booking.guest}</p>
                            <p className="text-xs text-slate-500 mt-1">{booking.tour}</p>
                        </div>
                    </div>

                    <div className="hidden md:block text-sm text-slate-500">
                        {booking.date}
                    </div>

                    <div className="flex items-center gap-4">
                        <Badge variant={booking.status === 'Confirmed' ? 'default' : booking.status === 'Pending' ? 'secondary' : 'destructive'}
                            className={booking.status === 'Confirmed' ? 'bg-green-100 text-green-700 hover:bg-green-200' : ''}>
                            {booking.status}
                        </Badge>
                        <p className="text-sm font-bold text-slate-900 w-[80px] text-right">{booking.amount}</p>
                        <Button variant="ghost" size="sm">Details</Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
