import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) setError(error.message);
        else {
            navigate('/create-username');
        }
    };

    return (
        <div className="pt-14 flex justify-center p-6">
            <form
                onSubmit={handleSignup}
                className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-md"
            >
                <h2 className="text-xl font-semibold">Sign Up</h2>
                {error && <p className="text-red-600">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Create Account
                </button>
                <p className="text-sm">
                    Have an account?{" "}
                    <a href="/login" className="text-blue-600">
                        Log in
                    </a>
                </p>
            </form>
        </div>
    );
}
