import { Route, Routes } from "react-router-dom";
import { PrivateLayout } from "../layouts/Private";
import { Registrations } from "../pages/Registrations";
import { Dashboard } from "../pages/Dashboard";
import { Employees } from "@/pages/Employees";


export default function Router() {

  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registrations" element={<Registrations />} />
        <Route path="/employees" element={<Employees />} />
      </Route>
    </Routes>
  )
}
