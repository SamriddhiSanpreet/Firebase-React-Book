import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../Redux/booksReducer";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div style={{ padding: "2rem"}}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginTop: "5rem",
        }}
      >
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <h3 style={{ fontSize: "1.4rem", color: "#333" }}>{book.title}</h3>
            <p style={{ fontSize: "1.2rem", color: "#777" }}>by {book.author}</p>

            {book.imageUrl && (
              <div style={{ marginBottom: "1rem" }}>
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    objectFit: "cover",
                    marginBottom: "1rem",
                  }}
                />
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => dispatch(deleteBook(book.id))}
                style={{
                  backgroundColor: "#ff4747",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#e04343")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4747")}
              >
                Delete
              </button>

              
              <button
                onClick={() => navigate(`/update-book/${book.id}`)}
                style={{
                  backgroundColor: "#4e73df",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  marginLeft: "10px",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#2e59d9")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#4e73df")}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
