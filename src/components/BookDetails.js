import React from 'react';

const BookDetails = ({ book, onClose }) => {
    return (
        <div className="book-details">
            <h2>Book Details</h2>
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Published Date:</strong> {new Date(book.published_date).toLocaleDateString()}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default BookDetails;
