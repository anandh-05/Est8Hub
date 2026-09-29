import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddProperty() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        google_map_url: "",
        property_type: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        status: "AVAILABLE",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await api.post("properties/create/", formData);

            alert("Property added successfully!");

            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            alert("Failed to add property");
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-6">
                Add Property
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Property Title"
                    className="w-full border rounded p-3"
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full border rounded p-3"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="w-full border rounded p-3"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="w-full border rounded p-3"
                    onChange={handleChange}
                />

                <input
                    type="url"
                    name="google_map_url"
                    placeholder="Google Map URL"
                    className="w-full border rounded p-3"
                    onChange={handleChange}
                />

                <select
                    name="property_type"
                    className="w-full border rounded p-3"
                    onChange={handleChange}
                >
                    <option value="">Select Property Type</option>
                    <option value="APARTMENT">Apartment</option>
                    <option value="HOUSE">House</option>
                    <option value="LAND">Land</option>
                </select>

                <input
                    type="number"
                    name="bedrooms"
                    placeholder="Bedrooms"
                    className="w-full border rounded p-3"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="bathrooms"
                    placeholder="Bathrooms"
                    className="w-full border rounded p-3"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="area"
                    placeholder="Area (sq.ft)"
                    className="w-full border rounded p-3"
                    onChange={handleChange}
                />

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                    Add Property
                </button>

            </form>

        </div>
    );
}

export default AddProperty;