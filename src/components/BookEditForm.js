import React, { useState, useEffect } from 'react';
import { updateBook } from '../services/bookService';

const BookEditForm = ({ bookToEdit, onClose }) => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        isbn: '',
        published_date: '',
        genre: '',
    });

    useEffect(() => {
        if (bookToEdit) {
            setBook(bookToEdit);
        }
    }, [bookToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBook(book.id, book)
            .then(() => {
                alert('Book updated successfully');
                window.location.reload(); // Refresh the page
                onClose(); // Close the form after successful update
            })
            .catch((error) => {
                console.error('Error updating book:', error.response ? error.response.data : error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={book.title} onChange={handleChange} placeholder="Title" required />
            <input name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
            <input name="isbn" value={book.isbn} onChange={handleChange} placeholder="ISBN" required />
            <input type="date" name="published_date" value={book.published_date} onChange={handleChange} required />
            <input name="genre" value={book.genre} onChange={handleChange} placeholder="Genre" required />
            <button type="submit">Update Book</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default BookEditForm;
