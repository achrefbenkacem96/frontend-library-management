import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReturnBook from './ReturnBook';

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Fetch borrowed books from the server
    axios.get('http://localhost:3000/borrow/borrowed-books')
      .then(response => setBorrowedBooks(response.data))
      .catch(error => console.error('Error fetching borrowed books:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Borrowed Books</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Borrower</th>
            <th>Return Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.borrower}</td>
              <td>{book.returnDate} </td>
              <td>          <ReturnBook bookId={book._id} setBorrowedBooks={setBorrowedBooks} />
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowedBooks;
