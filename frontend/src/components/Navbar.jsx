import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const token = localStorage.getItem("access");
    const { pathname } = useLocation();

    if (pathname.startsWith("/owner/") || pathname === "/add-property") {
        return null;
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600"
                >
                    🏠 Est8 Hub
                </Link>

                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="hover:text-blue-600"
                    >
                        Home
                    </Link>

                    <Link
                        to="/properties"
                        className="hover:text-blue-600"
                    >
                        Properties
                    </Link>

                    {token ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="hover:text-blue-600"
                            >
                                Dashboard
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-blue-600"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar;
