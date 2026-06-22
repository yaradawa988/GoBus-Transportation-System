import {
  FaBus,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="
      bg-gradient-to-b
      from-slate-800
      via-slate-900
      to-slate-950
      text-white"
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-8
        grid
        md:grid-cols-3
        gap-8"
      >

        {/* Logo */}

        <div>

          <div className="flex items-center gap-3 mb-3">

            <FaBus className="text-orange-500 text-3xl" />

            <h2 className="text-2xl font-bold">
              GoBus
            </h2>

          </div>

          <p
            className="
            text-gray-400
            leading-relaxed
            text-sm
            max-w-sm"
          >
            Smart bus booking platform providing
            comfortable journeys, secure reservations,
            and reliable transportation services.
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3
            className="
            font-bold
            text-lg
            mb-4"
          >
            Quick Links
          </h3>

          <div className="space-y-2">

            <Link
              to="/"
              className="
              block
              text-gray-400
              hover:text-orange-400
              transition"
            >
              Home
            </Link>

            <Link
              to="/trips"
              className="
              block
              text-gray-400
              hover:text-orange-400
              transition"
            >
              Trips
            </Link>

            <Link
              to="/support"
              className="
              block
              text-gray-400
              hover:text-orange-400
              transition"
            >
              Support
            </Link>

          </div>

        </div>

        {/* Contact */}

        <div>

          <h3
            className="
            font-bold
            text-lg
            mb-4"
          >
            Contact Us
          </h3>

          <div className="space-y-3">

            <div className="flex items-center gap-3">

              <FaEnvelope className="text-orange-500" />

              <span className="text-gray-400 text-sm">
                support@gobus.com
              </span>

            </div>

            <div className="flex items-center gap-3">

              <FaPhone className="text-orange-500" />

              <span className="text-gray-400 text-sm">
                +963 xx xxx xxxx
              </span>

            </div>

            <div className="flex items-center gap-3">

              <FaMapMarkerAlt className="text-orange-500" />

              <span className="text-gray-400 text-sm">
                Damascus, Syria
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Bar */}

      <div
        className="
        border-t
        border-white/10
        py-4"
      >

        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-2"
        >

          <p className="text-gray-500 text-sm">
            © 2026 GoBus. All rights reserved.
          </p>

          <p className="text-gray-600 text-xs">
            Travel Smart • Travel Comfortable
          </p>

        </div>

      </div>

    </footer>
  );
}