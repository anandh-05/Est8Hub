import { useEffect, useState } from "react";
import publicApi from "../services/publicApi";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PropertyCard from "../components/PropertyCard";

function Home() {

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchProperties();
    }, []);

    async function fetchProperties() {
        try {
            const response = await publicApi.get("properties/");
            setProperties(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>

            <Hero />

            <div className="max-w-7xl mx-auto p-6">

                <h2 className="text-3xl font-bold mb-6">
                    Latest Properties
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {properties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                        />
                    ))}

                </div>

            </div>
        </>
    );
}

export default Home;