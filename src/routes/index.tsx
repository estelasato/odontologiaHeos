import { Route, Routes } from "react-router-dom";
import { PrivateLayout } from "../layouts/Private";
import { Registrations } from "../pages/Registrations";
import { Dashboard } from "../pages/Dashboard";
import { Employees } from "@/pages/Employees";
import { Illnesses } from "@/pages/Illness";
import { Medication } from "@/pages/Medication";
import { Allergy } from "@/pages/Allergy";
import { Habit } from "@/pages/Habit";

export default function Router() {

  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registrations" element={<Registrations />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/illnesses" element={<Illnesses />} />
        <Route path="/medications" element={<Medication  />} />
        <Route path="/allergies" element={<Allergy />} />
        <Route path="/habits" element={<Habit />} />
      </Route>
    </Routes>
  )
}
