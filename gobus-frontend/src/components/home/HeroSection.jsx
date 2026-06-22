import SearchTripCard from "./SearchTripCard";
import heroBus from "../../assets/images/hero-bus.jpg";

export default function HeroSection({ onSearch }) {
  return (
<section
  className="
  relative
  min-h-[850px]
  pb-32
  bg-cover
  bg-center
  overflow-hidden"
  style={{
    backgroundImage: `url(${heroBus})`,
  }}
>
      {/* Overlay */}
     <div
  className="
  absolute
  inset-0
  bg-gradient-to-b
  from-slate-900/45
  via-slate-900/35
  to-slate-900/60"
/>

      {/* Content */}
      <div
  className="
  relative
  z-10
  max-w-7xl
  mx-auto
  px-6
  min-h-[92vh]
  pt-24
  flex
  items-center"
>
        <div
          className="
          grid
          lg:grid-cols-2
          gap-12
          items-center
          w-full"
        >
          {/* Left */}
          <div>
            <span
              className="
              inline-block
              bg-orange-500
              px-5
              py-2
              rounded-full
              text-white
              font-semibold"
            >
              Premium Bus Service
            </span>

            <h1
              className="
              text-white
              text-5xl
              md:text-7xl
              font-extrabold
             mt-6
              leading-tight"
            >
              Book Your
              <br />
              Next Journey
            </h1>

            <p
              className="
              text-gray-200
              text-lg
              md:text-xl
             mt-6
              max-w-xl"
            >
              Comfortable travel across cities with
              modern buses and online booking.
            </p>
          </div>

          {/* Right */}
          <div
  className="
  flex
  justify-center
  lg:justify-end
  lg:mt-12"
>
            <SearchTripCard onSearch={onSearch} />
          </div>
        </div>
      </div>
    </section>
  );
}