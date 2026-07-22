import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { HomeDesign } from "./pages/HomeDesign";
import { View } from "./pages/View";
import { Write } from "./pages/Write";
import { Login } from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home-design" element={<HomeDesign />} />
      <Route path="/view/:id" element={<View />} />
      <Route path="/write" element={<Write />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
