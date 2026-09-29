import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import publicApi from "../../services/publicApi";


function PropertyDetails() {

    const { id } = useParams();

    const [property, setProperty] = useState(null);

    useEffect(() => {

        fetchProperty();

    }, []);

    async function fetchProperty() {

        const response = await publicApi.get(`properties/${id}/`);

        setProperty(response.data);

    }

    if (!property) {

        return <h1>Loading...</h1>;

    }

    return (

        <div>

            <h1>{property.title}</h1>

            <p>{property.location}</p>

            <p>{property.property_type}</p>

            <p>₹{property.rent_price}</p>

            <p>{property.description}</p>

        </div>

    );

}

export default PropertyDetails;