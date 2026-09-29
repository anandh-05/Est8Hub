function Hero() {
    return (
        <section className="bg-blue-600 text-white py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <h1 className="text-5xl font-bold mb-4">
                    Find Your Dream Home
                </h1>

                <p className="text-lg mb-8">
                    Browse apartments, houses, and land available for rent.
                </p>

                <input
                    type="text"
                    placeholder="Search by location..."
                    className="bg-white text-black rounded-lg px-4 py-3 w-full max-w-lg"
                />

            </div>
        </section>
    );
}

export default Hero;