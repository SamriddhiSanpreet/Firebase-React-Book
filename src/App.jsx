import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookForm from "./Components/BookForm";
import BookList from "./Components/BookList";
import Header from "./Components/Header";
import UpdateBook from "./Components/UpdateBookPage";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <h1 style={{textAlign:'center',color:'#fff'}}>Library Management System</h1>
        <Routes>
          <Route path="/" element={<BookForm />} />
          <Route path="/book-list" element={<BookList />} />
          <Route path="/update-book/:id" element={<UpdateBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
