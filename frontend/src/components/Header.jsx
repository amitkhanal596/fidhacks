import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { supabase } from '../lib/supabaseClient';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav className="flex items-center justify-between w-full z-30 fixed top-0 left-0 h-14 bg-gray-900 shadow-md px-6">
        <button onClick={() => setIsOpen(true)} className="text-gray-200 focus:outline-none">
          <MenuIcon className="h-6 w-6" />
        </button>

        <Link to="/" className="text-white text-xl font-bold">
          Herizon
        </Link>

        <div className="w-6" />
      </nav>

      {/* Overlay behind drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 z-20" onClick={() => setIsOpen(false)} />
      )}

      {/* Sliding drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-gray-100 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setIsOpen(false)} className="text-gray-200 focus:outline-none">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <ul className="mt-4">
          <li className="px-4 py-2 hover:bg-gray-700 rounded">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 rounded">
            <Link to="/resume-match" onClick={() => setIsOpen(false)}>Resume Match</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 rounded">
            <Link to="/forum" onClick={() => setIsOpen(false)}>Forum</Link>
          </li>

          {session ? (
            <li className="px-4 py-2 hover:bg-gray-700 rounded">
              <button onClick={handleLogout} className="w-full text-left">
                Logout
              </button>
            </li>
          ) : (
            <li className="px-4 py-2 hover:bg-gray-700 rounded">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Header;
