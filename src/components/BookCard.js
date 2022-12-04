import { useState } from "react";
import PropTypes from "prop-types";


import * as BooksAPI from "../BooksAPI";
import ShelfTypes from "../shared/enums/ShelfTypes.enum";


const BookCard = ({ bookCard, onShelfChange }) => {

    /** Dunmmy state for component reloading purpose */
    const [, setMode] = useState("initial");

    /** Available shelves options */
    const shelves = [{ shelfName: null, shelfDisplayName: "Move to..." },
    { shelfName: ShelfTypes.CURRENTLY_READING, shelfDisplayName: "Currently Reading" },
    { shelfName: ShelfTypes.WANT_TO_READ, shelfDisplayName: "Want to Read" },
    { shelfName: ShelfTypes.READ, shelfDisplayName: "Read" },
    { shelfName: ShelfTypes.NONE, shelfDisplayName: "None" },
    ];

    const updateBookShelf = async (book, newShelf) => {
        await BooksAPI.update(book, newShelf);
        bookCard.shelf = newShelf;
        setMode("reload");
        window.location.pathname === '/search' ?
            onShelfChange(bookCard, newShelf) :
            onShelfChange(book.id, newShelf);
    };

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${bookCard?.imageLinks?.thumbnail})`,
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select value={bookCard.shelf} onChange={(e) => { updateBookShelf(bookCard, e.target.value) }}>
                            {shelves.map((shelve, index) => <option key={index} value={shelve.shelfName} disabled={index === 0}>{shelve.shelfDisplayName}</option>)}
                        </select>
                    </div>
                </div>

                <div className="book-title">{bookCard.title}</div>

                {bookCard.authors && bookCard.authors.length > 0 && bookCard.authors.map((author, i) => <div key={"author" + i} className="book-authors">{author}</div>)}

            </div>
        </li>
    );
}

BookCard.propTypes = {
    bookCard: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired,
}

export default BookCard;