import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { BookService } from './book.service';
import { Book } from '../models/book';
import { environment } from '../../environments/environment';
import { BookCategory } from '../models/book-category';

describe('BookService', () => {
    let injector: TestBed;
    let service: BookService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BookService]
        });
        injector = getTestBed();
        service = injector.get(BookService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('#getBooks', () => {
        it('should return an Observable<Book[]>', () => {
            const dummyBooks = [
                new Book(1, 'Into the unknown Universe', 2, 'Stephen Hawking', 2),
                new Book(2, 'The monk who sold his ferrari', 1, 'Robin Singh', 3)
            ];

            service.getBooks().subscribe(books => {
                expect(books.length).toBe(2);
                expect(books).toEqual(dummyBooks);
            });

            const req = httpMock.expectOne(environment.apiUrl + 'books');
            expect(req.request.method).toBe('GET');
            req.flush(dummyBooks);
        });
    });

    describe('#addBook', () => {
        it('should return a message done', () => {
            const dummyResult = {
                message: 'Done!'
            };
            service.addBook(new Book(1, 'Into the unknown Universe', 2, 'Stephen Hawking', 2))
                .subscribe(result => {
                    expect(result).toEqual(dummyResult);
                });

            const req = httpMock.expectOne(environment.apiUrl + 'books');
            expect(req.request.method).toBe('POST');
            req.flush(dummyResult);
        });
    });

    describe('#getBookCategories', () => {
        it('should return an Observable<BookCategory[]>', () => {
            const dummyCategories = [
                new BookCategory(
                    1,
                    'Philosophy'
                ),
                new BookCategory(
                    2,
                    'Science'
                )
            ];

            service.getBookCategories().subscribe(categories => {
                expect(categories.length).toBe(2);
                expect(categories).toEqual(dummyCategories);
            });

            const req = httpMock.expectOne(environment.apiUrl + 'bookCategories');
            expect(req.request.method).toBe('GET');
            req.flush(dummyCategories);
        });
    });

    describe('#getIssuedBooks', () => {
        it('should return an Observable<BooksIssued[]>', () => {
            const dummyBooksIssued = {
                booksIssued: [
                    {
                        userId: '108912031135016035154',
                        bookId: 8,
                        issueDate: '2018-07-17T18:30:00.000Z',
                        returnDate: '2018-07-24T18:30:00.000Z',
                        id: 9
                    },
                    {
                        userId: '108912031135016035154',
                        bookId: 9,
                        issueDate: '2018-11-13T18:30:00.000Z',
                        returnDate: '2018-11-20T18:30:00.000Z',
                        id: 12
                    },
                    {
                        userId: '108912031135016035154',
                        bookId: 6,
                        issueDate: '2018-07-26T18:30:00.000Z',
                        returnDate: '2018-08-02T18:30:00.000Z',
                        id: 13
                    }
                ],
                books: [
                    {
                        id: 6,
                        title: 'The Alchemist',
                        categoryID: 1,
                        author: 'Paul Coelhelo',
                        availability: 9
                    },
                    {
                        id: 8,
                        title: 'Gone Girl',
                        categoryID: 4,
                        author: 'Gillian Flynn',
                        availability: 5
                    },
                    {
                        id: 9,
                        title: 'A Walk To Remember',
                        categoryID: 5,
                        author: 'Nicholas Sparks',
                        availability: 6
                    }
                ],
                users: [
                    {
                        id: '108912031135016035154',
                        name: 'hitesh arora',
                        email: 'hitesh.arora154@gmail.com',
                        imageUrl: 'https://lh4.googleusercontent.com/-qMY5n-ROlZk/AAAAAAAAAAI/AAAAAAAAK-4/cRvSrqnySBA/s96-c/photo.jpg'
                    }
                ]
            };

            service.getIssuedBooks().subscribe(booksIssued => {
                expect(booksIssued.length).toBe(3);
            });

            const req = httpMock.expectOne(environment.apiUrl + 'bookIssued');
            expect(req.request.method).toBe('GET');
            req.flush(dummyBooksIssued);
        });
    });

    describe('#deleteBook', () => {
        it('should return a response of Message Done', () => {
            const dummyResult = {
                message: 'Done!'
            };

            service.deleteBook(3).subscribe(response => {
                expect(response).toEqual(dummyResult);
            });

            const req = httpMock.expectOne(environment.apiUrl + 'books/' + 3);
            expect(req.request.method).toBe('DELETE');
            req.flush(dummyResult);
        });
    });

    describe('#addBookIssue', () => {
        it('should return a response of message done', () => {
            const dummyResult = {
                message: 'Done!'
            };

            service.addBookIssue(null).subscribe(response => {
                expect(response).toEqual(dummyResult);
            });

            const req = httpMock.expectOne(environment.apiUrl + 'bookIssued');
            expect(req.request.method).toBe('POST');
            req.flush(dummyResult);
        });
    });

    describe('#updateBook', () => {
        it('should return a response of message done', () => {
            const dummyResult = {
                message: 'Done!'
            };

            service.updateBook(null, 3).subscribe(response => {
                expect(response).toEqual(dummyResult);
            });

            const req = httpMock.expectOne(environment.apiUrl + 'books/' + 3);
            expect(req.request.method).toBe('PUT');
            req.flush(dummyResult);
        });
    });
});
