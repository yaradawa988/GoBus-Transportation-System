import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import { register } from "../api/authApi";
import useAuth from "../hooks/useAuth";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaBus
} from "react-icons/fa";


import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function Register() {

 const { login: authLogin } = useAuth();
   const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

 const submit = async (e) => {
  e.preventDefault();
const nameRegex = /^[A-Za-z\s]{3,50}$/;

if (!nameRegex.test(form.name)) {
  toast.error(
    "Full name must contain letters only and be at least 3 characters."
  );
  return;
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(form.email)) {
  toast.error("Please enter a valid email address.");
  return;
}

if (form.password.length < 8) {
  toast.error(
    "Password must contain at least 8 characters."
  );
  return;
}

const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])/;

if (!strongPassword.test(form.password)) {
  toast.error(
    "Password must contain uppercase, lowercase, number and special character."
  );
  return;
}

if (
  form.password !==
  form.password_confirmation
) {
  toast.error("Passwords do not match.");
  return;
}
 const syrianPhoneRegex = /^09\d{8}$/;

 if (!syrianPhoneRegex.test(form.phone)) {
  toast.error("Please enter a valid Syrian mobile number");
  return;
}
  try {
   const payload = {
  ...form,
  phone: `${form.phone}`
};
const response = await register(payload);

toast.success("Account created successfully");

authLogin(
  response.token,
  response.user
);

navigate("/");

  } catch (error) {

  if (error.response?.data?.errors) {

    const errors =
      error.response.data.errors;

    Object.values(errors).forEach(
      (messages) => {
        toast.error(messages[0]);
      }
    );

  } else if (
    error.response?.data?.message
  ) {

    toast.error(
      error.response.data.message
    );

  } else {

    toast.error(
      "Registration failed. Please try again."
    );

  }

  console.error(error);
}
};

 return (
  <MainLayout>

 <section
  className="
  min-h-[calc(100vh-90px)]
  pt-28
  pb-12
  px-4
  flex
  items-center
  justify-center
  bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.15),transparent_60%)]
from-blue-50
via-white
to-orange-50"
>

    <div
  className="
  w-full
  max-w-5xl
  bg-white
  rounded-[36px]
  overflow-hidden
  shadow-[0_25px_60px_rgba(0,0,0,0.25)]
  grid
  lg:grid-cols-2"
>
  {/* Left Side */}

  <div
    className="
    hidden
    lg:flex
    flex-col
    justify-center
    p-12
    bg-gradient-to-br
    from-slate-900
    via-slate-800
    to-orange-500
    text-white"
  >
    <div
      className="
      w-24
      h-24
      rounded-full
      bg-white/10
      flex
      items-center
      justify-center
      mb-8"
    >
      <FaBus className="text-5xl text-orange-300" />
    </div>

    <h2 className="text-5xl font-extrabold leading-tight">
      Join
      <br />
      GoBus
    </h2>

    <p className="mt-6 text-lg text-gray-200">
      Create your account and start
      booking comfortable trips across
      Syria with just a few clicks.
    </p>

    <div className="mt-10 space-y-4">

      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-orange-400" />
        Easy Trip Booking
      </div>

      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-orange-400" />
        Secure Payments
      </div>

     

    </div>
  </div>

  {/* Right Side */}

  <div className="p-8 lg:p-10">

    <div className="text-center lg:text-left mb-8">

      <h1 className="text-4xl font-bold text-slate-900">
        Create Account
      </h1>

      <p className="text-gray-500 mt-2">
        Fill your information below
      </p>

    </div>

    <form
      onSubmit={submit}
      className="space-y-5"
    >

      {/* Row 1 */}

      <div className="grid md:grid-cols-2 gap-4">

        <div className="relative">

          <FaUser
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400"
          />

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="
            w-full
            pl-12
            p-4
            rounded-xl
            border
            border-gray-200
            focus:ring-2
            focus:ring-orange-400"
          />
        </div>

        <div className="relative">

          <FaEnvelope
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="
            w-full
            pl-12
            p-4
            rounded-xl
            border
            border-gray-200
            focus:ring-2
            focus:ring-orange-400"
          />
        </div>

      </div>

      {/* Phone */}

      <div
        className="
        flex
        items-center
        border
        border-gray-200
        rounded-xl
        overflow-hidden"
      >
        <div
          className="
          px-4
          py-4
          bg-gray-50
          border-r
          flex
          items-center
          gap-2"
        >
          <span className="text-sm">
            🇸🇾
          </span>

          <span className="font-semibold text-sm">
            +963
          </span>
        </div>

        <input
          type="text"
          placeholder="0933123456"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
          className="
          flex-1
          p-4
          outline-none"
        />
      </div>

      <p className="text-xs text-gray-500">
        Example: 0933123456
      </p>

      {/* Row 2 */}

      <div className="grid md:grid-cols-2 gap-4">

        <div className="relative">

          <FaLock
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="
            w-full
            pl-12
            p-4
            rounded-xl
            border
            border-gray-200
            focus:ring-2
            focus:ring-orange-400"
          />
        </div>

        <div className="relative">

          <FaLock
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={form.password_confirmation}
            onChange={(e) =>
              setForm({
                ...form,
                password_confirmation:
                  e.target.value,
              })
            }
            className="
            w-full
            pl-12
            p-4
            rounded-xl
            border
            border-gray-200
            focus:ring-2
            focus:ring-orange-400"
          />
        </div>

      </div>

      <button
        className="
        w-full
        bg-orange-500
        hover:bg-orange-600
        text-white
        py-4
        rounded-xl
        font-bold
        transition-all
        duration-300
        shadow-lg"
      >
        Create Account
      </button>

    </form>

    <div className="text-center mt-6">

      <span className="text-gray-500">
        Already have an account?
      </span>

      <Link
        to="/login"
        className="
        ml-2
        text-orange-500
        font-bold
        hover:text-orange-600"
      >
        Login
      </Link>

    </div>

  </div>
</div>

    </section>

  </MainLayout>
);
}