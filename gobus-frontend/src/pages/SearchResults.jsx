import { useLocation } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import TripCard from "../components/trips/TripCard";

export default function SearchResults() {

  const location = useLocation();

  const trips = location.state?.trips || [];

  return (
    <MainLayout>

     <section
  className="
  max-w-7xl
  mx-auto
  px-6
  py-16
   bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)]
  min-h-[70vh]"
>

        <h1 className="text-4xl font-bold mb-10">
          Available Trips
        </h1>

        {trips.length === 0 ? (

      <div
  className="
  bg-white
  rounded-3xl
  shadow-xl
  p-12
  text-center
  max-w-2xl
  mx-auto"
>
  <h2 className="text-2xl font-bold mb-3">
    No Trips Found
  </h2>

  <p className="text-gray-500">
    Try another date or choose different stations.
  </p>
</div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-6">

            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
              />
            ))}

          </div>

        )}

      </section>

    </MainLayout>
  );
}