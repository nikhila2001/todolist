import { AppContext } from "./components/AppContextProvider.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavLinks from "./components/NavLinks";
import { Toaster, toast } from "react-hot-toast";
import AllRoutes from "./components/AllRoutes";
import { useContext, useEffect } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
// Material Ui font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// headers
const host = "http://localhost:4000/api";
const config = {
  headers: {
    "Content-Type": "application/json",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUzNGIyMjMxMzhiYTE1MzA1OTY1MTkiLCJpYXQiOjE3MTY3ODY4MjUsImV4cCI6MTcxNzM5MTYyNX0.ZYem6DQHgvTBidXBCG9H60Eye6i0fyIwyWjin0Tr_f4",
  },
};
function App() {
  const { setUser, setIsAuth } = useContext(AppContext);

  useEffect(() => {
    axios
      .get(`${host}/user/me`, config)
      .then((res) => {
        console.log("res from me endpoint:", res);
        setUser(res.data.user);
        setIsAuth(true);
      })
      .catch((error) => {
        console.log("error:", error);
        setUser({});
        toast.error("Login first");
        setIsAuth(false);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavLinks />
        <AllRoutes />
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
