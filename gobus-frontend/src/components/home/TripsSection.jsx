export default function TripsSection({ trips }) {
  if (!trips.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold mb-10">
        Available Trips
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="
            bg-white
            rounded-3xl
            p-6
            shadow-lg"
          >
            <h3 className="font-bold text-xl mb-4">
              {trip.from} → {trip.to}
            </h3>

            <p>
              Departure: {trip.departure_time}
            </p>

            <p>
              Arrival: {trip.arrival_time}
            </p>

            <p>
              Duration: {trip.duration_minutes} min
            </p>

            <p>
              Available Seats: {trip.available_seats}
            </p>

            <p className="text-orange-500 font-bold text-2xl mt-4">
              ${trip.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}