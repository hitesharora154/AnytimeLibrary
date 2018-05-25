export class Book {
    id: number;
    title: string;
    categoryID: number;
    category: string;
    author: string;
    availability: number;

    constructor(id, title, categoryID, author, availability) {
        this.id = id;
        this.title = title;
        this.categoryID = categoryID;
        this.author = author;
        this.availability = availability;
    }
}
