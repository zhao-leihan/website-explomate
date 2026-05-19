"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
    { name: "Jan", total: 4500 },
    { name: "Feb", total: 3200 },
    { name: "Mar", total: 6000 },
    { name: "Apr", total: 5800 },
    { name: "May", total: 7500 },
    { name: "Jun", total: 9000 },
];

export function EarningsChart() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[8, 8, 0, 0]}
                    className="fill-primary"
                    maxBarSize={50}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
