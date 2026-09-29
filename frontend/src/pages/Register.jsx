import { useState } from "react";
import publicApi from "../services/publicApi";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        role: "TENANT",
        password: "",
        confirm_password: "",
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

            const response = await publicApi.post("register/", formData);

            alert("Registration Successful");

            console.log(response.data);

            navigate("/");

        } catch (error) {

            console.log(error.response.data);

            alert("Registration Failed");

        }
    };

    return (

        <div style={{ width: "400px", margin: "50px auto" }}>

            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="role"
                    onChange={handleChange}
                >

                    <option value="TENANT">Tenant</option>
                    <option value="OWNER">Owner</option>

                </select>

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Register
                </button>

            </form>

            <br />

            <Link to="/">
                Already have an account? Login
            </Link>

        </div>

    );

}

export default Register;