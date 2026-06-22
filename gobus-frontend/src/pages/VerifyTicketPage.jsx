import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import { verifyTicket } from "../api/bookingApi";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaChair,
  FaRoute,
} from "react-icons/fa";

export default function VerifyTicketPage() {
  const { token } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTicket();
  }, []);

  const loadTicket = async () => {
    try {
      const res = await verifyTicket(token);
      setData(res);
    } catch (e) {
      setData({
        valid: false,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="min-h-screen bg-slate-50 py-24 px-4">

        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

          <div
            className={`p-6 text-center text-white ${
              data.valid
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >

            {data.valid ? (
              <>
                <FaCheckCircle className="text-6xl mx-auto mb-3" />

                <h1 className="text-3xl font-bold">
                  Valid Ticket
                </h1>
              </>
            ) : (
              <>
                <FaTimesCircle className="text-6xl mx-auto mb-3" />

                <h1 className="text-3xl font-bold">
                  Invalid Ticket
                </h1>
              </>
            )}

          </div>

          {data.valid && (
            <div className="p-6 space-y-4">

              <div className="flex justify-between">
                <span>Passenger</span>
                <span className="font-semibold">
                  {data.ticket.booking.user.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Route</span>

                <span className="font-semibold">
                  {data.ticket.booking.trip.departure_station.name}
                  {" → "}
                  {data.ticket.booking.trip.arrival_station.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Seats</span>

                <span className="font-semibold">
                  {data.ticket.booking.seats
                    .map(s => s.seat_number)
                    .join(", ")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>

                <span
                  className={`
                    font-bold
                    ${
                      data.status === "valid"
                        ? "text-green-600"
                        : data.status === "used"
                        ? "text-blue-600"
                        : "text-red-600"
                    }
                  `}
                >
                  {data.status.toUpperCase()}
                </span>
              </div>

            </div>
          )}

        </div>

      </section>
    </MainLayout>
  );
}