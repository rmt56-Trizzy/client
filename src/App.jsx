import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";
import Homepage from "./pages/unAuth/Homepage";
import Login from "./pages/unAuth/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Register from "./pages/unAuth/Register";
import MainPageLayout from "./layouts/MainPageLayout";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apolllo";
import UnAuthLayout from "./layouts/UnAuthLayout";
import PaymentPage from "./pages/auth/PaymentPage";
import AuthLayout from "./layouts/AuthLayout";

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
                  <Route path="/pay" element={<PaymentPage />} />
                </Route>
              </Route>
              <Route element={<MainPageLayout />}>
                <Route path="/" element={<Homepage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
