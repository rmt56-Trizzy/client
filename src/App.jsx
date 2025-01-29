import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";
import Homepage from "./pages/unAuth/Homepage";
import Login from "./pages/unAuth/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Register from "./pages/unAuth/Register";

function App() {
  return (
    <>
      <GoogleOAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
