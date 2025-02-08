import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../Redux/booksReducer";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const BookList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const books = useSelector((state) => state.books.books);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";
  const sortOption = queryParams.get("sort") || "";

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    let updatedBooks = [...books];

    if (searchQuery) {
      updatedBooks = updatedBooks.filter((book) =>
        book.title.toLowerCase().includes(searchQuery)
      );
    }

    if (sortOption === "title-asc") {
      updatedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "title-desc") {
      updatedBooks.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredBooks(updatedBooks);
  }, [searchQuery, sortOption, books]);

  const styles = {
    container: { padding: "2rem" },
    title: { textAlign: "center", marginBottom: "1.5rem" },
    bookGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
      gap: "1.5rem",
      marginTop: "2rem",
    },
    bookCard: {
      background: "#fff",
      padding: "1.5rem",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      textAlign: "center",
    },
    bookTitle: { fontSize: "1.4rem", color: "#333", marginBottom: "0.5rem" },
    bookAuthor: { fontSize: "1.2rem", color: "#777", marginBottom: "1rem" },
    imageContainer: { display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" },
    bookImage: { width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" },
    buttonGroup: { display: "flex", justifyContent: "center", gap: "15px", marginTop: "1rem" },
    button: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.4rem",
      cursor: "pointer",
      border: "none",
      transition: "transform 0.2s ease, background-color 0.3s ease",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
    },
    deleteBtn: { backgroundColor: "#ff4747", color: "#fff" },
    deleteBtnHover: { backgroundColor: "#e63e3e" },
    viewBtn: { backgroundColor: "#28a745", color: "#fff" },
    viewBtnHover: { backgroundColor: "#218838" },
    updateBtn: { backgroundColor: "#4e73df", color: "#fff" },
    updateBtnHover: { backgroundColor: "#3b5cb8" },
    noBooks: { textAlign: "center", fontSize: "1.2rem", color: "#777" },
  };

  return (
    <div style={styles.container}>
      {filteredBooks.length > 0 ? (
        <div style={styles.bookGrid}>
          {filteredBooks.map((book) => (
            <div key={book.id} style={styles.bookCard}>
              <h3 style={styles.bookTitle}>{book.title}</h3>
              <p style={styles.bookAuthor}>by {book.author}</p>
              {book.imageUrl && (
                <div style={styles.imageContainer}>
                  <img src={book.imageUrl} alt={book.title} style={styles.bookImage} />
                </div>
              )}
              <div style={styles.buttonGroup}>
                <button
                  style={{ ...styles.button, ...styles.deleteBtn }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = styles.deleteBtnHover.backgroundColor)}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = styles.deleteBtn.backgroundColor)}
                  onClick={() => dispatch(deleteBook(book.id))}
                >
                  <MdDeleteForever />
                </button>
                <button
                  style={{ ...styles.button, ...styles.viewBtn }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = styles.viewBtnHover.backgroundColor)}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = styles.viewBtn.backgroundColor)}
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                  <FaEye />
                </button>
                <button
                  style={{ ...styles.button, ...styles.updateBtn }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = styles.updateBtnHover.backgroundColor)}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = styles.updateBtn.backgroundColor)}
                  onClick={() => navigate(`/update-book/${book.id}`)}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noBooks}>No books found.</p>
      )}
    </div>
  );
};

export default BookList;
