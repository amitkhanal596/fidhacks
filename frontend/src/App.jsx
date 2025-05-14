import Home from "./pages/Home";
import Login from "./pages/Login";
import Resume from "./pages/Resume";
import Signup from "./pages/Signup";
import CreateUsername from "./pages/CreateUsername";
import CreatePost from "./pages/CreatePost";
import Header from "./components/Header";
import Forum from "./pages/Forum";
import JobListings from "./pages/JobListings";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/resume-match"
                    element={
                        <ProtectedRoute bannerMessage="You must be logged in to use Resume Match">
                            <Resume />
                        </ProtectedRoute>
                    }
                />
                <Route path="/create-username" element={<CreateUsername />} />
                <Route path="/job-listings" element={<JobListings />} />
            </Routes>
        </>
    );
}

export default App;
