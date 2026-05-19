"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Star, Navigation, Phone, MessageCircle, ChevronRight, X, BatteryMedium } from "lucide-react";

// ─── Leaflet CSS must be loaded globally ────────────────────────────────────
// We'll inject it at runtime since Next.js won't process it here.

// ─── Types ──────────────────────────────────────────────────────────────────
interface Driver {
    id: number;
    name: string;
    vehicle: string;
    rating: number;
    eta: number;
    plate: string;
    battery: number;
    avatar: string;
    color: string;
    // path = array of [lat, lng] waypoints around Meruya/Jakarta Barat
    path: [number, number][];
}

// ─── EV Driver Data (real coordinates around Meruya, Jakarta Barat) ──────────
const DRIVERS: Driver[] = [
    {
        id: 1,
        name: "Budi Santoso",
        vehicle: "Hyundai Ioniq 6",
        rating: 4.9,
        eta: 3,
        plate: "B 1204 ION",
        battery: 84,
        avatar: "👨‍✈️",
        color: "#6366f1",
        path: [
            [-6.1920, 106.7540],
            [-6.1925, 106.7570],
            [-6.1930, 106.7600],
            [-6.1940, 106.7630],
            [-6.1950, 106.7650],
            [-6.1940, 106.7670],
            [-6.1930, 106.7690],
        ],
    },
    {
        id: 2,
        name: "Siti Rahayu",
        vehicle: "Wuling Air EV",
        rating: 4.8,
        eta: 6,
        plate: "B 3812 EV",
        battery: 61,
        avatar: "👩‍✈️",
        color: "#10b981",
        path: [
            [-6.1880, 106.7600],
            [-6.1895, 106.7610],
            [-6.1910, 106.7615],
            [-6.1925, 106.7620],
            [-6.1940, 106.7625],
            [-6.1955, 106.7620],
            [-6.1965, 106.7610],
        ],
    },
    {
        id: 3,
        name: "Ahmad Rizky",
        vehicle: "Hyundai Ioniq 5",
        rating: 4.7,
        eta: 8,
        plate: "B 7741 ELK",
        battery: 72,
        avatar: "👨‍💼",
        color: "#f97316",
        path: [
            [-6.1970, 106.7680],
            [-6.1960, 106.7660],
            [-6.1950, 106.7640],
            [-6.1945, 106.7615],
            [-6.1938, 106.7595],
            [-6.1930, 106.7575],
            [-6.1920, 106.7555],
        ],
    },
    {
        id: 4,
        name: "Dewi Lestari",
        vehicle: "BYD Seal",
        rating: 5.0,
        eta: 4,
        plate: "B 4200 BYD",
        battery: 93,
        avatar: "👩‍💼",
        color: "#0ea5e9",
        path: [
            [-6.1960, 106.7550],
            [-6.1955, 106.7570],
            [-6.1950, 106.7590],
            [-6.1948, 106.7615],
            [-6.1945, 106.7640],
            [-6.1940, 106.7660],
            [-6.1935, 106.7680],
        ],
    },
];

// ─── Top-down realistic car SVG (returns an SVG string for Leaflet DivIcon) ──
function carSVG(color: string, rotation: number): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="60" viewBox="0 0 36 60" style="transform:rotate(${rotation}deg);filter:drop-shadow(0 4px 8px rgba(0,0,0,0.35))">
  <!-- Shadow -->
  <ellipse cx="18" cy="52" rx="12" ry="4" fill="rgba(0,0,0,0.18)" />
  <!-- Body -->
  <rect x="4" y="8" width="28" height="44" rx="8" fill="${color}" />
  <!-- Roof -->
  <rect x="8" y="16" width="20" height="24" rx="6" fill="${color}" />
  <!-- Windshield front -->
  <path d="M10 14 Q18 10 26 14 L24 20 Q18 17 12 20 Z" fill="rgba(255,255,255,0.55)" />
  <!-- Rear window -->
  <path d="M10 42 Q18 46 26 42 L24 36 Q18 39 12 36 Z" fill="rgba(255,255,255,0.35)" />
  <!-- Left windows -->
  <rect x="5" y="22" width="5" height="10" rx="2" fill="rgba(255,255,255,0.4)" />
  <!-- Right windows -->
  <rect x="26" y="22" width="5" height="10" rx="2" fill="rgba(255,255,255,0.4)" />
  <!-- Front headlights -->
  <rect x="5" y="8" width="8" height="4" rx="2" fill="#fef08a" opacity="0.95" />
  <rect x="23" y="8" width="8" height="4" rx="2" fill="#fef08a" opacity="0.95" />
  <!-- Rear lights -->
  <rect x="5" y="50" width="8" height="4" rx="2" fill="#fca5a5" opacity="0.9" />
  <rect x="23" y="50" width="8" height="4" rx="2" fill="#fca5a5" opacity="0.9" />
  <!-- Front bumper -->
  <rect x="8" y="5" width="20" height="4" rx="2" fill="rgba(0,0,0,0.25)" />
  <!-- Rear bumper -->
  <rect x="8" y="52" width="20" height="4" rx="2" fill="rgba(0,0,0,0.2)" />
  <!-- Roof stripe highlight -->
  <rect x="15" y="18" width="6" height="20" rx="3" fill="rgba(255,255,255,0.15)" />
</svg>`;
}

// ─── Helper: interpolate a position along path ───────────────────────────────
function interpolate(
    path: [number, number][],
    t: number
): { pos: [number, number]; angle: number } {
    const clampedT = Math.max(0, Math.min(0.9999, t));
    const total = path.length - 1;
    const scaled = clampedT * total;
    const seg = Math.floor(scaled);
    const local = scaled - seg;
    const a = path[seg];
    const b = path[Math.min(seg + 1, total)];
    const pos: [number, number] = [
        a[0] + (b[0] - a[0]) * local,
        a[1] + (b[1] - a[1]) * local,
    ];
    // angle in degrees (north = 0, east = 90)
    const dLat = b[0] - a[0];
    const dLng = b[1] - a[1];
    const angle = Math.atan2(dLng, dLat) * (180 / Math.PI);
    return { pos, angle };
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function EVMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const leafletMapRef = useRef<any>(null);
    const markersRef = useRef<Record<number, any>>({});
    const routeLinesRef = useRef<Record<number, any>>({});
    const progressRef = useRef<Record<number, number>>(
        Object.fromEntries(DRIVERS.map(d => [d.id, Math.random() * 0.6]))
    );
    const rafRef = useRef<number | null>(null);

    const [selected, setSelected] = useState<Driver | null>(null);
    const [booked, setBooked] = useState(false);
    const [leafletLoaded, setLeafletLoaded] = useState(false);

    // ── Load Leaflet CSS + JS dynamically (SSR-safe) ──────────────────────────
    useEffect(() => {
        if (typeof window === "undefined") return;

        // Inject Leaflet CSS
        if (!document.getElementById("leaflet-css")) {
            const link = document.createElement("link");
            link.id = "leaflet-css";
            link.rel = "stylesheet";
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            document.head.appendChild(link);
        }

        import("leaflet").then(L => {
            if (!mapRef.current || leafletMapRef.current) return;

            // Fix default icon path issue in Next.js
            (L as any).Icon.Default.mergeOptions({
                iconRetinaUrl: "",
                iconUrl: "",
                shadowUrl: "",
            });

            // ── Initialize map centred on Meruya, Jakarta Barat ──────────────
            const map = L.map(mapRef.current, {
                center: [-6.1940, 106.7620],
                zoom: 15,
                zoomControl: false,
                attributionControl: false,
            });

            // ── Colorful Voyager tile layer (not grey/black!) ─────────────────
            L.tileLayer(
                "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
                { subdomains: "abcd", maxZoom: 19 }
            ).addTo(map);

            // Attribution (small, bottom-right)
            L.control.attribution({ prefix: false, position: "bottomright" })
                .addAttribution('© <a href="https://carto.com/">CARTO</a>')
                .addTo(map);

            // ── User location marker (pulsing blue dot) ───────────────────────
            const userIcon = L.divIcon({
                className: "",
                html: `<div style="
                    width:18px;height:18px;
                    border-radius:50%;
                    background:#6366f1;
                    border:3px solid white;
                    box-shadow:0 0 0 6px rgba(99,102,241,0.25), 0 2px 8px rgba(0,0,0,0.3);
                    animation:pulseUser 2s ease-in-out infinite;
                "></div>
                <style>@keyframes pulseUser{0%,100%{box-shadow:0 0 0 6px rgba(99,102,241,0.25),0 2px 8px rgba(0,0,0,0.3)}50%{box-shadow:0 0 0 14px rgba(99,102,241,0.08),0 2px 8px rgba(0,0,0,0.3)}}</style>`,
                iconSize: [18, 18],
                iconAnchor: [9, 9],
            });
            L.marker([-6.1940, 106.7620], { icon: userIcon })
                .bindTooltip("📍 Lokasi Anda", { permanent: true, direction: "top", className: "user-tooltip" })
                .addTo(map);

            // ── Draw route lines (dashed, driver colour) ──────────────────────
            DRIVERS.forEach(driver => {
                const line = L.polyline(driver.path, {
                    color: driver.color,
                    weight: 4,
                    opacity: 0.45,
                    dashArray: "10 8",
                }).addTo(map);
                routeLinesRef.current[driver.id] = line;
            });

            // ── Create car markers ────────────────────────────────────────────
            DRIVERS.forEach(driver => {
                const { pos, angle } = interpolate(driver.path, progressRef.current[driver.id]);

                const icon = L.divIcon({
                    className: "",
                    html: carSVG(driver.color, angle) +
                        `<div style="
                            position:absolute;top:-26px;left:50%;transform:translateX(-50%);
                            background:white;border-radius:8px;padding:2px 7px;
                            font-size:10px;font-weight:700;color:#1e293b;
                            box-shadow:0 2px 8px rgba(0,0,0,0.18);white-space:nowrap;
                            border:1.5px solid ${driver.color};
                        ">${driver.name.split(" ")[0]}</div>`,
                    iconSize: [36, 60],
                    iconAnchor: [18, 30],
                });

                const marker = L.marker(pos, { icon, zIndexOffset: 500 })
                    .addTo(map)
                    .on("click", () => {
                        setSelected(driver);
                        setBooked(false);
                        map.panTo(pos, { animate: true, duration: 0.6 });
                    });

                markersRef.current[driver.id] = marker;
            });

            leafletMapRef.current = map;
            setLeafletLoaded(true);
        });

        return () => {
            if (leafletMapRef.current) {
                leafletMapRef.current.remove();
                leafletMapRef.current = null;
            }
        };
    }, []);

    // ── Animate cars along their paths ──────────────────────────────────────
    useEffect(() => {
        if (!leafletLoaded) return;

        let last = performance.now();
        const speed = 0.000035; // progress per ms

        function tick(now: number) {
            const dt = now - last;
            last = now;

            import("leaflet").then(L => {
                DRIVERS.forEach(driver => {
                    progressRef.current[driver.id] = (progressRef.current[driver.id] + speed * dt) % 1;
                    const t = progressRef.current[driver.id];
                    const { pos, angle } = interpolate(driver.path, t);

                    const marker = markersRef.current[driver.id];
                    if (!marker) return;

                    marker.setLatLng(pos);

                    // Update icon with new rotation angle
                    const newIcon = L.divIcon({
                        className: "",
                        html: carSVG(driver.color, angle) +
                            `<div style="
                                position:absolute;top:-26px;left:50%;transform:translateX(-50%);
                                background:white;border-radius:8px;padding:2px 7px;
                                font-size:10px;font-weight:700;color:#1e293b;
                                box-shadow:0 2px 8px rgba(0,0,0,0.18);white-space:nowrap;
                                border:1.5px solid ${driver.color};
                            ">${driver.name.split(" ")[0]}</div>`,
                        iconSize: [36, 60],
                        iconAnchor: [18, 30],
                    });
                    marker.setIcon(newIcon);
                });
            });

            rafRef.current = requestAnimationFrame(tick);
        }

        rafRef.current = requestAnimationFrame(tick);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [leafletLoaded]);

    // ─── Render ──────────────────────────────────────────────────────────────
    return (
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100" style={{ height: 460 }}>

            {/* Leaflet map container */}
            <div ref={mapRef} style={{ width: "100%", height: "100%", zIndex: 0 }} />

            {/* Loading skeleton */}
            {!leafletLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm font-bold text-slate-500">Memuat peta Meruya…</p>
                    </div>
                </div>
            )}

            {/* ── Top-left LIVE badge ─────────────────────────────────────── */}
            <div className="absolute top-3 left-3 z-[999] flex gap-2">
                <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg text-xs font-bold text-slate-700 flex items-center gap-1.5 border border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Meruya · Jakarta Barat
                </div>
            </div>
            <div className="absolute top-3 right-3 z-[999] bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                LIVE
            </div>

            {/* ── Bottom driver legend pills ──────────────────────────────── */}
            <div className="absolute bottom-3 left-3 z-[999] flex gap-2 flex-wrap">
                {DRIVERS.map(d => (
                    <button
                        key={d.id}
                        onClick={() => { setSelected(d); setBooked(false); }}
                        className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-md border border-white/60 text-[11px] font-bold hover:scale-105 transition-transform"
                        style={{ color: d.color, borderColor: `${d.color}40` }}
                    >
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                        {d.name.split(" ")[0]}
                    </button>
                ))}
            </div>

            {/* ── Driver detail slide-up card ─────────────────────────────── */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        key="driver-card"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-3xl shadow-2xl px-5 py-4 border-t border-slate-100"
                    >
                        {/* Drag handle */}
                        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />

                        <div className="flex items-start gap-4">
                            {/* Avatar bubble */}
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-inner"
                                style={{ background: `${selected.color}15`, border: `2px solid ${selected.color}30` }}
                            >
                                {selected.avatar}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                    <p className="font-bold text-slate-900">{selected.name}</p>
                                    <span
                                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white leading-none"
                                        style={{ background: selected.color }}
                                    >
                                        {selected.plate}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 mb-2">{selected.vehicle}</p>

                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                                        <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
                                        {selected.rating.toFixed(1)}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                        <BatteryMedium className="w-3.5 h-3.5" />
                                        {selected.battery}%
                                    </span>
                                    <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600">
                                        <Navigation className="w-3 h-3" />
                                        ~{selected.eta} menit
                                    </span>
                                </div>
                            </div>

                            {/* Close + action buttons */}
                            <div className="flex flex-col gap-2 flex-shrink-0">
                                <button
                                    onClick={() => setSelected(null)}
                                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4 text-slate-500" />
                                </button>
                                <button className="w-8 h-8 rounded-xl border border-slate-100 bg-white shadow-sm hover:scale-110 transition-transform flex items-center justify-center">
                                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                                </button>
                                <button className="w-8 h-8 rounded-xl border border-slate-100 bg-white shadow-sm hover:scale-110 transition-transform flex items-center justify-center">
                                    <MessageCircle className="w-3.5 h-3.5 text-slate-600" />
                                </button>
                            </div>
                        </div>

                        {/* Confirm/booked button */}
                        {!booked ? (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setBooked(true)}
                                className="mt-4 w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg"
                                style={{ background: `linear-gradient(120deg, ${selected.color}, ${selected.color}cc)` }}
                            >
                                <Zap className="w-4 h-4" />
                                Pesan Sekarang · ETA {selected.eta} menit
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            </motion.button>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.93, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="mt-4 w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 bg-emerald-500 shadow-lg shadow-emerald-100"
                            >
                                ✅ Pesanan dikonfirmasi! {selected.name.split(" ")[0]} sedang menuju Anda.
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
