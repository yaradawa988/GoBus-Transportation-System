import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { myBookings, payBooking, cancelBooking, downloadTicket } from "../api/bookingApi";
import { FaBus, FaDownload, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt, FaTimes, FaCreditCard, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MyTrips() {
  const [tab, setTab] = useState("current");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { loadBookings(); }, [tab]);

  const loadBookings = async () => {
    setLoading(true);
    const response = await myBookings(tab);
    setBookings(response.data || []);
    setLoading(false);
  };

  const statusStyle = (status) => {
    const map = {
      confirmed: "bg-emerald-50 text-emerald-600 border-emerald-200",
      pending: "bg-amber-50 text-amber-600 border-amber-200",
      pending_payment: "bg-orange-50 text-orange-600 border-orange-200",
      completed: "bg-sky-50 text-sky-600 border-sky-200",
      cancelled: "bg-rose-50 text-rose-600 border-rose-200",
    };
    return map[status] || "bg-gray-50 text-gray-600 border-gray-200";
  };
const handlePay = async (id) => {
    try {
        setPayingId(id);

        await payBooking(id);

        await loadBookings();

    } finally {
        setPayingId(null);
    }
};
  return (
    <MainLayout>
      <section className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)] py-10 pt-28">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-500 mt-2">Manage your upcoming and past travel plans</p>
          </div>

          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-200 w-fit mx-auto mb-8">
            {["current", "history"].map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-8 py-2.5 rounded-xl font-medium transition-all ${tab === t ? "bg-orange-500 text-white shadow-md" : "text-gray-600 hover:bg-gray-50"}`}>
                {t === "current" ? "Upcoming" : "History"}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><FaSpinner className="animate-spin text-orange-500 text-3xl" /></div>
          ) : bookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-300">
              <FaBus className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-700">No bookings found</h3>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((b) => (
                <div key={b.id} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">#{b.booking_number}</span>
                    <span className={`text-xs px-3 py-1 rounded-full border font-semibold capitalize ${statusStyle(b.booking_status)}`}>
                      {b.booking_status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="p-6">
                   <div className="flex items-center gap-4 mb-6">

  <div className="w-14 h-14 rounded-2xl bg-slate-50 overflow-hidden flex items-center justify-center shadow-sm">

    {b.trip?.company?.logo_url ? (
      <img
        src={b.trip.company.logo_url}
        alt={b.trip.company.name}
        className="w-full h-full object-cover"
      />
    ) : (
      <FaBuilding className="text-gray-400 text-xl" />
    )}

  </div>

  <div className="flex-1">

    <h3 className="font-semibold text-lg text-slate-800">
      {b.trip?.company?.name}
    </h3>

    <p className="text-sm text-gray-400">
    departure time :  {new Date(b.trip?.departure_time).toLocaleDateString()}
    </p>

    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-medium">

      <FaBus className="text-[11px]" />

      Booked with this transport company

    </div>

  </div>

</div>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-gray-400">Route</p>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <FaMapMarkerAlt className="text-green-500" /> {b.trip?.departure_station?.name}
                          <span className="text-gray-300">→</span>
                          <FaMapMarkerAlt className="text-red-500" /> {b.trip?.arrival_station?.name}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-gray-400">Seats</p>
                        <p className="text-sm font-semibold">{b.seats?.map(s => s.seat_number).join(", ")}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-gray-400">Total Price</p>
                        <p className="text-lg font-bold text-orange-600">{b.total_price} <span className="text-xs">SYP</span></p>
                      </div>
                    </div>

                 

<div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
  
 
  {b.booking_status === "pending_payment" && (
    <button
      disabled={payingId === b.id}
      onClick={() => handlePay(b.id)}
      className={`
        flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
        ${payingId === b.id 
          ? "bg-orange-400 cursor-not-allowed w-40" 
          : "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20 text-white hover:scale-[1.02]"
        }
      `}
    >
      {payingId === b.id ? (
        <>
          <FaSpinner className="animate-spin text-lg" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <FaCreditCard />
          <span>Pay Now</span>
        </>
      )}
    </button>
  )}


  {b.ticket?.id && b.booking_status !== "cancelled" && (
    <button 
      onClick={() => navigate(`/tickets/${b.ticket.id}`)} 
      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold flex items-center gap-2 transition"
    >
      <FaTicketAlt /> View Ticket
    </button>
  )}

  {b.ticket && b.booking_status !== "cancelled" && (
    <button 
      onClick={() => downloadTicket(b.ticket.id)} 
      className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-semibold flex items-center gap-2 transition"
    >
      <FaDownload /> PDF
    </button>
  )}

  {["pending", "confirmed"].includes(b.booking_status) && (
    <button 
      onClick={() => cancelBooking(b.id)} 
      className="px-5 py-2.5 text-rose-600 hover:bg-rose-50 rounded-xl text-sm font-semibold flex items-center gap-2 transition"
    >
      <FaTimes /> Cancel
    </button>
  )}
</div>
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