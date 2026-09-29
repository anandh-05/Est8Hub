import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import publicApi from "../services/publicApi";
import { getDashboardPath, logout, saveAuthSession } from "../utils/auth";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrorMessage("");

        if (!formData.username || !formData.password) {
            setErrorMessage("Enter both your username and password.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await publicApi.post("login/", formData);
            saveAuthSession(response.data);
            navigate(getDashboardPath(response.data.user), { replace: true });

        } catch (error) {
            logout();
            setErrorMessage(
                error.response?.status === 401
                    ? "Incorrect username or password."
                    : error.response
                        ? "We could not sign you in. Please try again."
                        : "The server is unavailable. Please try again shortly."
            );
        } finally {
            setIsSubmitting(false);
        }

    };

    return (

        <div style={{ width: "400px", margin: "50px auto" }}>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                {errorMessage ? <p role="alert">{errorMessage}</p> : null}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>

            </form>

            <br />

            <Link to="/register">
                Don't have an account? Register
            </Link>

        </div>

    );
}

export default Login;
