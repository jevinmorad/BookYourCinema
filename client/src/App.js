import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Movies from "./components/Movies/Movies";
import MovieBooking from "./components/Movies/MovieBooking"
import AdminAuth from "./components/Auth/AdminAuth";
import AddMovies from "./components/Movies/AddMovies";
import AdminLayout from "./components/Movies/AdminLayout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./Store";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('userId')) {
      dispatch(userActions.login())
    }
    else if(localStorage.getItem('adminId')) {
      dispatch(adminActions.login())
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Movies />} />
          <Route path="/movie/:id" element={<MovieBooking />} />
        </Route>
        <Route path='/List-your-show' element={<AdminLayout />} >
          <Route path='/List-your-show/:id' element={<AddMovies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}