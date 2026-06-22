import { useEffect, useState } from "react";
import { getStations } from "../../api/stationApi";
import { toast } from "react-toastify";
export default function SearchTripCard({ onSearch }) {
  const [stations, setStations] = useState([]);

  const [form, setForm] = useState({
    departure_station_id: "",
    arrival_station_id: "",
    date: "",
  });

  useEffect(() => {
    loadStations();
  }, []);

  const loadStations = async () => {
    try {
      const response = await getStations();

      setStations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submit = () => {
    if (!form.departure_station_id || !form.arrival_station_id || !form.date) {
  toast.error("Please complete all fields");
  return;
}
toast.success("Trips loaded successfully");
    onSearch(form);
  };

  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-2xl
      p-4
      w-full
      max-w-xl"
    >
      <h2
  className="
    text-3xl
    md:text-3xl
    font-extrabold
    tracking-tight
    text-slate-800
    mb-8
  "
>
  Search Trip
</h2>

      <div className="grid grid-cols-1 gap-4">

        {/* FROM */}

        <div>
          <label className="font-semibold">
            Departure Station
          </label>

          <select
            value={form.departure_station_id}
            onChange={(e) =>
              setForm({
                ...form,
                departure_station_id: e.target.value,
              })
            }
            className="
            w-full
            mt-2
            p-4
            rounded-3xl
            bg-gray-100"
          >
            <option value="">
              Select departure station
            </option>

            {stations.map((station) => (
              <option
                key={station.id}
                value={station.id}
              >
                {station.name}
              </option>
            ))}
          </select>
        </div>

        {/* TO */}

        <div>
          <label className="font-semibold">
            Arrival Station
          </label>

          <select
            value={form.arrival_station_id}
            onChange={(e) =>
              setForm({
                ...form,
                arrival_station_id: e.target.value,
              })
            }
            className="
            w-full
            mt-2
            p-4
            rounded-3xl
            bg-gray-100"
          >
            <option value="">
              Select arrival station
            </option>

            {stations.map((station) => (
              <option
                key={station.id}
                value={station.id}
              >
                {station.name}
              </option>
            ))}
          </select>
        </div>

        {/* DATE */}

        <div>
          <label className="font-semibold">
            Travel Date
          </label>

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
            className="
            w-full
            mt-2
            p-4
          rounded-3xl
            bg-gray-100"
          />
        </div>
      </div>

      <button
        onClick={submit}
        className="
        mt-6
        w-full
        bg-orange-500
        hover:bg-orange-600
        text-white
        font-bold
        py-4
        rounded-3xl"
      >
        Search Trips
      </button>
    </div>
  );
}