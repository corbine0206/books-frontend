import logo from './logo.svg';
import './App.css';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  return (
      <div className="App">
          <h1>Book Management</h1>
          <BookForm />
          <BookList />
      </div>
  );
}

export default App;
