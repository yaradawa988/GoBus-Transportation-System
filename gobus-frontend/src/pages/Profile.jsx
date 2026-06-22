import { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "../api/profileApi";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaClock,
  FaEdit,
  FaCamera,
  FaSuitcaseRolling
} from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        password: "",
        password_confirmation: "",
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("phone", form.phone);

      if (form.password) {
        formData.append("password", form.password);
        formData.append(
          "password_confirmation",
          form.password_confirmation
        );
      }

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await updateProfile(formData);

      setUser(response.user);

      setShowEdit(false);

      alert("Profile updated successfully");
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const avatarUrl = avatar
    ? URL.createObjectURL(avatar)
    : user?.avatar ||
      `https://ui-avatars.com/api/?name=${user?.name}`;

  return (
    <MainLayout>
      <section
        className="
        min-h-screen
        pt-32
        pb-16
        bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)]
      "
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-[32px] shadow-xl overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-slate-800 via-slate-700 to-orange-500" />

            <div className="px-8 pb-8">
              <div className="-mt-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                <div className="flex items-end gap-5">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
                    <img
                      src={avatarUrl}
                      alt={user?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="pb-3">
                    <h1 className="text-3xl font-bold text-slate-800">
                      {user?.name}
                    </h1>

                    <p className="text-gray-500 mt-1">
                      GoBus Member
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setShowEdit(true)
                  }
                  className="
                  flex items-center gap-2
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  px-6 py-3
                  rounded-2xl
                  font-semibold
                "
                >
                  <FaEdit />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">
                Personal Information
              </h2>

              <div className="space-y-6">
                <InfoRow
                  icon={<FaUser />}
                  bg="bg-orange-100"
                  color="text-orange-500"
                  title="Full Name"
                  value={user?.name}
                />

                <InfoRow
                  icon={<FaEnvelope />}
                  bg="bg-blue-100"
                  color="text-blue-500"
                  title="Email Address"
                  value={user?.email}
                />

                <InfoRow
                  icon={<FaPhone />}
                  bg="bg-green-100"
                  color="text-green-500"
                  title="Phone Number"
                  value={user?.phone}
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">
                Account Information
              </h2>

              <div className="space-y-6">
                <InfoRow
                  icon={<FaUserShield />}
                  bg="bg-purple-100"
                  color="text-purple-500"
                  title="Account Type"
                  value={
                    user?.role === 1
                      ? "Administrator"
                      : "Passenger"
                  }
                />

                <InfoRow
                  icon={<FaClock />}
                  bg="bg-orange-100"
                  color="text-orange-500"
                  title="Last Login"
                  value={
                    user?.last_login_at
                      ? new Date(
                          user.last_login_at
                        ).toLocaleString()
                      : "Not Available"
                  }
                />
              </div>
            </div>
           <div className="mt-8">

  <div className="bg-white rounded-3xl p-8 shadow-lg">

    <h2 className="text-2xl font-bold mb-6">
      Travel Center
    </h2>

    <button
      onClick={() =>
        navigate("/my-trips")
      }
      className="
        w-full
        flex
        items-center
        justify-between
        p-6
        rounded-3xl
        border
        border-slate-200
        hover:border-orange-300
        hover:shadow-lg
        transition
        group
      "
    >

      <div className="flex items-center gap-5">

        <div
          className="
            w-16 h-16
            rounded-2xl
            bg-orange-100
            text-orange-500
            flex
            items-center
            justify-center
            text-2xl
          "
        >
          <FaSuitcaseRolling />
        </div>

        <div className="text-left">

          <h3 className="text-xl font-bold">
            My Trips
          </h3>

          <p className="text-gray-500 mt-1">
            Manage bookings, payments,
            tickets and travel history
          </p>

        </div>

      </div>

      <div
        className="
          text-orange-500
          font-semibold
          group-hover:translate-x-1
          transition
        "
      >
        →
      </div>

    </button>

  </div>

</div>
          </div>
        </div>

        {showEdit && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg p-8">
              <h2 className="text-2xl font-bold mb-6">
                Edit Profile
              </h2>

              <div className="flex justify-center mb-6">
                <label className="relative cursor-pointer">
                  <img
                    src={avatarUrl}
                    alt=""
                    className="w-28 h-28 rounded-full object-cover"
                  />

                  <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full">
                    <FaCamera />
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setAvatar(
                        e.target.files[0]
                      )
                    }
                  />
                </label>
              </div>

              <input
                type="text"
                value={form.name}
                placeholder="Name"
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 mb-4"
              />

              <input
                type="text"
                value={form.phone}
                placeholder="Phone"
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 mb-4"
              />

              <input
                type="password"
                value={form.password}
                placeholder="New Password"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 mb-4"
              />

              <input
                type="password"
                value={
                  form.password_confirmation
                }
                placeholder="Confirm Password"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password_confirmation:
                      e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 mb-6"
              />

              <div className="flex gap-4">
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="
                  flex-1
                  bg-orange-500
                  text-white
                  py-3
                  rounded-xl
                "
                >
                  {loading
                    ? "Saving..."
                    : "Save Changes"}
                </button>

                <button
                  onClick={() =>
                    setShowEdit(false)
                  }
                  className="
                  flex-1
                  border
                  py-3
                  rounded-xl
                "
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

function InfoRow({
  icon,
  bg,
  color,
  title,
  value,
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`
          w-12 h-12 rounded-xl
          flex items-center justify-center
          ${bg}
          ${color}
        `}
      >
        {icon}
      </div>

      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <p className="font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}