import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import { getTripDetails } from "../api/tripApi";
import { createBooking} from "../api/bookingApi";

import {
  FaBus,
  FaChair,
  FaMapMarkerAlt,
  FaMoneyBillWave
} from "react-icons/fa";

export default function BookingPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [processing, setProcessing] =
    useState(false);

  const [selectedSeats, setSelectedSeats] =
    useState([]);

  const [paymentMethod, setPaymentMethod] =
    useState("cash");

  const [bookedSeats, setBookedSeats] =
    useState([]);

  useEffect(() => {
    loadTrip();
  }, []);

  const loadTrip = async () => {

    try {

     const response = await getTripDetails(id);

setTrip(response.trip);

      setBookedSeats(
        response.booked_seats || []
      );

    } catch (error) {

      console.error(error);

      alert(
        "Unable to load trip data."
      );

    } finally {

      setLoading(false);
    }
  };

  const toggleSeat = (seatId) => {

    if (
      bookedSeats.includes(seatId)
    ) {
      return;
    }

    if (
      selectedSeats.includes(seatId)
    ) {

      setSelectedSeats(
        selectedSeats.filter(
          s => s !== seatId
        )
      );

      return;
    }

    setSelectedSeats([
      ...selectedSeats,
      seatId
    ]);
  };

  const submitBooking = async () => {

    if (
      selectedSeats.length === 0
    ) {

      alert(
        "Please select at least one seat."
      );

      return;
    }

    try {

      setProcessing(true);

      const response =
        await createBooking({

          trip_id: trip.id,

          seat_ids: selectedSeats,

          payment_method:
            paymentMethod
        });

     navigate("/booking-success", {
  state: {
    booking: response.booking,
  },
});

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Booking failed"
      );

    } finally {

      setProcessing(false);
    }
  };

  if (loading) {

    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[60vh]">
          Loading...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <section className="bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)] min-h-screen py-6 pt-16">

        <div className="max-w-6xl mx-auto px-4">

          {/* Header */}

          <div className="bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)] rounded-2xl border p-5 mb-5">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">

                <FaBus className="text-orange-500 text-xl" />

              </div>

              <div>

                <h1 className="font-bold text-xl">

                  {trip.departure_station?.name}
                  {" → "}
                  {trip.arrival_station?.name}

                </h1>

                <p className="text-sm text-gray-500">

                  Select your preferred seats

                </p>

              </div>

            </div>

          </div>

          <div className="grid lg:grid-cols-3 gap-5">

            {/* LEFT */}

            <div className="lg:col-span-2">

              <div className="bg-white rounded-2xl border p-5">

                <h2 className="font-semibold mb-5">

                  Available Seats

                </h2>

                {/* Driver */}

                <div className="flex justify-end mb-5">

                  <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium">

                    Driver

                  </div>

                </div>

                <div className="grid grid-cols-4 md:grid-cols-5 gap-3">

                  {trip.bus?.seats?.map(
                    seat => {

                      const isBooked =
                        bookedSeats.includes(
                          seat.id
                        );

                      const isSelected =
                        selectedSeats.includes(
                          seat.id
                        );

                      return (

                        <button
                          key={seat.id}
                          disabled={isBooked}
                          onClick={() =>
                            toggleSeat(
                              seat.id
                            )
                          }
                          className={`
                            h-12 rounded-xl border text-sm font-semibold transition

                            ${
                              isBooked
                                ? "bg-red-100 text-red-500 border-red-200 cursor-not-allowed"
                                : isSelected
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-white hover:border-orange-400"
                            }
                          `}
                        >

                          {seat.seat_number}

                        </button>
                      );
                    }
                  )}

                </div>

                <div className="flex flex-wrap gap-4 mt-5 text-sm">

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border rounded"></div>
                    Available
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    Selected
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-200 rounded"></div>
                    Booked
                  </div>

                </div>

              </div>
            </div>

            {/* RIGHT */}

            <div>

              <div className="bg-white rounded-2xl border p-5 sticky top-24">

                <h3 className="font-bold text-lg mb-4">

                  Booking Summary

                </h3>

                <div className="space-y-4">

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Selected Seats
                    </span>

                    <span className="font-semibold">
                      {selectedSeats.length}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Price / Seat
                    </span>

                    <span className="font-semibold">
                      {trip.price}  SYP
                    </span>

                  </div>

                  <div className="flex justify-between text-lg font-bold border-t pt-4">

                    <span>Total</span>

                    <span className="text-green-600">

                     
                      {(
                        selectedSeats.length *
                        trip.price
                      ).toFixed(2)}  SYP

   
                    </span>

                  </div>

                </div>

                <div className="mt-6">

                  <label className="text-sm font-medium block mb-2">

                    Payment Method

                  </label>

                  <select
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                    className="w-full border rounded-xl p-3"
                  >
                    <option value="cash">
                      Cash
                    </option>

                    <option value="card">
                      Card
                    </option>
                  </select>

                </div>

                <button
                  onClick={submitBooking}
                  disabled={processing}
                  className="
                    w-full
                    mt-6
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                  "
                >

                  {processing
                    ? "Processing..."
                    : "Confirm Booking"}

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </MainLayout>
  );
}