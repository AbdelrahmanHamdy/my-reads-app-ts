import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import * as BooksAPI from "../BooksAPI";
import BookCard from "../components/BookCard";
import ShelfTypes from "../shared/enums/ShelfTypes.enum";

const SearchPage = () => {

  const [searchResult, setSearchResult] = useState([]);
  const [wantTogetYourBooks, setWantTogetYourBooks] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      if (wantTogetYourBooks) {
        const res = await BooksAPI.getAll();
        setMyBooks(res);
        setWantTogetYourBooks(false);
      }
    };

    const mapSearchResultShelfs = (result) => {
      return result && result.length && (result.map((book) => {
        const usedBook = myBooks.find((b) => b.id === book.id);
        book.shelf = usedBook && usedBook.shelf ? usedBook.shelf : ShelfTypes.NONE;

        return book;
      }))
    }

    getAllBooks();

    const searchForBooks = async (query, maxResult) => {
      const res = await BooksAPI.search(query, maxResult);
      const checkedResponse = Array.isArray(res) ? res : res.items;
      const mappedSearchResult = mapSearchResultShelfs(checkedResponse);
      setSearchResult(mappedSearchResult);
    };

    searchQuery ? searchForBooks(searchQuery, 100) : setSearchResult([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const updateMyBooksShelf = (updatedBook, newShelf) => {
    myBooks.find((b) => b.id === updatedBook.id) ?
      myBooks.find((b) => b.id === updatedBook.id).shelf = newShelf :
      myBooks.push(updatedBook);
    setMyBooks(myBooks);
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          className="close-search"
          to="/"
        >
          Close
        </Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

      </div>
      <div className="search-books-results">

        <ol className="books-grid">

          {searchResult.length > 0 && searchResult.map((book) => <BookCard key={book.id} bookCard={book} onShelfChange={(updatedBook, newShelf) => { updateMyBooksShelf(updatedBook, newShelf) }} />)}

        </ol>

      </div>
    </div>
  );
}

export default SearchPage;