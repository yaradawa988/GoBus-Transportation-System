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

  const needsPayment =
    booking.booking_status === "pending_payment";

  const waitingApproval =
    booking.booking_status === "pending";

  return (
    <MainLayout>
      <section className=" bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)]  min-h-[80vh] bg-slate-50 flex items-center justify-center px-4 py-10 pt-24">

        <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-slate-100 p-6">

          {/* Header */}

          <div className="text-center">

            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />

            <h1 className="text-2xl font-bold text-slate-800">
              Booking Created
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Your booking request has been created successfully.
            </p>

          </div>

          {/* Payment Message */}

          {needsPayment && (
            <div className="mt-5 bg-orange-50 border border-orange-200 rounded-2xl p-4">

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

          {/* Booking Details */}

          <div className="mt-6 bg-slate-50 rounded-2xl p-4 space-y-3">

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Booking #
              </span>

              <span className="font-semibold">
                {booking.booking_number}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Seats
              </span>

              <span className="font-semibold">
                {booking.seats_count}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Payment
              </span>

              <span className="font-semibold capitalize">
                {booking.payment_method}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Status
              </span>

              <span className="font-semibold text-orange-600">
                {booking.booking_status}
              </span>
            </div>

            <div className="flex justify-between border-t pt-3">
              <span className="font-medium">
                Total
              </span>

              <span className="text-lg font-bold text-green-600">
                {booking.total_price}  SYP
              </span>
            </div>

          </div>

          {/* Actions */}

          <div className="mt-6 flex flex-col gap-3">

            {needsPayment && (
              <button
                onClick={() => navigate("/my-trips")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
              >
                <FaCreditCard className="inline mr-2" />
                Pay Now
              </button>
            )}

            <button
              onClick={() => navigate("/my-trips")}
              className="w-full border py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              <FaBus className="inline mr-2" />
              View My Trips
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full border py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Back to Home
            </button>

          </div>

        </div>

      </section>
    </MainLayout>
  );
}