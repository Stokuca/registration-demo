import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <RegisterForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
