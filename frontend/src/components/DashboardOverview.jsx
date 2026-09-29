import { Link } from "react-router-dom";

function DashboardOverview({properties}){

    const total = properties.length;

    const available = properties.filter(
        p=>p.status==="AVAILABLE"
    ).length;

    const booked = properties.filter(
        p=>p.status==="BOOKED"
    ).length;

    const rented = properties.filter(
        p=>p.status==="RENTED"
    ).length;

    return(

        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-6">

                Overview

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="bg-blue-100 p-4 rounded">

                    <h3>Total</h3>

                    <h1>{total}</h1>

                </div>

                <div className="bg-green-100 p-4 rounded">

                    <h3>Available</h3>

                    <h1>{available}</h1>

                </div>

                <div className="bg-yellow-100 p-4 rounded">

                    <h3>Booked</h3>

                    <h1>{booked}</h1>

                </div>

                <div className="bg-red-100 p-4 rounded">

                    <h3>Rented</h3>

                    <h1>{rented}</h1>

                </div>

            </div>

            <Link

                to="/add-property"

                className="inline-block mt-6 bg-blue-600 text-white px-5 py-3 rounded"

            >

                + Add Property

            </Link>

        </div>

    )

}

export default DashboardOverview;