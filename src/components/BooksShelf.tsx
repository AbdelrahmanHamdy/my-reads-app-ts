
import BookCard from "./BookCard";


/** BooksShelfProps */
 interface BooksShelfProps {
    shelfTitle: string;
     shelf: any[];
     emitShelfChange: (bookId: string, newShelf: string) => void;
 }

const BooksShelf = (props: BooksShelfProps) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">

                    {props.shelf.map((book) => <BookCard key={book.id} bookCard={book} onShelfChange={(book, newShelf) => {props.emitShelfChange(book.id, newShelf)}}/>)}

                </ol>
            </div>
        </div>

    );
}

export default BooksShelf;