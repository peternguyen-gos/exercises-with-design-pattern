/**
 * *****************************************
 * 📝 UNCOMMENT THE CODE BELOW AND BEGIN YOUR SOLUTION:
 * *****************************************
 *
 * The following lines are currently commented out.
 * Uncomment them to start implementing your solution.
 * Happy coding! 🚀
 */
import { Book } from './book';
import { Library } from './library';
import { BookRepository } from './book.repository';




let lib: Library;
let bookRepo: BookRepository;
bookRepo = new BookRepository();
lib = new Library(bookRepo);

let book1: Book;
book1 = new Book('Clean Code', 'Edric Cao', 2023);

let book2: Book;
book2 = new Book('Design Pattern', 'Edric Cao', 2022);

bookRepo.addBook(book1);
bookRepo.addBook(book2);
console.log(lib.getBookByTitle('Clean Code')); // Output: Book { title: 'Clean Code', author: 'Edric Cao', publicationYear: 2023 }

