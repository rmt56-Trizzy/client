import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";
import Homepage from "./pages/unAuth/Homepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
