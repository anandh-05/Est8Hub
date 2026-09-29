import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import publicApi from "../services/publicApi";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await publicApi.post("login/", formData);

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            if (error.response) {
                alert("Invalid Username or Password");
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }

        }

    };

    return (

        <div style={{ width: "400px", margin: "50px auto" }}>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

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

                <button type="submit">
                    Login
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