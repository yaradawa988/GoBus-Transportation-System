import {
  FaBus,
  FaShieldAlt,
  FaClock
} from "react-icons/fa";

export default function ServicesSection() {
  return (
    <section
  className="
  relative
  z-20
  max-w-7xl
  mx-auto
  px-6
  -mt-10
  pb-20"
>
      <div className="grid md:grid-cols-3 gap-6">
        
        <div
          className="
          bg-white/15
          backdrop-blur-xl
          border border-white/20
          rounded-3xl
          p-6
          text-white"
        >
          <FaBus className="text-4xl mb-4 text-orange-400" />

          <h3 className="font-bold text-xl mb-2">
            Modern Buses
          </h3>

          <p>
            Comfortable seats and premium service.
          </p>
        </div>

        <div
          className="
          bg-white/15
          backdrop-blur-xl
          border border-white/20
          rounded-3xl
          p-6
          text-white"
        >
          <FaShieldAlt className="text-4xl mb-4 text-orange-400" />

          <h3 className="font-bold text-xl mb-2">
            Safe Travel
          </h3>

          <p>
            Professional drivers and secure trips.
          </p>
        </div>

        <div
          className="
          bg-white/15
          backdrop-blur-xl
          border border-white/20
          rounded-3xl
          p-6
          text-white"
        >
          <FaClock className="text-4xl mb-4 text-orange-400" />

          <h3 className="font-bold text-xl mb-2">
            On Time
          </h3>

          <p>
            Accurate schedules and reliable routes.
          </p>
        </div>

      </div>
    </section>
  );
}