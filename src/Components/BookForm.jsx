import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../Redux/booksReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBook, FaUser, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [formErrors, setFormErrors] = useState({
    title: "",
    author: "",
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let errors = {};
    if (!title) errors.title = "Title is required!";
    if (!author) errors.author = "Author is required!";
    if (!imageUrl) errors.imageUrl = "Image URL is required!";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!isSubmitting) {
      setIsSubmitting(true);
      dispatch(addBook({ title, author, imageUrl }))
        .then(() => {
          setTitle("");
          setAuthor("");
          setImageUrl("");
          navigate("/book-list");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
      <div className="card shadow-sm border-0 rounded-3 p-4 w-100" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4 text-dark" style={{ fontFamily: "'Roboto', sans-serif" }}>Add a New Book</h2>
          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            <div className="mb-3 w-100">
              <div className="input-group">
                <span className="input-group-text">
                  <FaBook className="text-primary" />
                </span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Book Title"
                  className="form-control rounded-3"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                />
              </div>
              {formErrors.title && <small className="text-danger">{formErrors.title}</small>}
            </div>
            <div className="mb-3 w-100">
              <div className="input-group">
                <span className="input-group-text">
                  <FaUser className="text-primary" />
                </span>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author"
                  className="form-control rounded-3"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                />
              </div>
              {formErrors.author && <small className="text-danger">{formErrors.author}</small>}
            </div>
            <div className="mb-3 w-100">
              <div className="input-group">
                <span className="input-group-text">
                  <FaImage className="text-primary" />
                </span>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Image URL"
                  className="form-control rounded-3"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                />
              </div>
              {formErrors.imageUrl && <small className="text-danger">{formErrors.imageUrl}</small>}
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3 py-2 rounded-3" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
