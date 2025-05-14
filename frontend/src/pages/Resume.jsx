import React, { useState } from "react";
import Header from "../components/Header";

export default function Resume() {
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [match, setMatch] = useState(null);
    const [explanation, setExplanation] = useState("");
    const [insight, setInsight] = useState("");
    const [improvementTips, setImprovementTips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => setResumeFile(e.target.files[0]);
    const handleDescriptionChange = (e) => setJobDescription(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setInsight("");
        setImprovementTips([]);

        if (!resumeFile || !jobDescription) {
            setError("Both fields are required.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("resume", resumeFile);
        formData.append("jobDescription", jobDescription);

        try {
            const response = await fetch("/api/match", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.error || "Server error");
            }

            const data = await response.json();
            setMatch(data.matchPercentage);
            setExplanation(data.explanation);
            setInsight(data.insight || "");
            setImprovementTips(data.improvementTips || []);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="pt-14 min-h-screen bg-gray-100 flex flex-col items-center p-6">
                <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
                    <h1 className="text-2xl font-semibold mb-6">
                        Upload Resume &amp; Job Description
                    </h1>

                    {error && <p className="text-red-600 mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Resume upload */}
                        <div>
                            <label
                                htmlFor="resume"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Resume (PDF)
                            </label>
                            <input
                                type="file"
                                id="resume"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {resumeFile && (
                                <p className="mt-2 text-sm text-gray-500">
                                    {resumeFile.name}
                                </p>
                            )}
                        </div>

                        {/* Job description */}
                        <div>
                            <label
                                htmlFor="jobDescription"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Job Description
                            </label>
                            <textarea
                                id="jobDescription"
                                rows="6"
                                value={jobDescription}
                                onChange={handleDescriptionChange}
                                placeholder="Paste the job description here..."
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 text-white font-medium rounded-lg transition ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {loading ? "Matching..." : "Match"}
                        </button>
                    </form>

                    {/* Results */}
                    {match !== null && (
                        <div className="mt-6 p-4 bg-blue-50 rounded space-y-4">
                            <p className="text-xl font-semibold">
                                Match: {match}%
                            </p>
                            <p>{explanation}</p>

                            {improvementTips.length > 0 && (
                                <div>
                                    <h3 className="font-medium mt-4">
                                        Improvement Tips:
                                    </h3>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        {improvementTips.map((tip, idx) => (
                                            <li
                                                key={idx}
                                                className="text-gray-700"
                                            >
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {insight && (
                                <p className="mt-4 italic text-gray-700">
                                    {insight}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
