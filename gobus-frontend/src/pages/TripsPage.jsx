import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import TripCard from "../components/trips/TripCard";

import { getTrips } from "../api/tripApi";

import {
  FaBus,
  FaRoute,
  FaMapMarkedAlt
} from "react-icons/fa";

export default function TripsPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const response = await getTrips();

      setTrips(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>

      

   {/* Hero Section */}

<section
  className="
  relative
  overflow-hidden
  pt-28
  pb-14"
>

  {/* Background */}

  <div
    className="
    absolute
    inset-0
    bg-gradient-to-b
    from-slate-50
    via-slate-100
    to-slate-200"
  />

  <div
    className="
    absolute
    inset-0
    bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)]
    "
  />

  <div className="relative max-w-7xl mx-auto px-6">

    <div className="text-center">

      {/* Badge */}

      <div
        className="
        inline-flex
        items-center
        gap-2
        px-4
        py-2
        rounded-full
        bg-white/80
        backdrop-blur-md
        border
        border-orange-200
        shadow-sm
        mb-5"
      >
        <FaBus className="text-orange-500" />

        <span
          className="
          text-sm
          font-semibold
          text-slate-700"
        >
          GoBus Travel Network
        </span>
      </div>

      {/* Title */}

      <h1
        className="
        text-4xl
        md:text-5xl
        font-extrabold
        tracking-tight
        text-slate-800"
      >
        Available Trips
      </h1>

      {/* Subtitle */}

      <p
        className="
        mt-4
        text-base
        md:text-lg
        text-slate-600
        max-w-2xl
        mx-auto
        leading-relaxed"
      >
        Explore available routes, compare schedules,
        and choose the perfect trip for your next journey.
      </p>

      {/* Stats */}

      <div
        className="
        flex
        justify-center
        gap-4
        mt-8
        flex-wrap"
      >

        <div
          className="
          bg-white/80
          backdrop-blur-md
          px-5
          py-3
          rounded-2xl
          shadow-md"
        >
          <p className="text-xs text-gray-500">
            Available Trips
          </p>

          <p className="font-bold text-slate-800">
            {trips.length}
          </p>
        </div>

        <div
          className="
          bg-white/80
          backdrop-blur-md
          px-5
          py-3
          rounded-2xl
          shadow-md"
        >
          <p className="text-xs text-gray-500">
            Routes
          </p>

          <p className="font-bold text-slate-800">
            Active
          </p>
        </div>

        <div
          className="
          bg-white/80
          backdrop-blur-md
          px-5
          py-3
          rounded-2xl
          shadow-md"
        >
          <p className="text-xs text-gray-500">
            Destinations
          </p>

          <p className="font-bold text-slate-800">
            Multiple Cities
          </p>
        </div>

      </div>

    </div>

  </div>

</section>
      {/* Trips */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-bold">
              Browse Trips
            </h2>

            <p className="text-gray-500 mt-2">
              Showing all available trips
            </p>

          </div>

          <div
            className="
            bg-orange-100
            text-orange-600
            px-4
            py-2
            rounded-full
            font-semibold"
          >
            {trips.length} Trips
          </div>

        </div>

        {trips.length === 0 ? (

          <div
            className="
            bg-white
            rounded-3xl
            shadow-lg
            p-12
            text-center"
          >
            <FaBus className="mx-auto text-5xl text-gray-300 mb-4" />

            <h3 className="text-2xl font-bold mb-2">
              No Trips Available
            </h3>

            <p className="text-gray-500">
              There are currently no trips available.
            </p>
          </div>

        ) : (

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

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