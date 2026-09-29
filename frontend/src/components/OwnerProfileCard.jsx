function OwnerProfileCard({profile}) {

    if(!profile){

        return null;

    }

    return(

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">

                Owner Profile

            </h2>

            <p>

                <strong>Name :</strong>

                {profile.username}

            </p>

            <p>

                <strong>Email :</strong>

                {profile.email}

            </p>

            <p>

                <strong>Phone :</strong>

                {profile.phone}

            </p>

            <p>

                <strong>Address :</strong>

                {profile.address}

            </p>

            <p>

                <strong>Role :</strong>

                {profile.role}

            </p>

            <p>

                <strong>Status :</strong>

                {profile.is_verified_owner ? "Verified Owner ✅" : "Pending"}

            </p>

        </div>

    )

}

export default OwnerProfileCard;