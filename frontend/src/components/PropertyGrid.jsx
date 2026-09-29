import PropertyCard from "./PropertyCard";

function PropertyGrid({properties}){

    return(

        <div className="mt-10">

            <h2 className="text-2xl font-bold mb-6">

                My Properties

            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                {

                    properties.map(property=>(

                        <PropertyCard

                            key={property.id}

                            property={property}

                        />

                    ))

                }

            </div>

        </div>

    )

}

export default PropertyGrid;