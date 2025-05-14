import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) return navigate("/login");
            setSession(session);
        });
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        const { error } = await supabase.from("posts").insert([
            {
                user_id: session.user.id,
                title,
                description,
            },
        ]);

        if (error) console.error(error);
        else navigate("/");
    };

    return (
        <div className="pt-14 flex justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-lg"
            >
                <h2 className="text-xl font-semibold">Create New Post</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
                <textarea
                    rows={6}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
