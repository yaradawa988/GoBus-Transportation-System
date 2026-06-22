import { useEffect, useState } from "react";

import MainLayout from
  "../components/layout/MainLayout";

import {
  getNotifications,
  markAsRead,
  markAllAsRead
} from "../api/notificationApi";

import {
  FaBell,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

export default function
NotificationsPage() {

  const [notifications,
    setNotifications] = useState([]);

  const [loading,
    setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications =
    async () => {

      try {

        const response =
          await getNotifications();

        setNotifications(
          response.data.data
        );

      } finally {

        setLoading(false);
      }
    };

  const handleRead =
    async (id) => {

      await markAsRead(id);

      loadNotifications();
    };

  const handleReadAll =
    async () => {

      await markAllAsRead();

      loadNotifications();
    };

  return (
    <MainLayout>

      <section className=" bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)] 
        min-h-screen
        bg-slate-50
        py-10
      ">

        <div className="
          max-w-3xl
          mx-auto
          px-4
        ">

          {/* Header */}

          <div className="
            flex
            justify-between
            items-center
            mb-6
          ">

            <div>

              <h1 className="
                text-3xl
                font-bold
              ">
                Notifications
              </h1>

              <p className="
                text-gray-500
              ">
                Your latest updates
              </p>

            </div>

            <button
              onClick={
                handleReadAll
              }
              className="
                bg-orange-500
                text-white
                px-4
                py-2
                rounded-xl
              "
            >
              Mark All Read
            </button>

          </div>

          {loading ? (

            <div className="
              text-center
              py-10
            ">
              Loading...
            </div>

          ) : notifications.length === 0 ? (

            <div className="
              bg-white
              rounded-3xl
              p-10
              text-center
              shadow
            ">

              <FaBell className="
                mx-auto
                text-5xl
                text-gray-300
                mb-4
              " />

              <p className="
                text-gray-500
              ">
                No notifications
              </p>

            </div>

          ) : (

            <div className="
              space-y-4
            ">

              {notifications.map(
                (n) => (

                <div
                  key={n.id}
                  className={`
                    bg-white
                    rounded-3xl
                    p-5
                    shadow-sm
                    border
                    hover:shadow-md
                    transition
                    ${
                      !n.read_at
                      ? "border-orange-300 bg-orange-50"
                      : "border-slate-200"
                    }
                  `}
                >

                  <div className="
                    flex
                    justify-between
                    gap-4
                  ">

                    <div className="
                      flex
                      gap-4
                    ">

                      <div className="
                        w-12 h-12
                        rounded-full
                        bg-orange-100
                        flex
                        items-center
                        justify-center
                      ">

                        <FaBell
                          className="
                            text-orange-500
                          "
                        />

                      </div>

                      <div>

                        <h3 className="
                          font-semibold
                        ">
                          {
                            n.data.title
                          }
                        </h3>

                        <p className="
                          text-gray-600
                          mt-1
                        ">
                          {
                            n.data.message
                          }
                        </p>

                        <div className="
                          flex
                          items-center
                          gap-2
                          mt-2
                          text-xs
                          text-gray-400
                        ">

                          <FaClock />

                          {new Date(
                            n.created_at
                          ).toLocaleString()}

                        </div>

                      </div>

                    </div>

                    {!n.read_at && (

                      <button
                        onClick={() =>
                          handleRead(
                            n.id
                          )
                        }
                        className="
                          text-green-600
                        "
                      >

                        <FaCheckCircle />

                      </button>

                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </MainLayout>
  );
}