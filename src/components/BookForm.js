import React, { useState } from 'react';
import { addBook } from '../services/bookService';

const BookForm = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        isbn: '',
        published_date: '',
        genre: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook(book)
            .then(() => {
                alert('Book added successfully');
                window.location.reload(); // Refresh the page
            })
            .catch((error) => {
                console.error('Error adding book:', error.response ? error.response.data : error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={book.title} onChange={handleChange} placeholder="Title" required />
            <input name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
            <input name="isbn" value={book.isbn} onChange={handleChange} placeholder="ISBN" required />
            <input type="date" name="published_date" value={book.published_date} onChange={handleChange} required />
            <input name="genre" value={book.genre} onChange={handleChange} placeholder="Genre" required />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default BookForm;
