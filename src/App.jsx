import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import BookForm from "./Components/BookForm";
import BookList from "./Components/BookList";
import Header from "./Components/Header";
import UpdateBook from "./Components/UpdateBookPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import BookDetail from "./Components/BookDetail"; // Import BookDetail component
import { auth } from "./Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

const MainContent = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser && location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login"); // Redirect to login if not authenticated
      }
    });
    return () => unsubscribe();
  }, [navigate, location.pathname]);

  const hideHeader = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={user ? <BookForm /> : <Login />} />
        <Route path="/book-list" element={user ? <BookList /> : <Login />} />
        <Route path="/update-book/:id" element={user ? <UpdateBook /> : <Login />} />
        <Route path="/book/:id" element={user ? <BookDetail /> : <Login />} /> {/* 👈 Added this */}
      </Routes>
    </div>
  );
};

export default App;
