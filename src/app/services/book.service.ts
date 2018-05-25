import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Book } from '../models/book';
import { environment } from '../../environments/environment';
import { BookCategory } from '../models/book-category';
import { BookIssued } from '../models/book-issued';

@Injectable()
export class BookService {

    constructor(private http: HttpClient) { }

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

    getIssuedBooks(bookId) {
        return this.http.get(environment.apiUrl + 'bookIssued/' + bookId)
            .pipe(
                map((issues: Array<any>) => {
                    console.log(issues);
                    const issuesResult: Array<BookIssued> = [];
                    if (issues) {
                        issues.forEach((issue) => {
                            issuesResult.push(new BookIssued(
                                issue.userId,
                                issue.bookId,
                                issue.issueDate
                            ));
                        });
                    }

                    return issuesResult;
                })
            );
    }

    addBookIssue(bookIssued: BookIssued) {
        return this.http.post(environment.apiUrl + 'bookIssued', bookIssued);
    }

}
