// src/pages/CreateUsername.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CreateUsername() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                navigate("/login");
            } else {
                setUser(session.user);
            }
        });
    }, [navigate]);

    const handleSave = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from("profiles").insert([
            {
                id: user.id,
                username,
                email: user.email,
            },
        ]);
        if (error) {
            setError(error.message);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="pt-14 flex justify-center p-6">
            <form
                onSubmit={handleSave}
                className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-md"
            >
                <h2 className="text-xl font-semibold">Choose a Username</h2>
                {error && <p className="text-red-600">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                >
                    Save Username
                </button>
            </form>
        </div>
    );
}
