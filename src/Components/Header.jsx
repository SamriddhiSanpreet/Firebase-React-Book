import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#000",
        boxShadow:" rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        padding: "1rem 2rem",
        textAlign: "center",
        marginBottom: "2rem",
        borderRadius: "8px",
      }}
    >
      <nav style={{justifyContent:'space-between',display:'flex'}}>
        <Link
          to="/"
          style={{
            margin: "0 15px",
            color: "#fff",
            textDecoration: "none",
            fontSize: "1.2rem",
            fontWeight: "600",
            transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.color = "#00bcd4")}
          onMouseOut={(e) => (e.target.style.color = "#fff")}
        >
          Add Book
        </Link>
        <Link
          to="/book-list"
          style={{
            margin: "0 15px",
            color: "#fff",
            textDecoration: "none",
            fontSize: "1.2rem",
            fontWeight: "600",
            transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.color = "#00bcd4")}
          onMouseOut={(e) => (e.target.style.color = "#fff")}
        >
          View Books
        </Link>
      </nav>
    </header>
  );
};

export default Header;
