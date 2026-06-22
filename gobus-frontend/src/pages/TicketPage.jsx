import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicket , downloadTicket} from "../api/bookingApi";
import { QRCodeCanvas } from "qrcode.react";
import {  FaDownload,
  FaBus,
  FaUser,
  FaChair,
  FaRoute,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTicketAlt, } from "react-icons/fa";

export default function TicketPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTicket();
  }, [id]);

  const loadTicket = async () => {
    try {
      setLoading(true);
      const res = await getTicket(id);
      setTicket(res.data);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    window.open(
      `http://localhost:8000/api/tickets/${id}/download`,
      "_blank"
    );
  };

  if (loading)
    return <p className="p-5 text-center text-gray-500">Loading...</p>;

  if (!ticket)
    return <p className="p-5 text-center text-gray-500">Ticket not found</p>;

  return (
    <section className="
  min-h-screen
  bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_35%,#dbe4ee_65%,#1e293b_100%)]
  py-6
  px-2
">
<div className="max-w-[820px] mx-auto scale-[0.80] origin-top">

       {/* TICKET CARD */}
<div
  className="
    relative
    bg-white
    rounded-[30px]
    shadow-2xl
    overflow-hidden
    border
  "
>

{/* TOP BANNER */}
<div
  className="
    relative
    h-28
    bg-[#1E4F88]
    overflow-hidden
    text-white
  "
>

  {/* Orange wave */}
  <div
    className="
      absolute
      -top-24
      right-8
      w-[240px]
      h-[240px]
      bg-[#F9A11B]
      rounded-full
      z-10
    "
  />

  {/* White/Card wave */}
  <div
    className="
      absolute
      -top-28
      -right-12
      w-[250px]
      h-[250px]
      bg-white
      rounded-full
      z-20
    "
  />

  {/* Blue upper wave */}
  <div
    className="
      absolute
      -top-32
      right-24
      w-[280px]
      h-[280px]
      border-[28px]
      border-blue-400/25
      rounded-full
      z-0
    "
  />

  <div className="relative z-30 px-6 py-5">
    <h1 className="text-xl font-black tracking-[3px]">
      GOBUS COMPANY
    </h1>

    <p className="text-sm opacity-90">
      Premium Bus Ticket
    </p>

    <div
      className="
        mt-2
        inline-flex
        bg-white/20
        backdrop-blur-sm
        px-3
        py-1
        rounded-full
        text-xs
      "
    >
      Ticket #{ticket.ticket_number}
    </div>
  </div>
</div>

  <div className="flex flex-col md:flex-row">

    {/* LEFT SIDE */}

   <div className="flex-1 p-5">

      {/* Route */}

      <div className="mb-4">

        <div className="
          flex
          items-center
          justify-between
        ">

          <div>
            <p className="text-gray-400 text-xs">
              FROM
            </p>

            <h2 className="
              text-xl
              font-bold
            ">
              {ticket.booking.trip.departure_station.name}
            </h2>
          </div>

          <FaRoute className="
            text-orange-500
            text-2xl
          " />

          <div className="text-right">
            <p className="text-gray-400 text-xs">
              TO
            </p>

            <h2 className="
              text-xl
              font-bold
            ">
              {ticket.booking.trip.arrival_station.name}
            </h2>
          </div>

        </div>

      </div>

      {/* Information Grid */}

      <div className="
        grid
        grid-cols-2
        gap-4
        text-sm
      ">

        <InfoCard
          icon={<FaUser />}
          title="Passenger"
          value={ticket.booking.user?.name}
          color="text-orange-500"
        />

        <InfoCard
          icon={<FaBus />}
          title="Bus"
          value={
            ticket.booking.trip.bus?.name
          }
          color="text-blue-500"
        />

        <InfoCard
          icon={<FaChair />}
          title="Seats"
          value={
            ticket.booking.seats
              ?.map(
                s => s.seat_number
              )
              .join(", ")
          }
          color="text-purple-500"
        />

        <InfoCard
          icon={<FaTicketAlt />}
          title="Booking"
          value={
            ticket.booking.booking_number
          }
          color="text-green-500"
        />

      </div>

      {/* Time */}

      <div className="
        mt-6
        grid
        grid-cols-2
        gap-4
      ">

        <div className="
          bg-slate-50
          rounded-2xl
          p-4
        ">

          <p className="
            text-xs
            text-gray-500
          ">
            Departure
          </p>

          <p className="
            font-bold
          ">
            {new Date(
              ticket.booking.trip.departure_time
            ).toLocaleString()}
          </p>

        </div>

        <div className="
          bg-slate-50
          rounded-2xl
          p-4
        ">

          <p className="
            text-xs
            text-gray-500
          ">
            Arrival
          </p>

          <p className="
            font-bold
          ">
            {new Date(
              ticket.booking.trip.arrival_time
            ).toLocaleString()}
          </p>

        </div>

      </div>

      {/* Price */}

      <div className="
        mt-5
        flex
        justify-between
        items-center
      ">

        <div>

          <p className="
            text-gray-500
            text-sm
          ">
            Total Price
          </p>

          <h2 className="
            text-3xl
            font-bold
            text-green-600
          ">
            {ticket.booking.total_price}  SYP
          </h2>

        </div>

        <div className="flex gap-2">

          <span className="
            px-3 py-1
            rounded-full
            bg-green-100
            text-green-700
            text-xs
            font-semibold
          ">
            {ticket.booking.payment_status}
          </span>

          <span className="
            px-3 py-1
            rounded-full
            bg-blue-100
            text-blue-700
            text-xs
            font-semibold
          ">
            {ticket.booking.booking_status}
          </span>

        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}
    

    <div className="
  relative
  w-full
  md:w-52
  border-t
  md:border-t-0
  md:border-l-[3px]
  border-dashed
  border-slate-300
  flex
  flex-col
  items-center
  justify-center
  p-5
  bg-slate-50
">
      {/* Ticket cuts */}
<div
  className="
    hidden md:block
    absolute
    top-1/2
    -left-4
    -translate-y-1/2
    w-8
    h-8
    bg-white
    rounded-full
    shadow-inner
  "
/>

<div
  className="
    hidden md:block
    absolute
    top-[20%]
    -left-4
    w-8
    h-8
    bg-white
    rounded-full
  "
/>

<div
  className="
    hidden md:block
    absolute
    bottom-[20%]
    -left-4
    w-8
    h-8
    bg-white
    rounded-full
  "
/>

      <img
        src={`http://localhost:8000/storage/${ticket.qr_code}`}
        alt="QR"
        className="
          w-32
          h-32
          bg-white
          p-2
          rounded-xl
          border
        "
      />

       <p className="
        text-xs
        text-gray-500
        mt-3
      ">
        Scan at boarding gate
      </p>
      <div className="
        mt-6
        border
        rounded-2xl
        px-6
        py-3
        text-center
      ">

        <p className="
          text-xs
          text-gray-400
        ">
          SEAT
        </p>

        <h2 className="
          text-2xl
          font-bold
        ">
          {ticket.booking.seats
            ?.map(
              s => s.seat_number
            )
            .join(", ")}
        </h2>

      </div>
      
      
       <p className="
        text-xs
        text-gray-500
        mt-3
      ">
        Thank you for choosing GoBus
      </p>


    </div>

  </div>

  {/* FOOTER ACTIONS */}

  <div className="
    p-5
    border-t
    flex
    gap-3
  ">

    <button
      onClick={() =>
        downloadTicket(ticket.id)
      }
      className="
        flex-1
        bg-orange-500
        hover:bg-orange-600
        text-white
        py-3
        rounded-xl
        flex
        items-center
        justify-center
        gap-2
      "
    >
      <FaDownload />
      Download PDF
    </button>

    <button
      onClick={() =>
        window.history.back()
      }
      className="
        flex-1
        border
        py-3
        rounded-xl
      "
    >
      Back
    </button>

  </div>



    </div>
  </div>
</section>
  );
}

function InfoCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div
      className="
        bg-slate-50
        border
        rounded-2xl
        p-3
        hover:shadow-sm
        transition
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          mb-2
        "
      >
        <span className={color}>
          {icon}
        </span>

        <p className="
          text-xs
          text-gray-500
        ">
          {title}
        </p>
      </div>

      <p className="
        font-semibold
        text-slate-800
        truncate
      ">
        {value || "-"}
      </p>
    </div>
  );
}