import { Route, Routes } from "react-router-dom";
import { PrivateLayout } from "../layouts/Private";
import { Cadastros } from "../pages/Cadastros";
import { Dashboard } from "../pages/Dashboard";


export default function Router() {

  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cadastros" element={<Cadastros />} />
      </Route>
    </Routes>
  )
}
