// AllBooks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loggedInMember, setLoggedInMember] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [returnDate, setReturnDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all books from the server
    axios.get('http://localhost:3000/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error.message);
      });

    // Assume you have a way to check if a member is logged in (update as needed)
    const memberId = localStorage.getItem('loggedInMemberId');
    if (memberId) {
      setLoggedInMember(memberId);
    }
  }, []);

  const handleBorrow = (book) => {
    setSelectedBook(book);
    setReturnDate(''); // Reset return date
    // Show the modal
    document.getElementById('borrowModal').style.display = 'block';
  };

  const handleModalClose = () => {
    setSelectedBook(null);
    // Hide the modal
    document.getElementById('borrowModal').style.display = 'none';
  };

  const handleBorrowSubmit = async () => {
    const loggedInMember = window.localStorage.getItem('memberId') 
    if (!loggedInMember) {
        navigate('/login')
    }
    console.log("🚀 ~ file: AllBooks.js:49 ~ handleBorrowSubmit ~ returnDate:", returnDate)
    if (!returnDate) {
      // Handle the case when no return date is selected
      return;
    }

    // Make a request to borrow the book
    const borrowRequest = {
      memberId: loggedInMember,
      returnDate: returnDate,
    };

    try {
        console.log("🚀 ~ file: AllBooks.js:62 ~ handleBorrowSubmit ~ selectedBook:", selectedBook)
      const response = await axios.post(`http://localhost:3000/borrow/${selectedBook._id}`, borrowRequest);
      console.log('Borrow successful:', response.data);
      axios.get('http://localhost:3000/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error.message);
      });
      // Handle successful borrow (e.g., show a success message, update UI)
      // Close the modal after a successful borrow
      handleModalClose();
    } catch (error) {
      console.error('Borrow failed:', error.message);
      // Handle borrow failure (e.g., show an error message)
    }
  };

  return (
    <div>

      <div className="container mt-4">
        <h2>All Books</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>ISBN</th>
              <th>Borrowed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.isbn}</td>
                <td>{book.borrowed ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleBorrow(book)}>Borrow</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Borrow */}
      <div id="borrowModal" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Borrow Book</h5>
              <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
              </button>
            </div>
            <div className="modal-body">
              <label>Return Date:</label>
              <input type="date" value={returnDate}  className="form-control" onChange={(e) => setReturnDate(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleBorrowSubmit}>Borrow</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
