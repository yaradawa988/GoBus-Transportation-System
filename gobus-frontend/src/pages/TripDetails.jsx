import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import { getTripDetails } from "../api/tripApi";

import {
  FaBus,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaChair,
  FaRoad,
  FaPhoneAlt,
  FaEnvelope,
  FaBuilding
} from "react-icons/fa";

export default function TripDetails() {
  const { id } = useParams();
const navigate = useNavigate();
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const [trip, setTrip] = useState(null);
const logoUrl =
    trip?.company?.logo_url ||
    trip?.company?.logo ||
    null;
  useEffect(() => {
    loadTrip();
  }, []);

  const [bookedSeats, setBookedSeats] = useState([]);
const [availableSeats, setAvailableSeats] = useState(0);
const [totalSeats, setTotalSeats] = useState(0);
  
  const loadTrip = async () => {
  try {
    const response = await getTripDetails(id);

   setTrip(response.trip);

    setBookedSeats(
      response.booked_seats || []
    );

    setAvailableSeats(
      response.available_seats || 0
    );

    setTotalSeats(
      response.total_seats || 0
    );

  } catch (error) {
    console.error(error);
  }
};


  if (!trip) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl font-semibold">
            Loading Trip Details...
          </div>
        </div>
      </MainLayout>
    );
  }

 return (
  <MainLayout>
    <section className="bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)] min-h-screen py-14 pt-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}

        <div className="bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)] border rounded-2xl p-5 mb-5">
          <div className="flex items-center gap-4">

           <div
    className="
    w-16
    h-16
    rounded-2xl
    overflow-hidden
    bg-white
    shadow-md
    border
    flex
    items-center
    justify-center"
>
    {trip.company?.logo ? (

        <img
            src={trip.company.logo_url || trip.company.logo}
            alt={trip.company.name}
            className="w-full h-full object-cover"
        />

    ) : (

        <FaBus className="text-orange-500 text-2xl" />

    )}
</div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {trip.departure_station?.name}
                <span className="mx-2 text-orange-500">→</span>
                {trip.arrival_station?.name}
              </h1>

            <div className="mt-2 flex items-center gap-2">

    <FaBuilding className="text-orange-500" />
     
    <span className="font-semibold text-slate-700">
        {trip.company?.name} Company
    </span>

</div>
<p className="text-sm text-gray-500 mt-1">
    Comfortable & Reliable Journey
</p>
            </div>

          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">

          {/* LEFT CONTENT */}

          <div className="lg:col-span-8 space-y-5">

            {/* Trip Stats */}

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">

              <div className="bg-white border rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <FaClock className="text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-500">
                      Duration
                    </p>
                    <h4 className="font-semibold">
                      {trip.duration_minutes} min
                    </h4>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <FaChair className="text-green-500" />
                  <div>
                    <p className="text-xs text-gray-500">
                      Available Seats
                    </p>
                    <h4 className="font-semibold">
                      {availableSeats}/{totalSeats}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <FaBus className="text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-500">
                      Bus
                    </p>
                    <h4 className="font-semibold">
                      {trip.bus?.name}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <FaRoad className="text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">
                      Status
                    </p>

                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full
                      ${
                        trip.status === "scheduled"
                          ? "bg-green-100 text-green-700"
                          : trip.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {trip.status}
                    </span>

                  </div>
                </div>
              </div>

            </div>

            {/* Trip Details */}

            <div className="bg-white border rounded-2xl p-5">

              <h2 className="font-bold text-lg mb-4">
                Trip Details
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <p className="text-sm text-gray-500">
                    Departure Time
                  </p>

                 <div>
  <p className="font-semibold">
    {formatDate(trip.departure_time)}
  </p>

  <p className="text-sm text-orange-500 font-medium">
    {formatTime(trip.departure_time)}
  </p>
</div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Arrival Time
                  </p>

                 <div>
  <p className="font-semibold">
    {formatDate(trip.arrival_time)}
  </p>

  <p className="text-sm text-orange-500 font-medium">
    {formatTime(trip.arrival_time)}
  </p>
</div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Bus Number
                  </p>

                  <p className="font-semibold">
                    {trip.bus?.bus_number}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Total Seats
                  </p>

                  <p className="font-semibold">
                    {trip.bus?.seat_count}
                  </p>
                </div>

              </div>

            </div>

            {/* Route Stations */}

            {trip.stations?.length > 0 && (

              <div className="bg-white border rounded-2xl p-5">

                <h2 className="font-bold text-lg mb-4">
                  Route Stations
                </h2>

                <div className="space-y-3">

                  {trip.stations.map((station) => (

                    <div
                      key={station.id}
                      className="flex items-center gap-3 text-sm"
                    >
                      <FaMapMarkerAlt className="text-orange-500" />
                      {station.name}
                    </div>

                  ))}

                </div>

              </div>

            )}

            {/* Rest Stops */}

            {trip.rest_stops?.length > 0 && (

              <div className="bg-white border rounded-2xl p-5">

                <h2 className="font-bold text-lg mb-4">
                  Rest Stops
                </h2>

                <div className="space-y-3">

                  {trip.rest_stops.map((stop) => (

                    <div
                      key={stop.id}
                      className="flex items-center gap-3 text-sm"
                    >
                      <FaRoad className="text-blue-500" />
                      {stop.name}
                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>

          {/* RIGHT BOOKING CARD */}

          <div className="lg:col-span-4">

            <div className="sticky top-24">

              <div className="bg-white border rounded-2xl p-5 shadow-sm">

                <h3 className="font-bold text-lg mb-4">
                  Booking Summary
                </h3>

                <div className="bg-orange-50 rounded-xl p-4 mb-5">

                  <p className="text-gray-500 text-sm  flex
            items-center
            gap-2
            px-3
            py-2
            rounded-full
            text-sm
            font-semibold">
                   <FaMoneyBillWave /> Ticket Price
                  </p>

                  <div className="text-3xl font-bold text-orange-600 ">
                    
                     {Number(trip.price).toLocaleString()} SYP
                  </div>

                </div>

                <ul className="text-sm text-gray-600 space-y-2 mb-5">
                  <li>✓ Instant booking confirmation</li>
                  <li>✓ Secure seat reservation</li>
                  <li>✓ Easy cancellation policy</li>
                  <li>✓ Customer support available</li>
                </ul>

                {trip.status === "scheduled" ? (
                  <button
                    onClick={() =>
                      navigate(`/trips/${trip.id}/book`)
                    }
                    className="
                      w-full
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      py-3
                      rounded-xl
                      font-semibold
                      transition
                    "
                  >
                    Book This Trip
                  </button>
                ) : (
                  <button
                    disabled
                    className="
                      w-full
                      bg-gray-200
                      text-gray-500
                      py-3
                      rounded-xl
                      font-semibold
                    "
                  >
                    Trip Not Available
                  </button>
                )}

              </div>

            </div>
{/* Company Card */}

<div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

    {/* Header */}

    <div className="px-5 py-4 border-b bg-slate-50">

        <h3 className="font-bold text-slate-800 
        
        text-gray-500 text-sm  flex
            items-center
            gap-2
            px-3
            py-2
            rounded-full
            text-sm
            font-semibold">
            Transport Company
        </h3>

    </div>

    <div className="p-5">

        {/* Logo + Name */}

        <div className="flex items-center gap-4">

            <div
                className="
                w-16
                h-16
                rounded-2xl
                bg-white
                border
                shadow-sm
                overflow-hidden
                flex
                items-center
                justify-center"
            >
                {trip.company?.logo ? (

                  <img
    src={logoUrl}
    alt={trip.company.name}
    className="w-full h-full object-cover"
/>

                ) : (

                    <FaBus className="text-2xl text-slate-600" />

                )}
            </div>

            <div>

                <h4 className="font-bold text-lg">
                    {trip.company?.name}
                </h4>

                <p className="text-sm text-gray-500">
                    Premium Bus Operator
                </p>

            </div>

        </div>

        <div className="border-t my-5"></div>

        {/* Contact */}

        <div className="space-y-4">

            <div className="flex items-center gap-3">

                <div
                    className="
                    w-10
                    h-10
                    rounded-xl
                    bg-green-100
                    flex
                    items-center
                    justify-center"
                >
                    <FaPhoneAlt className="text-green-600" />
                </div>

                <div>

                    <p className="text-xs text-gray-500">
                        Phone
                    </p>

                    <p className="font-medium">
                        {trip.company?.phone}
                    </p>

                </div>

            </div>

            <div className="flex items-center gap-3">

                <div
                    className="
                    w-10
                    h-10
                    rounded-xl
                    bg-blue-100
                    flex
                    items-center
                    justify-center"
                >
                    <FaEnvelope className="text-blue-600" />
                </div>

                <div>

                    <p className="text-xs text-gray-500">
                        Email
                    </p>

                    <p className="font-medium break-all">
                        {trip.company?.email}
                    </p>

                </div>

            </div>

        </div>

    </div>

</div>
          </div>

        </div>
      </div>
    </section>
  </MainLayout>
);
}