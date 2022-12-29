import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import BooksShelf from './BooksShelf';

describe('BooksShelf tests', () => {

    it('should render BooksShelf component', () => {
        const { container } = render(<BooksShelf emitShelfChange={() => { }}
        shelf={[]} shelfTitle={"Read"}/>);
        const mainDiv = container.getElementsByClassName('bookshelf');

        expect(mainDiv).toBeDefined();
        expect(screen.getByText(/Read/i)).toBeInTheDocument()
    });

});