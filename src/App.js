// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Books from './components/Books';
import Login from './components/Login';
import AllBooks from './components/AllBooks';
import Members from './components/Members';
import BorrowedBooks from './components/BorrowedBooks';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/members" element={<Members />} />
        <Route path="/borrowed-books" element={<BorrowedBooks />} />
        <Route path="/" element={<AllBooks />} />
=      </Routes>
    </Router>
  );
};

export default App;
