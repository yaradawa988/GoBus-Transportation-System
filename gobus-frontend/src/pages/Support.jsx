import MainLayout from "../components/layout/MainLayout";

import {
  FaHeadset,
  FaEnvelope,
  FaWhatsapp,
  FaPhoneAlt,
  FaQuestionCircle
} from "react-icons/fa";

export default function Support() {
  return (
    <MainLayout>

      {/* Hero */}

     <section
  className="
    relative
    overflow-hidden
    pt-20
    pb-10"
>

  <div
    className="
      absolute
      inset-0
      bg-gradient-to-b
      from-slate-50
      via-slate-100
      to-slate-200"
  />

  <div
    className="
      absolute
      inset-0
      bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)]"
  />

  <div className="relative max-w-7xl mx-auto px-6">

    <div className="text-center">

      <div
        className="
          w-16
          h-16
          mx-auto
          rounded-full
          bg-white
          shadow-lg
          flex
          items-center
          justify-center
          mb-3"
      >
        <FaHeadset className="text-3xl text-orange-500" />
      </div>

      <h1
        className="
          text-3xl
          md:text-4xl
          font-bold
          text-slate-800"
      >
        Support Center
      </h1>

      <p
        className="
          mt-3
          text-slate-600
          max-w-xl
          mx-auto"
      >
        Need help with booking, payments,
        trip information, or your account?
        Our support team is ready to assist.
      </p>

    </div>

  </div>

</section>

      {/* Contact Cards */}

      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Email */}

          <div
            className="
            bg-white
            rounded-3xl
            shadow-lg
            p-8
            text-center
            hover:-translate-y-1
            transition"
          >

            <div
              className="
              w-16
              h-16
              mx-auto
              rounded-full
              bg-orange-100
              flex
              items-center
              justify-center
              mb-4"
            >
              <FaEnvelope className="text-2xl text-orange-500" />
            </div>

            <h3 className="text-xl font-bold mb-2">
              Email Support
            </h3>

            <p className="text-gray-500 mb-5">
              Get assistance by email.
            </p>

            <a
              href="mailto:support@gobus.com"
              className="
              inline-block
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold"
            >
              Send Email
            </a>

          </div>

          {/* WhatsApp */}

          <div
            className="
            bg-white
            rounded-3xl
            shadow-lg
            p-8
            text-center
            hover:-translate-y-1
            transition"
          >

            <div
              className="
              w-16
              h-16
              mx-auto
              rounded-full
              bg-green-100
              flex
              items-center
              justify-center
              mb-4"
            >
              <FaWhatsapp className="text-3xl text-green-500" />
            </div>

            <h3 className="text-xl font-bold mb-2">
              WhatsApp
            </h3>

            <p className="text-gray-500 mb-5">
              Chat directly with support.
            </p>

            <a
              href="https://wa.me/963xxxxxxxxx"
              target="_blank"
              rel="noreferrer"
              className="
              inline-block
              bg-green-500
              hover:bg-green-600
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold"
            >
              Open WhatsApp
            </a>

          </div>

          {/* Phone */}

          <div
            className="
            bg-white
            rounded-3xl
            shadow-lg
            p-8
            text-center
            hover:-translate-y-1
            transition"
          >

            <div
              className="
              w-16
              h-16
              mx-auto
              rounded-full
              bg-blue-100
              flex
              items-center
              justify-center
              mb-4"
            >
              <FaPhoneAlt className="text-2xl text-blue-500" />
            </div>

            <h3 className="text-xl font-bold mb-2">
              Phone Support
            </h3>

            <p className="text-gray-500 mb-5">
              Available during business hours.
            </p>

            <div
              className="
              text-lg
              font-semibold
              text-slate-700"
            >
              +963 xxx xxx xxx
            </div>

          </div>

        </div>

      </section>

      {/* FAQ */}

      <section className="max-w-5xl mx-auto px-6 pb-20">

        <div
          className="
          bg-white
          rounded-3xl
          shadow-lg
          p-8"
        >

          <div className="flex items-center gap-3 mb-6">

            <FaQuestionCircle
              className="
              text-orange-500
              text-2xl"
            />

            <h2 className="text-2xl font-bold">
              Frequently Asked Questions
            </h2>

          </div>

          <div className="space-y-6">

            <div>
              <h3 className="font-bold mb-2">
                How do I book a trip?
              </h3>

              <p className="text-gray-600">
                Search for available trips,
                select your preferred route,
                and complete the booking process.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">
                Can I cancel my booking?
              </h3>

              <p className="text-gray-600">
                Yes, cancellation depends on the
                ticket policy and timing.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">
                How can I contact support?
              </h3>

              <p className="text-gray-600">
                You can reach us via email,
                WhatsApp, or phone.
              </p>
            </div>

          </div>

        </div>

      </section>

    </MainLayout>
  );
}