import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <div
  className="
  min-h-screen
  bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_35%,#dbe4ee_65%,#1e293b_100%)]
  "
>
      <Navbar />

      <main className="pt-2">
        {children}
      </main>

      <Footer />
    </div>
  );
}