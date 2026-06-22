import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  myBookings,
  payBooking,
  cancelBooking,
  downloadTicket,
} from "../api/bookingApi";
import { FaBus, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MyTrips() {
  const [tab, setTab] = useState("current");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
  }, [tab]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await myBookings(tab);
      setBookings(response.data || []);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    await cancelBooking(id);
    loadBookings();
  };

  const handlePay = async (id) => {
    await payBooking(id);
    loadBookings();
  };

  const statusStyle = (status) => {
    const map = {
      confirmed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      pending_payment: "bg-orange-100 text-orange-700",
      completed: "bg-blue-100 text-blue-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <MainLayout>
    <section className=" bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)] min-h-screen py-6 pt-24">
  <div className="max-w-4xl mx-auto px-4">
    {/* HEADER */}
    <div className="mb-10 text-center">
      <h1 className="text-4xl font-bold text-slate-800">My Bookings</h1>
      <p className="text-gray-500 mt-1">Manage your trips and tickets</p>
    </div>

    {/* FILTER TABS */}
    <div className="flex justify-center gap-3 mb-10">
      {["current", "history"].map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-sm border ${
            tab === t
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:text-orange-600"
          }`}
        >
          {t === "current" ? "Upcoming Trips" : "Past Trips"}
        </button>
      ))}
    </div>

    {/* CONTENT */}
    {loading ? (
      <div className="text-center py-20 text-gray-500">Loading...</div>
    ) : bookings.length === 0 ? (
      <div className="bg-white p-10 rounded-3xl text-center shadow-md">
        <FaBus className="text-5xl text-gray-300 mx-auto mb-3" />
        <p className="font-semibold text-lg">No trips found</p>
      </div>
    ) : (
      <div className="space-y-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
          >
            
           {/* TOP BAR */}
<div className="flex justify-between items-center bg-orange-50 px-5 py-3 border-b border-orange-100">
  <p className="text-xs text-gray-500 font-medium">
    Booking #{b.booking_number}
  </p>

  <div className="flex items-center gap-2 flex-wrap justify-end">

    <span
      className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${statusStyle(
        b.booking_status
      )}`}
    >
      {b.booking_status.replace("_", " ")}
    </span>

    {b.booking_status === "completed" && (
      <span
        className="
          text-xs
          px-3
          py-1
          rounded-full
          bg-blue-100
          text-blue-700
          font-semibold
        "
      >
        Used Ticket
      </span>
    )}

    {b.booking_status === "cancelled" && (
      <span
        className="
          text-xs
          px-3
          py-1
          rounded-full
          bg-red-100
          text-red-700
          font-semibold
        "
      >
        Invalid Ticket
      </span>
    )}

  </div>

  
            </div>

            {/* BODY */}
            <div className="p-6 space-y-4">
              {/* ROUTE */}
              <div>
                <h2 className="font-bold text-slate-800 text-lg">
                  {b.trip?.departure_station?.name} →{" "}
                  {b.trip?.arrival_station?.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(b.trip?.departure_time).toLocaleString()}
                </p>
              </div>

              {/* DETAILS */}
              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Seats</span>
                  <span>{b.seats?.map((s) => s.seat_number).join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Bus</span>
                  <span>{b.trip?.bus?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Payment</span>
                  <span className="capitalize">{b.payment_method}</span>
                </div>
              </div>

              {/* PRICE */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-gray-500 text-sm">Total</span>
                <span className="text-xl font-bold text-orange-600">
                  {b.total_price}  SYP
                </span>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-2 pt-4">
                {b.booking_status === "pending_payment" && (
                  <button
                    onClick={() => handlePay(b.id)}
                    className="flex-1 bg-orange-500 text-white py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition"
                  >
                    Pay Now
                  </button>
                )}

              {b.ticket?.id &&
  b.booking_status !== "cancelled" && (
    <button
      onClick={() =>
        navigate(`/tickets/${b.ticket.id}`)
      }
      className="
        flex-1
        border
        border-gray-200
        py-2
        rounded-xl
        text-sm
        font-semibold
        text-gray-700
        hover:bg-gray-50
        transition
      "
    >
      View Ticket
    </button>
)}

             {b.ticket &&
  b.booking_status !== "cancelled" && (
    <button
      onClick={() =>
        downloadTicket(b.ticket.id)
      }
      className="
        flex-1
        border
        border-gray-200
        py-2
        rounded-xl
        text-sm
        font-semibold
        text-gray-700
        flex
        justify-center
        items-center
        gap-2
        hover:bg-gray-50
        transition
      "
    >
      <FaDownload />
      PDF
    </button>
)}


                {["pending", "confirmed"].includes(b.booking_status) && (
                  <button
                    onClick={() => handleCancel(b.id)}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-sm font-semibold hover:bg-red-100 transition"
                  >
                    Cancel
                  </button>
                )}
               </div>

{/* Ticket Message */}
{b.ticket_message && (
  <div
    className={`
      mt-4
      p-3
      rounded-2xl
      text-sm
      border
      ${
        b.booking_status === "cancelled"
          ? "bg-red-50 border-red-200 text-red-700"
          : "bg-blue-50 border-blue-200 text-blue-700"
      }
    `}
  >
    {b.ticket_message}
  </div>
)}
              </div>
            </div>
         
        ))}
      </div>
    )}
  </div>
</section>


    </MainLayout>
  );
}