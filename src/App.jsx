import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarLayout from "./layout/NavbarLayout";
import Event from "./pages/Event/Event";
import Events from "./pages/Events/Events";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route element={<NavbarLayout />}>
            <Route path="/event/:id" element={<Event />}></Route>
            <Route path="/all-events" element={<Events />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<Home />}></Route>
          </Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
