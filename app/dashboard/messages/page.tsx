"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Send, User } from "lucide-react";
import { useState } from "react";

export default function MessagesPage() {
    const { t } = useLanguage();
    const [activeChat, setActiveChat] = useState(1);

    const chats = [
        { id: 1, name: "Budi Santoso", role: "Guide", lastMsg: "See you tomorrow at 9 AM!", time: "10:30 AM", unread: 2 },
        { id: 2, name: "Sarah Smith", role: "Tourist", lastMsg: "Thanks for the great tour!", time: "Yesterday", unread: 0 },
        { id: 3, name: "Support Team", role: "Admin", lastMsg: "Your verification is complete.", time: "2 days ago", unread: 0 },
    ];

    return (
        <div className="h-[calc(100vh-8rem)] flex bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            {/* Chat List */}
            <div className="w-80 border-r border-slate-100 flex flex-col">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="font-bold text-lg text-slate-900">{t.dashboard.messages.title}</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat.id)}
                            className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${activeChat === chat.id ? "bg-blue-50/50" : ""}`}
                        >
                            <div className="flex justify-between mb-1">
                                <h3 className="font-bold text-slate-900 text-sm">{chat.name}</h3>
                                <span className="text-xs text-slate-400">{chat.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 mb-1 truncate">{chat.lastMsg}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full">{chat.role}</span>
                                {chat.unread > 0 && (
                                    <span className="w-5 h-5 bg-secondary text-primary text-xs font-bold rounded-full flex items-center justify-center">
                                        {chat.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50/50">
                <div className="p-4 border-b border-slate-100 bg-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Budi Santoso</h3>
                        <p className="text-xs text-green-500 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full" />
                            Online
                        </p>
                    </div>
                </div>

                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    {/* Mock Messages */}
                    <div className="flex justify-start">
                        <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none max-w-sm text-sm text-slate-600 shadow-sm">
                            Hello! I wanted to confirm our meeting point for tomorrow.
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none max-w-sm text-sm shadow-md shadow-blue-500/10">
                            Hi! Yes, we'll meet at the Main Temple gate at 9:00 AM sharp.
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none max-w-sm text-sm text-slate-600 shadow-sm">
                            Perfect! See you then.
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white border-t border-slate-100">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder={t.dashboard.messages.placeholder}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors text-black placeholder:text-gray-400"
                        />
                        <Button size="icon" className="rounded-xl">
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
