import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LogIn from "./components/LogIn";
import Movies from "./components/Movies";
import MovieBooking from "./components/MovieBooking"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Movies />} />
          <Route path="/movie/:id" element={<MovieBooking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
