import React from "react";
import { useNavigate } from "react-router-dom";
import {
    DocumentTextIcon,
    ChatAlt2Icon,
    GiftIcon,
} from "@heroicons/react/outline";

export default function Home() {
    const navigate = useNavigate();

    const goToResumeMatch = () => navigate("/resume-match");
    const goToForum = () => navigate("/forum");

    const Step = ({ number, title, desc }) => (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                    {number}
                </div>
            </div>
            <div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-gray-600">{desc}</p>
            </div>
        </div>
    );

    return (
        <div className="pt-14">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-24 text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Don’t Wait Until You’re 100% Ready
                </h1>
                <p className="mb-8 max-w-xl mx-auto">
                    Build confidence, sharpen your resume, and connect with a
                    community that lifts you up.
                </p>
                <div className="space-x-4">
                    <button
                        onClick={goToResumeMatch}
                        className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Try Resume Match
                    </button>
                    <button
                        onClick={goToForum}
                        className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-purple-700 transition"
                    >
                        Join the Forum
                    </button>
                </div>
            </section>

            {/* Features Overview */}
            <section className="py-16 bg-white">
                <h2 className="text-2xl font-bold text-center mb-8">
                    What You Can Do
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
                    {/* Instant Resume Feedback */}
                    <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
                        <DocumentTextIcon className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                        <h3 className="font-semibold mb-2">
                            Instant Resume Feedback
                        </h3>
                        <p className="text-sm mb-4">
                            Upload your resume & desired job description, get a match
                            score and personalized tips.
                        </p>
                        <button
                            onClick={goToResumeMatch}
                            className="text-purple-600 hover:underline"
                        >
                            Try it now
                        </button>
                    </div>

                    {/* Peer-to-Peer Forum */}
                    <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
                        <ChatAlt2Icon className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                        <h3 className="font-semibold mb-2">
                            Peer-to-Peer Forum
                        </h3>
                        <p className="text-sm mb-4">
                            Ask questions, share tips, and find encouragement
                            from others.
                        </p>
                        <button
                            onClick={goToForum}
                            className="text-purple-600 hover:underline"
                        >
                            Visit the forum
                        </button>
                    </div>

                    {/* Mentor Matching (Future) */}
                    <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
                        <GiftIcon className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                        <h3 className="font-semibold mb-2">Reward System</h3>
                        <p className="text-sm mb-4">
                            Coming soon: Get rewarded for applying to jobs.
                        </p>
                        <span className="text-gray-400 text-sm">
                            Stay tuned
                        </span>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gray-50">
                <h2 className="text-2xl font-bold text-center mb-8">
                    How It Works
                </h2>
                <div className="max-w-4xl mx-auto space-y-12 px-4">
                    <Step
                        number="1"
                        title="Upload & Analyze"
                        desc="Receive instant, actionable feedback on your resume."
                    />
                    <Step
                        number="2"
                        title="Join the Conversation"
                        desc="Share questions, tips, and encouragement in our forum."
                    />
                    <Step
                        number="3"
                        title="Apply Confidently"
                        desc="Armed with feedback and support, take bold action."
                    />
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-white">
                <h2 className="text-2xl font-bold text-center mb-8">
                    Success Stories
                </h2>
                <div className="max-w-3xl mx-auto space-y-6 px-4">
                    <blockquote className="p-6 bg-gray-100 rounded-lg italic">
                        “I submitted my resume and boosted my match from 40% to
                        75% for my desired role, now I have three interviews lined up!”
                    </blockquote>
                    <footer className="text-right font-semibold">
                        — Jane D., Computer Science Student
                    </footer>
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="py-16 bg-purple-600 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to Take the Leap?
                </h2>
                <button
                    onClick={goToResumeMatch}
                    className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                    Try Resume Match Now
                </button>
            </section>
        </div>
    );
}
