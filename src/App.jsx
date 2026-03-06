import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import GoalMapping from "./pages/services/GoalMapping";
import SmartNotes from "./pages/services/SmartNotes";
import SmartRevision from "./pages/services/SmartRevision";
import ConceptSimplifier from "./pages/services/ConceptSimplifier";
import HumanSupport from "./pages/services/HumanSupport";
import CuratedResources from "./pages/services/CuratedResources";

import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >

          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/services/goals" element={<GoalMapping />} />
          <Route path="/services/notes" element={<SmartNotes />} />
          <Route path="/services/revision" element={<SmartRevision />} />
          <Route path="/services/concepts" element={<ConceptSimplifier />} />
          <Route path="/services/support" element={<HumanSupport />} />
          <Route path="/services/resources" element={<CuratedResources />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;