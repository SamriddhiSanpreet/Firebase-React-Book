import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../Redux/booksReducer";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const books = useSelector((state) => state.books.books);
  const bookToUpdate = books.find((book) => book.id === id);

  const [title, setTitle] = useState(bookToUpdate?.title || "");
  const [author, setAuthor] = useState(bookToUpdate?.author || "");
  const [imageUrl, setImageUrl] = useState(bookToUpdate?.imageUrl || "");

  useEffect(() => {
    if (!bookToUpdate) {
      navigate("/book-list");
    }
  }, [bookToUpdate, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      dispatch(updateBook(id, { title, author, imageUrl }));
      navigate("/book-list");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
      <div className="card shadow-sm border-0 rounded-3 p-4 w-100" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4 text-dark" style={{ fontFamily: "'Roboto', sans-serif" }}>Update Book</h2>
          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            <div className="mb-3 w-100">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book Title"
                className="form-control rounded-3"
                required
              />
            </div>
            <div className="mb-3 w-100">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
                className="form-control rounded-3"
                required
              />
            </div>
            <div className="mb-3 w-100">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                className="form-control rounded-3"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3 py-2 rounded-3">
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
