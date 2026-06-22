import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import { login } from "../api/authApi";
import useAuth from "../hooks/useAuth";

import {
  FaBus,
  FaEnvelope,
  FaLock,
  FaGoogle,
   FaEye,
  FaEyeSlash
} from "react-icons/fa";

export default function Login() {

  const { login: authLogin } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
const [showPassword, setShowPassword] = useState(false);
 const submit = async (e) => {
  e.preventDefault();

  try {

    const response = await login(form);

    const user = response.user;

    authLogin(
      response.token,
      user
    );

    if (user.role === "admin") {

      navigate("/admin/dashboard");

    } else {

      navigate("/");

    }

  } catch (error) {

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
          bg-white
          rounded-[32px]
          shadow-2xl
          overflow-hidden
          w-full
          max-w-5xl
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


            <h1 className="text-5xl font-extrabold mb-4">
              Welcome Back
            </h1>

            <p className="text-lg text-orange-100">
              Login to your GoBus account and
              continue booking comfortable trips
              across cities.
            </p>

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white" />
                Fast Online Booking
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white" />
                Secure Payments
              </div>

            

            </div>

          </div>

          {/* Right Side */}

          <div className="p-10 lg:p-12">

            <div className="mb-8">

              <h2 className="text-3xl font-bold">
                Sign In
              </h2>

              <p className="text-gray-500 mt-2">
                Access your account
              </p>

            </div>

            <form
              onSubmit={submit}
              className="space-y-5"
            >

              {/* Email */}

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
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange-400"
                />
              </div>

              {/* Password */}

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
    type={showPassword ? "text" : "password"}
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
    pr-12
    p-4
    rounded-xl
    border
    border-gray-200
    focus:outline-none
    focus:ring-2
    focus:ring-orange-400"
  />

  <button
  type="button"
  title={showPassword ? "Hide Password" : "Show Password"}
  onClick={() => setShowPassword(!showPassword)}
  className="
  absolute
  right-4
  top-1/2
  -translate-y-1/2
  text-gray-500
  hover:text-orange-500
  transition"
>
  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
</button>

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
                transition"
              >
                Login
              </button>

            </form>

            {/* Divider */}

            <div className="flex items-center my-6">

              <div className="flex-1 border-t" />

              <span className="px-4 text-gray-500">
                OR
              </span>

              <div className="flex-1 border-t" />

            </div>

            {/* Google */}

            <button
              type="button"
              className="
              w-full
              border
              border-gray-300
              rounded-xl
              py-4
              flex
              items-center
              justify-center
              gap-3
              font-semibold
              hover:bg-gray-50
              transition"
            >
              <FaGoogle className="text-red-500" />

              Continue with Google
            </button>

            <p className="text-center mt-8 text-gray-600">

              Don't have an account?

              <Link
                to="/register"
                className="
                ml-2
                text-orange-500
                font-bold"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </section>

    </MainLayout>
  );
}