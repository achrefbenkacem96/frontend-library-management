// ReturnBook.js
import React from 'react';
import axios from 'axios';

const ReturnBook = ({ bookId, setBorrowedBooks }) => {
  const handleReturn = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/borrow/${bookId}/return`, {
        returnDate: new Date().toISOString().split('T')[0], // Get the current date in "yyyy-mm-dd" format
      })
      .then((res)=> {
        axios.get('http://localhost:3000/borrow/borrowed-books')
      .then(response => setBorrowedBooks(response.data))
      .catch(error => console.error('Error fetching borrowed books:', error));
      })
      // Handle the successful return, e.g., update the state or trigger a callback
       
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Return book failed:', error.message);
    }
  };

  return (
    <div>
      <button onClick={handleReturn} className="btn btn-primary">
        Return Book
      </button>
    </div>
  );
};

export default ReturnBook;
