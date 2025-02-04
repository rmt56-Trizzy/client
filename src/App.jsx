import { ApolloProvider } from "@apollo/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router";
import client from "./config/apolllo";
import AuthLayout from "./layouts/AuthLayout";
import MainPageLayout from "./layouts/MainPageLayout";
import UnAuthLayout from "./layouts/UnAuthLayout";
import PaymentPage from "./pages/auth/PaymentPage";
import Homepage from "./pages/unAuth/Homepage";
import Login from "./pages/unAuth/Login";
import Register from "./pages/unAuth/Register";

import ChatPage from "./pages/auth/ChatPage";
import ProfilePage from "./pages/auth/ProfilePage";
import RecommendationDetailPage from "./pages/auth/RecommendationDetailPage";
import GeneralRecommendationDetailPage from "./pages/unAuth/GenRecommendationDetailPage";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <BrowserRouter>
            <Routes>
              <Route element={<UnAuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<AuthLayout />}>
                <Route element={<MainPageLayout />}>
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/pay" element={<PaymentPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route
                    path="/recommendation/:id"
                    element={<RecommendationDetailPage />}
                  />
                </Route>
              </Route>
              <Route element={<MainPageLayout />}>
                <Route path="/" element={<Homepage />} />
                <Route
                  path="/general-recommendation/:id"
                  element={<GeneralRecommendationDetailPage />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
