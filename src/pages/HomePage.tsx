import { useState, useEffect } from "react";

import Header from "../components/Header";
import OpenSearch from "../components/OpenSearch";
import BooksShelf from "../components/BooksShelf";
import ShelfTypes from "../shared/enums/ShelfTypes.enum";
import * as BooksAPI from "../BooksAPI";
import { BookCardModel } from "../shared/models/my-reads-models.model";

const HomePage = () => {

    const [currentlyReadingBooksShelf, setCurrentlyReadingBooksShelf] = useState<(BookCardModel | never)[]>([]);
    const [allBooksShelfs, setAllBooksShelfs] = useState<(BookCardModel | never)[]>([]);
    const [wantToReadBooksShelf, setWantToReadBooksShelf] = useState<(BookCardModel | never)[]>([]);
    const [readBooksShelf, setReadBooksShelf] = useState<(BookCardModel | never)[]>([]);

    const setAllShelfs = (allShelfs: BookCardModel[]) => {
        setAllBooksShelfs(allShelfs);
        setCurrentlyReadingBooksShelf(allShelfs.filter((Shelf) => Shelf.shelf === ShelfTypes.CURRENTLY_READING));
        setWantToReadBooksShelf(allShelfs.filter((Shelf) => Shelf.shelf === ShelfTypes.WANT_TO_READ));
        setReadBooksShelf(allShelfs.filter((Shelf) => Shelf.shelf === ShelfTypes.READ));
    }

    useEffect(() => {
        const getAllBooks = async () => {
            const res = await BooksAPI.getAll();
            setAllShelfs(res);
        };

        getAllBooks();
    }, []);

    const updateShelfs = (bookId: string, newShelf: string) => {

        allBooksShelfs.filter((book) => book.id === bookId)[0].shelf = newShelf;

        setAllShelfs(allBooksShelfs);
    }

    return (
        <div className="list-books">

            <Header />

            <div className="list-books-content">
                <div>
                    {currentlyReadingBooksShelf.length > 0 && (<BooksShelf emitShelfChange={(bookId, newShelf) => { updateShelfs(bookId, newShelf) }}
                        shelf={currentlyReadingBooksShelf} shelfTitle={"Currently Reading"} />)}

                    {wantToReadBooksShelf.length > 0 && (<BooksShelf emitShelfChange={(bookId, newShelf) => { updateShelfs(bookId, newShelf) }}
                        shelf={wantToReadBooksShelf} shelfTitle={"Want to Read"} />)}

                    {readBooksShelf.length > 0 && (<BooksShelf emitShelfChange={(bookId, newShelf) => { updateShelfs(bookId, newShelf) }}
                        shelf={readBooksShelf} shelfTitle={"Read"} />)}
                </div>
            </div>

            <OpenSearch />
        </div>
    );
}

export default HomePage;