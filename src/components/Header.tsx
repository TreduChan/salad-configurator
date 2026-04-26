import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useAuthStore } from "../store/useAuthStore";
import logo from "../assets/Fresse_logo.png";


export default function Header() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userName, logout } = useAuthStore();
    
    const isLoggedIn = !!userName;

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    return (
        <>
        <header className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4">
            
            <Link to="/" className="w-24 h- rounded-full border-4 border-[#A2D135] flex items-center justify-center flex-col -mt-2 bg-zinc-800 shadow-lg">
                <img
                src={logo}
                alt="Fresse"
                className="w-full h-full object-contain p-0"
            />
            </Link>
            <nav>
                <Link to="/community">Saved recipes</Link>
            </nav>

            <h1 className="text-3xl font-black tracking-widest mt-6">BOWL-LASKURI</h1>

            <div className="flex flex-col items-end gap-3">
                <button
                    type="button"
                    onClick={() => setIsMenuOpen((open) => !open)}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle menu"
                    className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-md border border-[#A2D135] text-[#A2D135]"
                >
                    <span className="h-0.5 w-5 bg-current" />
                    <span className="h-0.5 w-5 bg-current" />
                    <span className="h-0.5 w-5 bg-current" />
                </button>

                {isMenuOpen && (
                    <div className="bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md">
                        {!isLoggedIn ? (
                        <button onClick={() => setIsLoginOpen(true)}>Kirjaudu sisään</button>
                        ) : (
                                <>
                                    <span className="font-semibold">
                                        Hei, {userName}
                                    </span>

                                    <button onClick={handleLogout}>
                                        Kirjaudu ulos
                                    </button>
                                     </>
                            )}
                    </div>
                )}
            </div>
            
        </header>
        <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
        />

        </>
    );
}