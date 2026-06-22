import AppRoutes from "./routes/AppRoutes";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
function App() {

   const { i18n } = useTranslation();

  useEffect(() => {

    document.documentElement.dir =
      i18n.language === "ar"
        ? "rtl"
        : "ltr";

  }, [i18n.language]);
  return <AppRoutes />;
}

export default App;