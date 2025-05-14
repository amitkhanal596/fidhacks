import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, bannerMessage }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                navigate("/login", {
                    replace: true,
                    state: { banner: bannerMessage },
                });
            } else {
                setLoading(false);
            }
        });
    }, [navigate, bannerMessage]);

    if (loading) return null;

    return children;
}
