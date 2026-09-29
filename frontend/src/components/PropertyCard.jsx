import { Link } from "react-router-dom";

function PropertyCard({ property }) {
    return (
        <div className="rounded-lg shadow-lg p-4">

            <img
                src={property.images[0]?.image}
                alt={property.title}
                className="w-full h-52 object-cover rounded"
            />

            <h2 className="text-xl font-bold mt-3">
                {property.title}
            </h2>

            <p>{property.location}</p>

            <p>₹{property.rent_price}/month</p>

            <Link
                to={`/properties/${property.id}`}
                className="block mt-4 text-center bg-blue-600 text-white py-2 rounded"
            >
                View Details
            </Link>

        </div>
    );
}

export default PropertyCard;