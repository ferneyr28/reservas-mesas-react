import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Home = lazy(() => import("./components/Inicio/Home"));
const Login = lazy(() => import("./components/login/Login"));
const Reservas = lazy(() => import("./components/reservas/Reservas"));
const Cards = lazy(() => import("./components/Inicio/Cards"));
import { Spinner } from '@chakra-ui/react'
// import Home from "./components/Inicio/Home";
// import Login from "./components/login/Login";
// import Reservas from "./components/reservas/Reservas";
// import Cards from "./components/Inicio/Cards";

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<Spinner />}>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />}>
          <Route index element={<Cards />} />
          <Route path="reservas/:id" element={<Reservas />} />
        </Route>
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
    </Suspense>
      
    </BrowserRouter>

    //<Home />
  );
}

export default App;
