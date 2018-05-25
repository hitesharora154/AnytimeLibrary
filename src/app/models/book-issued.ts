export class BookIssued {
    userId: string;
    bookId: number;
    issueDate: string;

    constructor(userId, bookId, issueDate) {
        this.userId = userId;
        this.bookId = bookId;
        this.issueDate = issueDate;
    }
}
