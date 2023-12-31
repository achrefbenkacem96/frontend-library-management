// Navbar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">Your Library</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/members">Members</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/books">Books</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/borrowed-books">Borrowed Books</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
