import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../Firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

 
  const queryParams = new URLSearchParams(location.search);
  const currentSort = queryParams.get("sort") || "";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); 
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/book-list?search=${searchQuery}&sort=${currentSort}`); 
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    navigate(`/book-list?search=${searchQuery}&sort=${newSort}`);
  };

  const LOGO = styled.div`
    h2{
      color:#000;
      font-size:40px;
      font-family: "Pacifico", serif;
      letter-spacing:5px;

    }
  `
  const COL = styled.div`
    ul li{
      margin:0 20px;
    }
    ul li select{
      width:150px;
      padding:5px 2px;
      border-radius:5px;
    }
    ul li .pages{
      font-size:18px;
      font-weight:500;
      color:#000;
      margin:0 8px;
      text-decoration:none;
    }
  `
  return (
    <header style={{backgroundColor: '#fff',display:'flex',justifyContent:'space-between',margin:'1rem 8vw 0 8vw',borderRadius:'50px',padding:'5px 2vw',alignItems:'center', boxShadow: 'rgba(255, 255, 255,1) 0px 5px 15px'}}>
      <LOGO>
        <h2>LB</h2>
      </LOGO>
      <nav>
        <COL>
        <ul style={{display:'flex',listStyle:'none',alignItems:'center',marginTop:'1vw'}}>
          <li>
            <div>
            <Link to="/" className="pages">Add Book</Link>
            <Link to="/book-list" className="pages">View Books</Link>
            </div>
          </li>
          <li>
            
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                style={{padding:'3px 0 8px 5px',marginRight:'5px',borderRadius:'5px',marginTop:'5px',borderWidth:'1px'}}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn border-primary bg-primary-subtle">Search</button>
            </form>
          </li>
          <li>
             
          <select value={currentSort} onChange={handleSortChange}>
            <option value="">Sort By</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>    
          </li>
          <li>
          <button onClick={handleLogout} style={{padding:'7px 25px',borderRadius:'5px',border:'none',backgroundColor:'#2196F3',color:'#fff'}}>Logout</button>
          </li>
        </ul>
        </COL>
      </nav>
    </header>
  );
};

export default Header;
