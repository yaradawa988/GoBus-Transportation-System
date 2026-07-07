import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import TripCard from "../components/trips/TripCard";
import {
  FaBus,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaClock,
  FaRoute,
  FaFilter,
  FaRedo,
  FaArrowDown
} from "react-icons/fa";

export default function SearchResults() {
  const location = useLocation();
  const trips = location.state?.trips || [];
  const searchData = location.state?.searchData || {};

  const [sortBy, setSortBy] = useState("price");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [maxSelectedPrice, setMaxSelectedPrice] = useState(trips.length > 0 ? Math.max(...trips.map(t => t.price)) : 0);
  const [minimumSeats, setMinimumSeats] = useState(0);

  // --- Logic & Filtering ---
  const filteredTrips = useMemo(() => {
    let data = [...trips];
    if (selectedCompanies.length > 0) data = data.filter(t => selectedCompanies.includes(t.company.id));
    data = data.filter(t => t.price <= maxSelectedPrice && t.available_seats >= minimumSeats);
    
    const sortFns = {
      price: (a, b) => a.price - b.price,
      earliest: (a, b) => new Date(a.departure_time) - new Date(b.departure_time),
      latest: (a, b) => new Date(b.departure_time) - new Date(a.departure_time),
      duration: (a, b) => a.duration_minutes - b.duration_minutes,
    };
    return data.sort(sortFns[sortBy]);
  }, [trips, sortBy, selectedCompanies, maxSelectedPrice, minimumSeats]);

  const stats = {
    cheapest: trips.length > 0 ? Math.min(...trips.map(t => t.price)) : 0,
    fastest: trips.length > 0 ? Math.min(...trips.map(t => t.duration_minutes)) : 0,
    max: trips.length > 0 ? Math.max(...trips.map(t => t.price)) : 0
  };

  const companies = [...new Map(trips.map(t => [t.company.id, t.company])).values()];
  const from = searchData?.from || "Unknown";
  const to = searchData?.to || "Unknown";
  const date = searchData?.date || "—";

  return (
    <MainLayout>
      <section className=" min-h-screen pt-28 pb-10 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)] px-4 md:px-8">
        
        {/* --- Hero Header --- */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-xl font-bold flex items-center gap-3">
                        {from} <FaRoute className="text-orange-500" /> {to}
                    </h1>
                    <p className="text-gray-500 mt-2 flex items-center gap-2"><FaCalendarAlt className="text-orange-500"/> {date}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Trips", val: filteredTrips.length, icon: FaBus, color: "text-blue-500" },
                        { label: "Lowest", val: `${stats.cheapest} SYP`, icon: FaMoneyBillWave, color: "text-green-500" },
                        { label: "Fastest", val: `${stats.fastest} m`, icon: FaClock, color: "text-purple-500" },
                        { label: "Max", val: `${stats.max} SYP`, icon: FaMoneyBillWave, color: "text-orange-500" },
                    ].map((item, i) => (
                        <div key={i} className="bg-gray-50 p-3 rounded-xl text-center">
                            <p className="text-[10px] text-gray-400 uppercase font-bold">{item.label}</p>
                            <p className={`font-bold ${item.color} flex items-center justify-center gap-1 mt-1`}> <item.icon size={12}/> {item.val}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* --- Sidebar Filters --- */}
            <aside className="lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl shadow-sm border sticky top-28">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold flex items-center gap-2"><FaFilter /> Filters</h3>
                        <button onClick={() => { setSelectedCompanies([]); setMaxSelectedPrice(stats.max); setMinimumSeats(0); }} className="text-orange-500 hover:text-orange-700 transition"><FaRedo /></button>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Price: {maxSelectedPrice} SYP</label>
                            <input type="range" min={stats.cheapest} max={stats.max} value={maxSelectedPrice} onChange={(e) => setMaxSelectedPrice(Number(e.target.value))} className="w-full accent-orange-500" />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2">Companies</label>
                            {companies.map(c => (
                                <label key={c.id} className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded-lg">
                                    <input type="checkbox" checked={selectedCompanies.includes(c.id)} onChange={(e) => e.target.checked ? setSelectedCompanies([...selectedCompanies, c.id]) : setSelectedCompanies(selectedCompanies.filter(id => id !== c.id))} />
                                    <img src={c.logo} className="w-6 h-6 rounded-full" alt="" />
                                    <span className="text-sm">{c.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- Results --- */}
            <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-xl">{filteredTrips.length} Available Trips</h2>
                    <div className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl">
                        <FaArrowDown className="text-gray-400 text-xs" />
                        <select className="outline-none text-sm font-medium" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="price">Lowest Price</option>
                            <option value="earliest">Earliest</option>
                            <option value="latest">Latest</option>
                            <option value="duration">Fastest</option>
                        </select>
                    </div>
                </div>

                <motion.div layout className="grid gap-6">
                    <AnimatePresence>
                        {filteredTrips.length > 0 ? filteredTrips.map((trip, idx) => (
                            <motion.div key={trip.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                                <TripCard trip={trip} />
                            </motion.div>
                        )) : (
                           <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{
        duration: 0.5,
        type: "spring"
    }}
    className="
    bg-white
    rounded-[32px]
    shadow-xl
    border
    border-gray-100
    py-20
    px-10
    text-center
    overflow-hidden
    relative"
>

    {/* Background Decoration */}

    <div
        className="
        absolute
        -top-20
        -right-20
        w-72
        h-72
        rounded-full
        bg-orange-100/40"
    />

    <div
        className="
        absolute
        -bottom-24
        -left-24
        w-80
        h-80
        rounded-full
        bg-slate-100"
    />

   

  {/* Animated Icon */}

<motion.div
    animate={{
        y: [0, -10, 0],
        rotate: [0, -8, 8, 0]
    }}
    transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
    }}
    whileHover={{
        y: -6,
        scale: 1.08,
        rotate: 0
    }}
    className="
    relative
    z-10
    inline-flex
    items-center
    justify-center
    w-28
    h-28
    rounded-full
    bg-orange-100
    text-orange-500
    text-5xl
    mx-auto
    shadow-lg"
>
    🔍
</motion.div>

    <h2
        className="
        mt-8
        text-4xl
        font-extrabold
        text-slate-800"
    >
        Oops...
    </h2>

    <p
        className="
        mt-4
        max-w-lg
        mx-auto
        text-gray-500
        leading-7"
    >
        We couldn't find any trips matching your search
        criteria or selected filters.
        Try adjusting the filters or perform another search.
    </p>

    {/* Buttons */}

    <div
        className="
        flex
        flex-wrap
        justify-center
        gap-4
        mt-10"
    >

        <button
            onClick={() => {

                setSelectedCompanies([]);
                setMinimumSeats(0);
                setMaxSelectedPrice(stats.max);

            }}
            className="
            px-8
            py-3
            rounded-2xl
            bg-orange-500
            hover:bg-orange-600
            text-white
            font-semibold
            transition"
        >
            Clear Filters
        </button>

        <button
            onClick={() => window.history.back()}
            className="
            px-8
            py-3
            rounded-2xl
            border
            border-slate-300
            hover:bg-slate-50
            font-semibold
            transition"
        >
            Modify Search
        </button>

    </div>

</motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
      </section>
    </MainLayout>
  );
}