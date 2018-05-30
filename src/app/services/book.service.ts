import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Book } from '../models/book';
import { environment } from '../../environments/environment';
import { BookCategory } from '../models/book-category';
import { BookIssued } from '../models/book-issued';
import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable()
export class BookService {

    constructor(private http: HttpClient, private userService: UserService) { }

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(environment.apiUrl + 'books')
            .pipe(map((booksArray: Array<any>) => {
                const booksResult: Array<Book> = [];
                if (booksArray) {
                    booksArray.forEach((book) => {
                        booksResult.push(new Book(
                            book.id,
                            book.title,
                            book.categoryID,
                            book.author,
                            book.availability
                        ));
                    });
                }
                return booksResult;
            }));
    }

    getBookCategories() {
        return this.http.get(environment.apiUrl + 'bookCategories')
            .pipe(
                map((categories: Array<any>) => {
                    const categoriesResult: Array<BookCategory> = [];
                    if (categories) {
                        categories.forEach((category) => {
                            categoriesResult.push(new BookCategory(
                                category.id,
                                category.name
                            ));
                        });
                    }

                    return categoriesResult;
                })
            );
    }

    getIssuedBooks(bookId?): Observable<BookIssued[]> {
        let url = environment.apiUrl + 'bookIssued';
        if (bookId) {
            url = url + bookId;
        }
        return this.http.get(url)
            .pipe(
                map((issues: any) => {
                    const issuesResult: Array<BookIssued> = [];
                    if (issues) {
                        issues.booksIssued.forEach((issue) => {
                            const newElement = new BookIssued(
                                issue.userId,
                                issue.bookId,
                                issue.issueDate
                            );
                            const relatedBook = issues.books.find(b => b.id === newElement.bookId);
                            if (relatedBook) {
                                newElement.bookTitle = relatedBook.title;
                                newElement.bookAuthor = relatedBook.author;
                            }
                            const relatedUser = issues.users.find(u => u.id === newElement.userId);
                            if (relatedUser) {
                                newElement.userName = relatedUser.name;
                            }
                            issuesResult.push(newElement);
                        });
                    }
                    return issuesResult;
                })
            );
    }

    addBookIssue(bookIssued: BookIssued) {
        return this.http.post(environment.apiUrl + 'bookIssued', bookIssued);
    }

    addBook(book: Book) {
        return this.http.post(environment.apiUrl + 'books', book);
    }
}
