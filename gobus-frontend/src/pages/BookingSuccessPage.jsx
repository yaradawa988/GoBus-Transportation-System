import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import {
  FaCheckCircle,
  FaBus,
  FaCreditCard,
  FaClock,
} from "react-icons/fa";

export default function BookingSuccessPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;

  if (!booking) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Booking not found
            </h2>

            <button
              onClick={() => navigate("/my-trips")}
              className="mt-4 px-5 py-2 bg-orange-500 text-white rounded-xl"
            >
              My Trips
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const company = booking.trip?.company;

  const logoUrl =
    company?.logo_url ||
    company?.logo ||
    null;

  const needsPayment =
    booking.booking_status === "pending_payment";

  const waitingApproval =
    booking.booking_status === "pending";

  return (
    <MainLayout>
      <section className=" bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)]  min-h-[80vh] bg-slate-50 flex items-center justify-center px-4 py-10 pt-24">

        <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-slate-100 p-4">

          {/* Header */}

          <div className="text-center">

            <div className="flex items-center justify-center gap-2 text-slate-800 mb-3">
  
  <h1 className="text-2xl font-bold">
    Booking Created
  </h1>
  <FaCheckCircle className="text-green-500 text-3xl" />
</div>

            <p className="text-sm text-gray-500 mt-2">
              Your booking request has been created successfully.
            </p>

          </div>

          {/* Payment Message */}

          {needsPayment && (
            <div className="mt-5 bg-orange-50 border border-orange-200 rounded-xl p-4">

              <div className="flex gap-3">

                <FaCreditCard className="text-orange-500 text-lg mt-1" />

                <div>

                  <h3 className="font-semibold text-orange-700">
                    Payment Required
                  </h3>

                  <p className="text-sm text-orange-600 mt-1">
                    Complete payment to confirm your booking
                    and generate the ticket.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* Waiting Approval */}

          {waitingApproval && (
            <div className="mt-5 bg-blue-50 border border-blue-200 rounded-2xl p-4">

              <div className="flex gap-3">

                <FaClock className="text-blue-500 text-lg mt-1" />

                <div>

                  <h3 className="font-semibold text-blue-700">
                    Waiting for Approval
                  </h3>

                  <p className="text-sm text-blue-600 mt-1">
                    Your cash booking is awaiting admin
                    approval. Ticket generation will happen
                    after confirmation.
                  </p>

                </div>

              </div>

            </div>
          )}
{company && (
  <div className="mt-4">

    <h3 className="text-xs font-semibold text-gray-400 mb-2 uppercase">
      Travel Company
    </h3>

    <div className="bg-white border rounded-lg p-3 flex items-center gap-3 shadow-sm">

      <div className="w-10 h-10 rounded-lg overflow-hidden border flex items-center justify-center shrink-0">

        {logoUrl ? (
          <img
            src={logoUrl}
            alt={company.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <FaBus className="text-slate-600 text-lg" />
        )}

      </div>

      <div>
        <p className="font-semibold text-sm">
          {company.name}
        </p>

        <p className="text-[10px] text-gray-400">
          Operated by this company
        </p>
      </div>

    </div>

  </div>
)}{/* Booking Details */}
<div className="mt-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
    {[
      { label: "Booking #", value: booking.booking_number },
      { label: "Seats", value: booking.seats_count },
      { label: "Payment", value: booking.payment_method },
      { label: "Status", value: <span className="text-orange-600 font-semibold">{booking.booking_status}</span> }
    ].map((item, idx) => (
      <div key={idx} className="flex flex-col">
        <span className="text-gray-400">{item.label}</span>
        <span className="font-semibold text-slate-800 truncate">{item.value}</span>
      </div>
    ))}
  </div>

  <div className="flex justify-between items-center border-t border-slate-200 mt-3 pt-2">
    <span className="text-sm font-medium">Total</span>
    <span className="text-base font-bold text-green-600">{booking.total_price} SYP</span>
  </div>
</div>

      

        {/* Actions */}
<div className="mt-4 grid grid-cols-1 gap-3">
  {needsPayment && (
    <button
      onClick={() => navigate("/my-trips")}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-medium transition shadow-sm flex items-center justify-center gap-2"
    >
      <FaCreditCard className="text-sm" />
      Pay Now
    </button>
  )}

  <div className="grid grid-cols-2 gap-3">
    <button
      onClick={() => navigate("/my-trips")}
      className="border border-gray-200 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition text-sm flex items-center justify-center gap-2"
    >
      <FaBus className="text-sm" />
      My Trips
    </button>
    <button
      onClick={() => navigate("/")}
      className="border border-gray-200 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition text-sm"
    >
      Back to Home
    </button>
  </div>
</div>

        </div>

      </section>
    </MainLayout>
  );
}