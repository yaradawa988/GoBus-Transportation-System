import { useNavigate } from "react-router-dom";

import {
  FaBus,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaChair,
  FaArrowRight
} from "react-icons/fa";

export default function TripCard({ trip }) {

  const navigate = useNavigate();

  return (
    <div
      className="
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-lg
      border
      border-gray-100
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300"
    >

      {/* Top Header */}

      <div
        className="
        bg-gradient-to-r
        from-slate-900
        to-orange-500
        p-5
        text-white"
      >

        <div className="flex items-center gap-3">

          <div
            className="
            w-12
            h-12
            rounded-full
            bg-white/20
            flex
            items-center
            justify-center"
          >
            <FaBus className="text-xl" />
          </div>

          <div>

            <h3 className="font-bold text-lg">
              Trip #{trip.id}
            </h3>

            <p className="text-sm text-white/80">
              Premium Bus Journey
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-6 space-y-5">

        {/* Route */}

        <div className="space-y-4">

          <div className="flex items-center gap-3">

            <FaMapMarkerAlt className="text-green-500" />

            <div>
              <p className="text-xs text-gray-500">
                Departure Station
              </p>

              <p className="font-semibold">
                {trip.from}
              </p>
            </div>

          </div>

          <div className="flex justify-center">
            <FaArrowRight className="text-gray-400" />
          </div>

          <div className="flex items-center gap-3">

            <FaMapMarkerAlt className="text-red-500" />

            <div>
              <p className="text-xs text-gray-500">
                Arrival Station
              </p>

              <p className="font-semibold">
                {trip.to}
              </p>
            </div>

          </div>

        </div>

        {/* Time */}

        <div
          className="
          grid
          grid-cols-2
          gap-3"
        >

          <div
            className="
            bg-slate-50
            rounded-xl
            p-3"
          >
            <p className="text-xs text-gray-500">
              Departure
            </p>

            <p className="font-semibold">
              {new Date(
    trip.departure_time
  ).toLocaleString()}
            </p>
          </div>

          <div
            className="
            bg-slate-50
            rounded-xl
            p-3"
          >
            <p className="text-xs text-gray-500">
              Arrival
            </p>

            <p className="font-semibold">
             
              {new Date(
    trip.arrival_time
  ).toLocaleString()}
            </p>
          </div>

        </div>

        {/* Badges */}

        <div className="flex flex-wrap gap-2">

          <div
            className="
            flex
            items-center
            gap-2
            bg-orange-100
            text-orange-700
            px-3
            py-2
            rounded-full
            text-sm
            font-semibold"
          >
            <FaMoneyBillWave />
            {trip.price} SYP
          </div>

          <div
            className="
            flex
            items-center
            gap-2
            bg-blue-100
            text-blue-700
            px-3
            py-2
            rounded-full
            text-sm
            font-semibold"
          >
            <FaClock />
            {trip.duration_minutes} min
          </div>

          <div
            className="
            flex
            items-center
            gap-2
            bg-green-100
            text-green-700
            px-3
            py-2
            rounded-full
            text-sm
            font-semibold"
          >
            <FaChair />
            {trip.available_seats} Seats
          </div>

        </div>

        {/* Button */}

        <button
          onClick={() =>
            navigate(`/trips/${trip.id}`)
          }
          className="
          w-full
          mt-3
          bg-slate-900
          hover:bg-orange-500
          text-white
          py-3
          rounded-xl
          font-semibold
          transition-all
          duration-300"
        >
          View Details
        </button>

      </div>

    </div>
  );
}