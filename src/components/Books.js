import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [isbn, setISBN] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    // Fetch books from the server
    axios.get('http://localhost:3000/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleAddBook = () => {
    axios.post('http://localhost:3000/books', { title, author, year, isbn })
      .then(response => {
        setBooks(prevBooks => [...prevBooks, response.data.book]);
        clearForm();
      })
      .catch(error => console.error('Error adding book:', error));
  };

  const handleUpdateBook = () => {
    axios.put(`http://localhost:3000/books/${selectedBook._id}`, { title, author, year, isbn })
      .then(response => {
        setBooks(prevBooks => prevBooks.map(book => (book._id === selectedBook._id ? response.data.book : book)));
        clearForm();
      })
      .catch(error => console.error('Error updating book:', error));
  };

  const handleDeleteBook = (bookId) => {
    axios.delete(`http://localhost:3000/books/${bookId}`)
      .then(() => {
        setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
        clearForm();
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setYear('');
    setISBN('');
    setSelectedBook(null);
  };

  return (
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
            <th>Actions</th>
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
                <button className="btn btn-warning mr-2" onClick={() => {
                  setTitle(book.title);
                  setAuthor(book.author);
                  setYear(book.year);
                  setISBN(book.isbn);
                  setSelectedBook(book);
                }}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteBook(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h2>{selectedBook ? 'Edit Book' : 'Add Book'}</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">Author</label>
            <input type="text" className="form-control" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="year" className="form-label">Year</label>
            <input type="number" className="form-control" id="year" value={year} onChange={(e) => setYear(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="isbn" className="form-label">ISBN</label>
            <input type="text" className="form-control" id="isbn" value={isbn} onChange={(e) => setISBN(e.target.value)} required />
          </div>
          <button type="button" className="btn btn-primary" onClick={selectedBook ? handleUpdateBook : handleAddBook}>
            {selectedBook ? 'Update Book' : 'Add Book'}
          </button>
          <button type="button" className="btn btn-secondary mx-2" onClick={clearForm}>
            Clear Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default Books;
