import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../Redux/booksReducer";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks()); 
    } else {
      const foundBook = books.find((b) => b.id === id);
      setBook(foundBook);
    }
  }, [books, id, dispatch]);

  useEffect(() => {
    
    if (books.length > 0) {
      const foundBook = books.find((b) => b.id === id);
      setBook(foundBook);
    }
  }, [books, id]);

  if (!book) 
    return <p style={{ textAlign: "center", color: "gray", fontSize: "18px" }}>Book not found.</p>;

  return (
    <div style={{ minHeight: "100vh", color: "white", padding: "24px" }}>
      <h1 style={{ textAlign: "center", fontSize: "32px", marginBottom: "20px", color: "#fff",fontWeight:'700', marginTop: "30px" }}>{book.title}</h1>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px", backgroundColor: "#2a2a2a", borderRadius: "8px" }}>
        {book.imageUrl && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img src={book.imageUrl} alt={book.title} style={{ width: "100%", height: "auto", maxHeight: "500px", objectFit: "contain", borderRadius: "6px" }} />
          </div>
        )}
        <p style={{ fontSize: "18px", marginBottom: "10px" }}><strong>Author:</strong> {book.author}</p>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}><strong>Genre:</strong> {book.genre}</p>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}><strong>Publication Year:</strong> {book.publicationYear}</p>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}><strong>Description:</strong> {book.description || "No description available."}</p>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{ backgroundColor: "#4e73df", color: "white", padding: "10px 16px", border: "none", borderRadius: "4px", cursor: "pointer", transition: "background 0.3s" }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#3b5fc0"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#4e73df"}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
