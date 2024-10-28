import { Route, Routes } from "react-router-dom";
import { PrivateLayout } from "../layouts/Private";
import { Registrations } from "../pages/Registrations";

import { Habit } from "@/pages/Habit";
import { Allergy } from "@/pages/Allergy";
import { Patients } from "@/pages/Patients";
import { Schedule } from "@/pages/Schedule";
import { Employees } from "@/pages/Employees";
import { Illnesses } from "@/pages/Illness";
import { Medication } from "@/pages/Medication";
import { Professional } from "@/pages/Professional";
import { ResponsibleParty } from "@/pages/ResponsibleParty";
import { Patient } from "@/pages/Patient";
import { Financial } from "@/pages/Financial";
import { UnauthenticatedRoute } from "@/components/UnauthenticatedRoute";
import { PublicLayout } from "@/layouts/Public";
import { Login } from "@/pages/Login";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Router() {
  return (
    <Routes>
      <Route element={<UnauthenticatedRoute redirectPath="/" />}>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>

      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]} redirectPath="/login" />
        }
      >
        <Route element={<PrivateLayout />}>
          <Route path="/schedules" element={<Schedule />} />
          <Route path="/" element={<Registrations />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/illnesses" element={<Illnesses />} />
          <Route path="/medications" element={<Medication />} />
          <Route path="/allergies" element={<Allergy />} />
          <Route path="/habits" element={<Habit />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patient/:id" element={<Patient />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/professionals" element={<Professional />} />
          <Route path="/responsible" element={<ResponsibleParty />} />
          <Route path="/financial" element={<Financial />} />
        </Route>
      </Route>
    </Routes>
  );
}
