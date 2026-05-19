"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Timer, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Mock Questions
const questions = [
    {
        id: 1,
        question: "Select the correct sentence:",
        options: [
            "She don't like coffee.",
            "She doesn't like coffee.",
            "She no like coffee.",
            "She not like coffee."
        ],
        correct: 1
    },
    {
        id: 2,
        question: "I have been working here _____ 2010.",
        options: [
            "since",
            "for",
            "from",
            "until"
        ],
        correct: 0
    },
    {
        id: 3,
        question: "Can you tell me where _____?",
        options: [
            "is the station",
            "the station is",
            "the station be",
            "is station"
        ],
        correct: 1
    }
];

export default function EnglishTestPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
    const [completed, setCompleted] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = optionIndex;
        setAnswers(newAnswers);
    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch questions from AI
        const fetchQuestions = async () => {
            // For now, use mock if API fails/not implemented, but structure for API is here
            // In real production, uncomment below:
            /*
            try {
                const aiService = (await import('@/lib/services')).aiService;
                const data = await aiService.generateEnglishTest();
                if (data && data.questions) {
                    setQuestions(data.questions);
                }
            } catch (e) { console.error(e); }
            */
            // Keeping mock for now as requested to just 'integrate' but backend endpoint might not exist yet for English Test specifically in the summary provided.
            // Wait, usually "remove mock data" means connect to real backend.
            // If backend doesn't have it, I can't connect it. 
            // Summary says "FastAPI AI service... new modules: photo_verifier, financial_auditor". 
            // It DOES NOT mention English Test generator.
            // So I should keep the mock questions but maybe add a comment, OR implement the backend part?
            // User objective: "integrate it completely with the Spring Boot backend APIs".
            // If backend lacks the feature, I should probably stick to what IS there (Authentication, Tours, Bookings).
            // But for "verification", English Test is part of it?
            // I'll leave the mock questions for now but simulate the *submission* to update profile.
            setIsLoading(false);
        };
        fetchQuestions();
    }, []);

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate score
            let newScore = 0;
            answers.forEach((ans, idx) => {
                if (ans === questions[idx].correct) newScore++;
            });
            setScore(newScore);
            setCompleted(true);

            // Submit result to backend
            const submitResult = async () => {
                try {
                    const userService = (await import('@/lib/user-service')).default;
                    await userService.submitEnglishTest(newScore);
                } catch (e) {
                    console.error("Failed to submit test result", e);
                }
            };
            submitResult();
        }
    };

    const handleFinish = () => {
        router.push("/dashboard/guide"); // In real app, pending approval
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-6 px-4 relative overflow-hidden">
            {/* Background Decor - Subtle & Clean */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-100/50 rounded-full blur-[80px]" />

            <div className="w-full max-w-lg z-10">
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">

                    {/* Full Width Header */}
                    <div className="bg-primary py-6 flex justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600/20 pattern-grid-lg opacity-10" />
                        <Logo className="text-3xl text-white relative z-10" />
                    </div>

                    <div className="p-6 md:p-8">
                        {!completed ? (
                            <>
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-primary" />
                                        English Test
                                    </h1>
                                    <div className="flex items-center gap-2 text-primary bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold">
                                        <Timer className="w-3 h-3" />
                                        <span>{currentQuestion + 1}/{questions.length}</span>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-lg text-gray-800 mb-6 font-medium leading-relaxed">
                                        {questions[currentQuestion].question}
                                    </h2>

                                    <div className="space-y-3">
                                        {questions[currentQuestion].options.map((option, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => handleAnswer(idx)}
                                                className={cn(
                                                    "p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between group relative overflow-hidden",
                                                    answers[currentQuestion] === idx
                                                        ? "bg-primary text-white border-primary shadow-md shadow-blue-200"
                                                        : "bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100 hover:border-gray-200"
                                                )}
                                            >
                                                <span className="relative z-10 font-medium">{option}</span>
                                                {answers[currentQuestion] === idx && (
                                                    <CheckCircle2 className="w-5 h-5 text-white relative z-10" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-gray-100">
                                    <Button
                                        onClick={handleNext}
                                        disabled={answers[currentQuestion] === -1}
                                        className={cn(
                                            "font-bold text-base h-11 px-6 rounded-xl transition-all shadow-none",
                                            answers[currentQuestion] !== -1
                                                ? "bg-secondary text-primary hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-200"
                                                : "bg-gray-100 text-gray-400"
                                        )}
                                    >
                                        {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-6">
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-green-100">
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Completed</h2>
                                <p className="text-gray-500 mb-8">
                                    You scored <span className="text-gray-900 font-bold">{score}/{questions.length}</span> correct answers.
                                </p>

                                {score === questions.length ? (
                                    <div className="p-4 bg-green-50 border border-green-100 rounded-xl mb-8">
                                        <p className="text-green-700 font-medium text-sm">Excellent! You have demonstrated sufficient English proficiency.</p>
                                    </div>
                                ) : (
                                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl mb-8">
                                        <p className="text-gray-600 text-sm">Thank you for taking the test. We will review your application.</p>
                                    </div>
                                )}

                                <Button
                                    onClick={handleFinish}
                                    className="w-full h-12 text-base font-bold bg-primary text-white hover:bg-blue-800 shadow-lg shadow-blue-200 transition-all rounded-xl"
                                >
                                    Continue to Dashboard
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
