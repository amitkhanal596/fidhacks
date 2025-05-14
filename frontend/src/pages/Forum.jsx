import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function Forum() {
    const [posts, setPosts] = useState([]);
    const [session, setSession] = useState(null);
    const [newComment, setNewComment] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth
            .getSession()
            .then(({ data: { session } }) => setSession(session));

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_, sess) => {
            setSession(sess);
        });

        loadPosts();
        return () => subscription.unsubscribe();
    }, []);

    const loadPosts = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select(
                `
        id, title, description, created_at,
        profiles(username),
        comments (
          id, content, created_at,
          profiles(username)
        )
      `
            )
            .order("created_at", { ascending: false });

        if (error) console.error(error);
        else setPosts(data);
    };

    const handleCommentChange = (postId, text) => {
        setNewComment((c) => ({ ...c, [postId]: text }));
    };

    const submitComment = async (postId) => {
        if (!session) return navigate("/login");
        const content = newComment[postId]?.trim();
        if (!content) return;

        const { error } = await supabase
            .from("comments")
            .insert([{ post_id: postId, user_id: session.user.id, content }]);
        if (error) console.error(error);
        else {
            setNewComment((c) => ({ ...c, [postId]: "" }));
            loadPosts();
        }
    };

    return (
        <div className="pt-20 min-h-screen bg-gray-100 p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Forum</h1>
                {session && (
                    <button
                        onClick={() => navigate("/create-post")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        New Post
                    </button>
                )}
            </div>

            {posts.map((post) => (
                <div
                    key={post.id}
                    className="bg-white p-6 rounded shadow space-y-4"
                >
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>By {post.profiles.username}</span>
                        <span>
                            {new Date(post.created_at).toLocaleString()}
                        </span>
                    </div>
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p>{post.description}</p>

                    <div className="border-t pt-4 space-y-4">
                        <h3 className="font-medium">Comments</h3>
                        {post.comments?.length > 0 ? (
                            post.comments.map((c) => (
                                <div
                                    key={c.id}
                                    className="pl-4 border-l space-y-1"
                                >
                                    <div className="text-sm text-gray-700">
                                        {c.content}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        — {c.profiles.username},{" "}
                                        {new Date(
                                            c.created_at
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">
                                No comments yet.
                            </p>
                        )}

                        {session ? (
                            <div className="flex space-x-2 items-center">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={newComment[post.id] || ""}
                                    onChange={(e) =>
                                        handleCommentChange(
                                            post.id,
                                            e.target.value
                                        )
                                    }
                                    className="flex-1 border px-3 py-2 rounded"
                                />
                                <button
                                    onClick={() => submitComment(post.id)}
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                >
                                    Post
                                </button>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:underline"
                                >
                                    Log in
                                </Link>{" "}
                                to comment.
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
