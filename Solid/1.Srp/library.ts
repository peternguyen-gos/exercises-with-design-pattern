import { Book } from './book';
import { BookRepository } from './book.repository';

export class Library {
    private repository: BookRepository;

    constructor(repository: BookRepository) {
        this.repository = repository;
    }

    getBookByTitle(title: string): Book | undefined {
        return this.repository.getListBooks().find(book => book.title === title);
    }

    getTotalNumberOfBooks(): number {
        return this.repository.getListBooks().length;
    }

    getBooksByAuthor(author: string): Book[] {
        return this.repository.getListBooks().filter(book => book.author === author);
    }

    getBooksByPublicationYear(publicationYear: number): Book[] {
        return this.repository.getListBooks().filter(book => book.publicationYear === publicationYear);
    }
}