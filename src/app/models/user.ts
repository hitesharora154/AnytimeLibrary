export class User {
    id: string;
    name: string;
    email: string;
    imageUrl: string;

    constructor(id, name, email, imageUrl) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
    }
}
