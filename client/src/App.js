import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Movies from "./components/Movies/Movies";
import MovieBooking from "./components/Movies/MovieBooking"
import AdminAuth from "./components/Auth/AdminAuth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Movies />} />
          <Route path="/movie/:id" element={<MovieBooking />} />
        </Route>
        <Route path='/admin' element={<AdminAuth />}></Route>
      </Routes>
    </BrowserRouter>
  );
}