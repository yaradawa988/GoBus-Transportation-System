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
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
  return (
    <div
      className="
      bg-white
      rounded-xl
      overflow-hidden
      shadow
      border
      border-gray-100
      hover:shadow-2xl
      hover:-translate-y-1
      transition-all
      duration-300"
    >

      {/* Top Header */}

      <div
        className="
        bg-gradient-to-r
        from-slate-900
        to-orange-500
        p-3
        text-white"
      >

        <div className="flex items-center gap-3">

        <div
  className="
  w-10
  h-10
  rounded-full
  bg-white
  overflow-hidden
  flex
  items-center
  justify-center
  shadow-md"
>
  {trip.company?.logo ? (
    <img
      src={trip.company.logo}
      alt={trip.company.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <FaBus className="text-slate-700 text-xl" />
  )}
</div>

          <div>

            <h3 className="font-bold text-base">
              Trip #{trip.id}
            </h3>
<p className="text-sm text-white/90 font-medium">
  {trip.company?.name || "Unknown Company"} Company
</p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-4 space-y-3">

        {/* Route */}

        <div className="space-y-2">

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
            p-2"
          >
            <p className="text-sm text-gray-500">
              Departure
            </p>

           <div className="font-semibold">
  <p>{formatDate(trip.departure_time)}</p>
  <p className="text-sm text-gray-500">
    {formatTime(trip.departure_time)}
  </p>
</div>
          </div>

          <div
            className="
            bg-slate-50
            rounded-xl
            p-2"
          >
            <p className="text-sm text-gray-500">
              Arrival
            </p>

          <div className="font-semibold">
  <p>{formatDate(trip.arrival_time)}</p>
  <p className="text-sm text-gray-500">
    {formatTime(trip.arrival_time)}
  </p>
</div>
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
            px-2
            py-1
            rounded-full
            text-sm
            font-semibold"
          >
           <FaMoneyBillWave />
  {Number(trip.price).toLocaleString()} SYP
</div>

          <div
            className="
            flex
            items-center
            gap-2
            bg-blue-100
            text-blue-700
            px-2
            py-1
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
            px-2
            py-1
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
          py-2
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