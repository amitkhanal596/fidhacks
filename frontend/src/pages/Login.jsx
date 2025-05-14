import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [banner, setBanner] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    //Login banner
    useEffect(() => {
        if (location.state?.banner) {
            setBanner(location.state.banner);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) navigate("/");
        });
    }, [navigate]);

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError(null);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) setError(error.message);
    };

    const handleGoogle = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/login` },
        });
    };

    return (
        <div className="pt-20 flex justify-center p-6">
            <div className="w-full max-w-md">
                {/* ALERT BANNER */}
                {banner && (
                    <div className="flex items-center justify-between mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                        <span className="flex-1">{banner}</span>
                        <button
                            onClick={() => setBanner("")}
                            className="text-yellow-700 font-bold ml-4"
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* LOGIN FORM */}
                <form
                    onSubmit={handleEmailLogin}
                    className="bg-white p-8 rounded shadow-md space-y-4"
                >
                    <h2 className="text-xl font-semibold">Log In</h2>

                    {error && <p className="text-red-600">{error}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Sign In
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogle}
                        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                        Continue with Google
                    </button>

                    <p className="text-sm text-center">
                        Don’t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-600 hover:underline"
                        >
                            Sign up for free!
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
