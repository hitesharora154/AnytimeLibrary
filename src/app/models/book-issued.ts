export class BookIssued {
    userId: string;
    userName: string;
    bookId: number;
    bookTitle: string;
    bookAuthor: string;
    issueDate: string;

    constructor(userId, bookId, issueDate) {
        this.userId = userId;
        this.bookId = bookId;
        this.issueDate = issueDate;
    }
}
