export class BookIssued {
    id: number;
    userId: string;
    userName: string;
    bookId: number;
    bookTitle: string;
    bookAuthor: string;
    issueDate: string;
    returnDate: string;

    constructor(userId, bookId, issueDate) {
        this.userId = userId;
        this.bookId = bookId;
        this.issueDate = issueDate;
    }
}
