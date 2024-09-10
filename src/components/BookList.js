import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../services/bookService';
import BookEditForm from './BookEditForm';
import BookDetails from './BookDetails';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [bookToEdit, setBookToEdit] = useState(null);
    const [bookToView, setBookToView] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('title'); // Default sorting by title

    useEffect(() => {
        getBooks().then((response) => setBooks(response.data));
    }, []);

    const handleDelete = (id) => {
        deleteBook(id)
            .then(() => {
                alert('Book deleted successfully');
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting book:', error.response ? error.response.data : error.message);
            });
    };

    const handleEditClick = (book) => {
        setBookToEdit(book);
    };

    const handleViewClick = (book) => {
        setBookToView(book);
    };

    const handleCloseEditForm = () => {
        setBookToEdit(null);
    };

    const handleCloseDetails = () => {
        setBookToView(null);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const filteredBooks = books
        .filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === 'published_date') {
                return new Date(a.published_date) - new Date(b.published_date);
            } else if (sortOption === 'genre') {
                return a.genre.localeCompare(b.genre);
            }
            return a.title.localeCompare(b.title);
        });

    return (
        <div>
            <h1>Books</h1>
            <input
                type="text"
                placeholder="Search by title or author"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <select value={sortOption} onChange={handleSortChange}>
                <option value="title">Sort by Title</option>
                <option value="published_date">Sort by Published Date</option>
                <option value="genre">Sort by Genre</option>
            </select>
            {bookToEdit && <BookEditForm bookToEdit={bookToEdit} onClose={handleCloseEditForm} />}
            {bookToView && <BookDetails book={bookToView} onClose={handleCloseDetails} />}
            <ul>
                {filteredBooks.map(book => (
                    <li key={book.id}>
                        {book.title} - {book.author}
                        <button onClick={() => handleEditClick(book)}>Edit</button>
                        <button onClick={() => handleViewClick(book)}>View</button>
                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
