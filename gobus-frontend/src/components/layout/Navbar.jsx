import { FaBus, FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useAuth from "../../hooks/useAuth";
import { useRef } from "react";
import {
  getUnreadNotifications,
  markAllAsRead,
} from "../../api/notificationApi";
import { useTranslation }
from "react-i18next";
import { FaGlobe } from "react-icons/fa";
export default function Navbar() {
const { t, i18n } = useTranslation();
const changeLanguage = lang => {

  i18n.changeLanguage(lang);

  localStorage.setItem(
    "language",
    lang
  );
};
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] =
    useState([]);

  const [unreadCount, setUnreadCount] =
    useState(0);

  useEffect(() => {

    if (user) {
      loadNotifications();
    }

  }, [user]);

  const loadNotifications = async () => {

    try {

      const res =
        await getUnreadNotifications();

      setNotifications(
        res.data.slice(0, 5)
      );

      setUnreadCount(
        res.data.length
      );

    } catch (e) {

      console.error(e);

    }
  };
const notificationRef = useRef(null);
useEffect(() => {

  const handleClickOutside = (event) => {

    if (
      notificationRef.current &&
      !notificationRef.current.contains(
        event.target
      )
    ) {
      setShowNotifications(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };

}, []);
  const handleMarkAllAsRead =
    async () => {

      try {

        await markAllAsRead();

        setNotifications([]);

        setUnreadCount(0);

      } catch (error) {

        console.error(error);

      }
      
    };

  
  return (
    
    <header
  className="
    fixed
    top-0
    left-0
    w-full
    z-30
    backdrop-blur-xl
    bg-transparent
  "
>
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-5
        flex
        items-center
        justify-between"
      >
        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <FaBus className="text-orange-500 text-3xl" />

          <span className="text-white font-bold text-2xl">
            GoBus
          </span>
        </Link>

        {/* Menu */}

        <nav
          className="
          hidden
          md:flex
          gap-8
          text-white
          font-medium"
        >
          <Link
            to="/"
            className="hover:text-orange-400 transition"
          >
          {t("home")}
          </Link>

          <Link
            to="/trips"
            className="hover:text-orange-400 transition"
          >
           {t("trips")}
          </Link>

          <Link
            to="/support"
            className="hover:text-orange-400 transition"
          >
           {t("support")}
          </Link>
        </nav>

        <div className="flex gap-3">
<div
  className="
    flex
    items-center
    rounded-full
    bg-white/10
    backdrop-blur-xl
    border
    border-white/20
    overflow-hidden
    h-10
  "
>
  <button
  onClick={() =>
    changeLanguage(
      i18n.language === "en"
        ? "ar"
        : "en"
    )
  }
  className="
    w-11
    h-11
    rounded-2xl
    bg-white/10
    backdrop-blur-xl
    border
    border-white/20
    text-white
    flex
    items-center
    justify-center
    hover:bg-orange-500
    hover:border-orange-400
    transition-all
    duration-300
  "
>
  <FaGlobe />
  
</button>

</div>
  {!user ? (

    <>
      <Link
        to="/login"
        className="
        px-5
        py-2
        rounded-xl
        border
        border-white/30
        bg-white/10
        backdrop-blur-md
        text-white"
      >
      
        {t("login")}
      </Link>

      <Link
        to="/register"
        className="
        px-5
        py-2
        rounded-xl
        bg-orange-500
        text-white"
      >
    
         {t("sign up")}
      </Link>
    </>

  ) : (

    <>
    
  {/* Notifications */}

  <div
  ref={notificationRef}
  className="relative"
>

 <button
  onClick={() =>
    setShowNotifications(
      !showNotifications
    )
  }
  className={`
    relative
    w-11
    h-11
    rounded-2xl
    flex
    items-center
    justify-center
    backdrop-blur-xl
    border
    transition-all
    duration-300
    ${
      showNotifications
        ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/30 scale-105"
        : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:scale-105"
    }
  `}
>
  <FaBell
    className={`text-lg ${
      unreadCount > 0
        ? "animate-pulse"
        : ""
    }`}
  />

  {unreadCount > 0 && (
    <span
      className="
  absolute
  -top-1
  -right-1
  min-w-[20px]
  h-5
  px-1
  rounded-full
  bg-red-500
  text-white
  text-[11px]
  font-bold
  flex
  items-center
  justify-center
"
    >
      {unreadCount > 99
        ? "99+"
        : unreadCount}
    </span>
  )}
</button>
  {showNotifications && (
  <div
    className="
      absolute
      right-0
      mt-3
      w-96
      bg-white/95
      backdrop-blur-xl
      border
      border-slate-200
      rounded-3xl
      shadow-2xl
      overflow-hidden
      z-50
    "
  >

    {/* Header */}

    <div
      className="
        p-4
        border-b
        bg-white/80
        backdrop-blur-md
        sticky
        top-0
        z-10
      "
    >
      <h3 className="font-bold text-slate-800">
        Notifications
      </h3>

      <p className="text-xs text-gray-500 mt-1">
        {unreadCount} unread notifications
      </p>
    </div>

    {/* Notifications List */}

    <div className="max-h-[350px] overflow-y-auto">

      {notifications.length === 0 ? (

        <div className="p-6 text-center text-gray-500">
          No notifications
        </div>

      ) : (

        <>
          {notifications.map((n) => (

            <div
              key={n.id}
              className="
                p-4
                border-b
                hover:bg-slate-50
                cursor-pointer
                transition
              "
            >
              <p className="font-medium text-slate-800">
                {n.data.title || "Notification"}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {n.data.message || n.data.text}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(
                  n.created_at
                ).toLocaleString()}
              </p>
            </div>

          ))}

          {unreadCount > 5 && (

            <div
              className="
                text-center
                py-3
                text-xs
                text-gray-500
                bg-slate-50
              "
            >
              +{unreadCount - 5} more notifications
            </div>

          )}
        </>

      )}

    </div>

    {/* Footer */}

    <div
      className="
        p-3
        border-t
        bg-white/80
        backdrop-blur-md
        sticky
        bottom-0
        flex
        justify-between
        items-center
      "
    >

      <button
        onClick={handleMarkAllAsRead}
        className="
          text-sm
          text-orange-500
          hover:text-orange-600
          transition
        "
      >
        Mark all as read
      </button>

      <Link
        to="/notifications"
        className="
          text-sm
          text-blue-500
          hover:text-blue-600
          transition
        "
      >
        View all
      </Link>

    </div>

  </div>
)}

    

</div>

  {/* Profile */}

  <Link
    to="/profile"
    className="
      px-5
      py-2
      rounded-xl
      bg-white
      text-slate-900
    "
  >
    Profile
  </Link>

  {/* Logout */}

  <button
    onClick={logout}
    className="
      px-5
      py-2
      rounded-xl
      bg-red-500
      text-white
    "
  >
    Logout
  </button>
</>

  )}

</div>
      </div>
    </header>
  );
}