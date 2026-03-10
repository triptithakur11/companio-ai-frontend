import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Service from "./pages/services/Service";

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

          <Route path="/services/goals" element={<Service service="goals" />} />
          <Route path="/services/notes" element={<Service service="notes" />} />
          <Route
            path="/services/revision"
            element={<Service service="revision" />}
          />
          <Route
            path="/services/concepts"
            element={<Service service="concepts" />}
          />
          <Route
            path="/services/support"
            element={<Service service="support" />}
          />
          <Route
            path="/services/resources"
            element={<Service service="resources" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
