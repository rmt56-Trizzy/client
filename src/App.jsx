import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";
import Homepage from "./pages/unAuth/Homepage";
import Login from "./pages/unAuth/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Register from "./pages/unAuth/Register";
import MainPageLayout from "./layouts/MainPageLayout";
import RecommendationDetail from "./pages/Auth/RecommendationDetail";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<MainPageLayout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/recommendation/:id" element={<RecommendationDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
