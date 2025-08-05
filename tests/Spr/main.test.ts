import { Book } from '../../Solid/1.Srp/book';
import { Library } from '../../Solid/1.Srp/library';
import { BookRepository } from '../../Solid/1.Srp/book.repository';

describe('SRP - Book Class', () => {
    test('should create a book with correct properties', () => {
        const book = new Book('Clean Code', 'Robert C. Martin', 2008);
        expect(book.title).toBe('Clean Code');
        expect(book.author).toBe('Robert C. Martin');
        expect(book.publicationYear).toBe(2008);
    });

    test('should handle empty title', () => {
        const book = new Book('', 'Author', 2023);
        expect(book.title).toBe('');
        expect(book.author).toBe('Author');
        expect(book.publicationYear).toBe(2023);
    });

    test('should handle special characters in title and author', () => {
        const book = new Book('Design Patterns: Elements of Reusable Object-Oriented Software', 'Gang of Four', 1994);
        expect(book.title).toBe('Design Patterns: Elements of Reusable Object-Oriented Software');
        expect(book.author).toBe('Gang of Four');
        expect(book.publicationYear).toBe(1994);
    });

    test('should handle future publication year', () => {
        const book = new Book('Future Book', 'Future Author', 2030);
        expect(book.publicationYear).toBe(2030);
    });

    test('should handle old publication year', () => {
        const book = new Book('Ancient Text', 'Ancient Author', 1900);
        expect(book.publicationYear).toBe(1900);
    });
});

describe('SRP - BookRepository Class', () => {
    let repository: BookRepository;
    let book1: Book;
    let book2: Book;
    let book3: Book;

    beforeEach(() => {
        repository = new BookRepository();
        book1 = new Book('Clean Code', 'Robert C. Martin', 2008);
        book2 = new Book('Design Patterns', 'Gang of Four', 1994);
        book3 = new Book('Refactoring', 'Martin Fowler', 1999);
    });

    test('should initialize with empty books array', () => {
        expect(repository.getListBooks()).toEqual([]);
        expect(repository.getListBooks().length).toBe(0);
    });

    test('should add a book to the repository', () => {
        repository.addBook(book1);
        expect(repository.getListBooks()).toContain(book1);
        expect(repository.getListBooks().length).toBe(1);
    });

    test('should add multiple books to the repository', () => {
        repository.addBook(book1);
        repository.addBook(book2);
        repository.addBook(book3);
        
        expect(repository.getListBooks()).toContain(book1);
        expect(repository.getListBooks()).toContain(book2);
        expect(repository.getListBooks()).toContain(book3);
        expect(repository.getListBooks().length).toBe(3);
    });

    test('should remove a book by title from the repository', () => {
        repository.addBook(book1);
        repository.addBook(book2);
        
        repository.removeBook('Clean Code');
        
        expect(repository.getListBooks()).not.toContain(book1);
        expect(repository.getListBooks()).toContain(book2);
        expect(repository.getListBooks().length).toBe(1);
    });

    test('should not remove any book if title not found', () => {
        repository.addBook(book1);
        repository.addBook(book2);
        
        repository.removeBook('Non-existent Book');
        
        expect(repository.getListBooks()).toContain(book1);
        expect(repository.getListBooks()).toContain(book2);
        expect(repository.getListBooks().length).toBe(2);
    });

    test('should remove all books with the same title', () => {
        const duplicateBook = new Book('Clean Code', 'Another Author', 2020);
        repository.addBook(book1);
        repository.addBook(duplicateBook);
        repository.addBook(book2);
        
        repository.removeBook('Clean Code');
        
        expect(repository.getListBooks()).not.toContain(book1);
        expect(repository.getListBooks()).not.toContain(duplicateBook);
        expect(repository.getListBooks()).toContain(book2);
        expect(repository.getListBooks().length).toBe(1);
    });

    test('should handle removing from empty repository', () => {
        repository.removeBook('Any Title');
        expect(repository.getListBooks().length).toBe(0);
    });

    test('should return a reference to the actual books array', () => {
        repository.addBook(book1);
        const booksList = repository.getListBooks();
        
        // The returned array should contain the same books
        expect(booksList).toContain(book1);
        expect(booksList.length).toBe(1);
    });

    test('should handle case-sensitive title removal', () => {
        repository.addBook(book1); // title: 'Clean Code'
        repository.removeBook('clean code'); // lowercase
        
        // Should not remove the book due to case sensitivity
        expect(repository.getListBooks()).toContain(book1);
        expect(repository.getListBooks().length).toBe(1);
    });
});

describe('SRP - Library Class', () => {
    let library: Library;
    let repository: BookRepository;
    let book1: Book;
    let book2: Book;
    let book3: Book;
    let book4: Book;

    beforeEach(() => {
        repository = new BookRepository();
        library = new Library(repository);
        book1 = new Book('Clean Code', 'Robert C. Martin', 2008);
        book2 = new Book('Design Patterns', 'Gang of Four', 1994);
        book3 = new Book('Refactoring', 'Martin Fowler', 1999);
        book4 = new Book('Code Complete', 'Steve McConnell', 2004);
    });

    describe('getBookByTitle', () => {
        test('should find a book by exact title', () => {
            repository.addBook(book1);
            repository.addBook(book2);
            
            const foundBook = library.getBookByTitle('Clean Code');
            expect(foundBook).toBe(book1);
            expect(foundBook?.title).toBe('Clean Code');
            expect(foundBook?.author).toBe('Robert C. Martin');
        });

        test('should return undefined when book title not found', () => {
            repository.addBook(book1);
            
            const foundBook = library.getBookByTitle('Non-existent Book');
            expect(foundBook).toBeUndefined();
        });

        test('should return undefined when repository is empty', () => {
            const foundBook = library.getBookByTitle('Any Title');
            expect(foundBook).toBeUndefined();
        });

        test('should be case-sensitive when searching by title', () => {
            repository.addBook(book1); // title: 'Clean Code'
            
            const foundBook = library.getBookByTitle('clean code');
            expect(foundBook).toBeUndefined();
        });

        test('should return first match when multiple books have the same title', () => {
            const duplicateBook = new Book('Clean Code', 'Another Author', 2020);
            repository.addBook(book1);
            repository.addBook(duplicateBook);
            
            const foundBook = library.getBookByTitle('Clean Code');
            expect(foundBook).toBe(book1); // Should return the first one added
        });
    });

    describe('getTotalNumberOfBooks', () => {
        test('should return zero when repository is empty', () => {
            expect(library.getTotalNumberOfBooks()).toBe(0);
        });

        test('should return correct count with one book', () => {
            repository.addBook(book1);
            expect(library.getTotalNumberOfBooks()).toBe(1);
        });

        test('should return correct count with multiple books', () => {
            repository.addBook(book1);
            repository.addBook(book2);
            repository.addBook(book3);
            expect(library.getTotalNumberOfBooks()).toBe(3);
        });

        test('should return updated count after adding books', () => {
            expect(library.getTotalNumberOfBooks()).toBe(0);
            
            repository.addBook(book1);
            expect(library.getTotalNumberOfBooks()).toBe(1);
            
            repository.addBook(book2);
            expect(library.getTotalNumberOfBooks()).toBe(2);
        });

        test('should return updated count after removing books', () => {
            repository.addBook(book1);
            repository.addBook(book2);
            expect(library.getTotalNumberOfBooks()).toBe(2);
            
            repository.removeBook('Clean Code');
            expect(library.getTotalNumberOfBooks()).toBe(1);
        });
    });

    describe('getBooksByAuthor', () => {
        test('should return books by specific author', () => {
            const martinBook1 = new Book('Clean Code', 'Robert C. Martin', 2008);
            const martinBook2 = new Book('Clean Architecture', 'Robert C. Martin', 2017);
            repository.addBook(martinBook1);
            repository.addBook(martinBook2);
            repository.addBook(book2); // Different author
            
            const martinBooks = library.getBooksByAuthor('Robert C. Martin');
            expect(martinBooks).toHaveLength(2);
            expect(martinBooks).toContain(martinBook1);
            expect(martinBooks).toContain(martinBook2);
            expect(martinBooks).not.toContain(book2);
        });

        test('should return empty array when no books match the author', () => {
            repository.addBook(book1);
            repository.addBook(book2);
            
            const books = library.getBooksByAuthor('Unknown Author');
            expect(books).toEqual([]);
            expect(books).toHaveLength(0);
        });

        test('should return empty array when repository is empty', () => {
            const books = library.getBooksByAuthor('Any Author');
            expect(books).toEqual([]);
        });

        test('should be case-sensitive when searching by author', () => {
            repository.addBook(book1); // author: 'Robert C. Martin'
            
            const books = library.getBooksByAuthor('robert c. martin');
            expect(books).toEqual([]);
        });

        test('should handle authors with special characters', () => {
            const specialAuthorBook = new Book('Special Book', 'José María García-López', 2020);
            repository.addBook(specialAuthorBook);
            
            const books = library.getBooksByAuthor('José María García-López');
            expect(books).toHaveLength(1);
            expect(books[0]).toBe(specialAuthorBook);
        });
    });

    describe('getBooksByPublicationYear', () => {
        test('should return books by specific publication year', () => {
            const book2008_1 = new Book('Clean Code', 'Robert C. Martin', 2008);
            const book2008_2 = new Book('Another 2008 Book', 'Another Author', 2008);
            repository.addBook(book2008_1);
            repository.addBook(book2008_2);
            repository.addBook(book2); // Published in 1994
            
            const books2008 = library.getBooksByPublicationYear(2008);
            expect(books2008).toHaveLength(2);
            expect(books2008).toContain(book2008_1);
            expect(books2008).toContain(book2008_2);
            expect(books2008).not.toContain(book2);
        });

        test('should return empty array when no books match the publication year', () => {
            repository.addBook(book1); // 2008
            repository.addBook(book2); // 1994
            
            const books = library.getBooksByPublicationYear(2000);
            expect(books).toEqual([]);
            expect(books).toHaveLength(0);
        });

        test('should return empty array when repository is empty', () => {
            const books = library.getBooksByPublicationYear(2020);
            expect(books).toEqual([]);
        });

        test('should handle future publication years', () => {
            const futureBook = new Book('Future Book', 'Future Author', 2030);
            repository.addBook(futureBook);
            
            const books = library.getBooksByPublicationYear(2030);
            expect(books).toHaveLength(1);
            expect(books[0]).toBe(futureBook);
        });

        test('should handle old publication years', () => {
            const oldBook = new Book('Old Book', 'Old Author', 1800);
            repository.addBook(oldBook);
            
            const books = library.getBooksByPublicationYear(1800);
            expect(books).toHaveLength(1);
            expect(books[0]).toBe(oldBook);
        });
    });

    describe('Integration tests', () => {
        test('should work correctly with repository dependency injection', () => {
            const customRepository = new BookRepository();
            const customLibrary = new Library(customRepository);
            
            customRepository.addBook(book1);
            
            expect(customLibrary.getTotalNumberOfBooks()).toBe(1);
            expect(customLibrary.getBookByTitle('Clean Code')).toBe(book1);
        });

        test('should reflect repository changes immediately', () => {
            repository.addBook(book1);
            expect(library.getTotalNumberOfBooks()).toBe(1);
            
            repository.addBook(book2);
            expect(library.getTotalNumberOfBooks()).toBe(2);
            
            repository.removeBook('Clean Code');
            expect(library.getTotalNumberOfBooks()).toBe(1);
            expect(library.getBookByTitle('Clean Code')).toBeUndefined();
        });

        test('should handle complex search scenarios', () => {
            // Add multiple books with different attributes
            repository.addBook(new Book('Book A', 'Author 1', 2020));
            repository.addBook(new Book('Book B', 'Author 1', 2020));
            repository.addBook(new Book('Book C', 'Author 2', 2020));
            repository.addBook(new Book('Book D', 'Author 1', 2021));
            
            // Test multiple search criteria
            expect(library.getBooksByAuthor('Author 1')).toHaveLength(3);
            expect(library.getBooksByPublicationYear(2020)).toHaveLength(3);
            expect(library.getTotalNumberOfBooks()).toBe(4);
        });
    });
});