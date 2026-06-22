import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import SearchResults from "../pages/SearchResults";
import TripDetails from "../pages/TripDetails";
import TripsPage from "../pages/TripsPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Support from "../pages/Support";
import Profile from "../pages/Profile";
import BookingPage from "../pages/BookingPage";
import TicketPage from "../pages/TicketPage";
import BookingSuccessPage from "../pages/BookingSuccessPage";
import NotificationsPage from "../pages/NotificationsPage";
import VerifyTicketPage from "../pages/VerifyTicketPage";
import MyTrips from "../pages/MyTrips";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

   

        <Route
          path="/search-results"
          element={<SearchResults />}
        />

 <Route
          path="/trips"
          element={<TripsPage />}
        />
        <Route
          path="/trips/:id"
          element={<TripDetails />}
        />
<Route path="/login" element={<Login />} /> 

<Route path="/register" element={<Register />} />
<Route path="/profile" element={<Profile />} />

<Route path="/support" element={<Support />} />
<Route
  path="/trips/:id/book"
  element={<BookingPage />}
  
/>

<Route
  path="/my-trips"
  element={<MyTrips />}
/>
<Route path="/tickets/:id" element={<TicketPage />} />
<Route
  path="/booking-success/:ticketId?"
  element={<BookingSuccessPage />}
/>
<Route
  path="/notifications"
  element={<NotificationsPage />}
/>

<Route
  path="/tickets/verify/:token"
  element={<VerifyTicketPage />}
/>


      </Routes>

    </BrowserRouter>
  );
}