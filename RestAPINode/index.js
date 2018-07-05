var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
const port = 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.get('/books', (request, response) => {
    fs.readFile("books.json", (err, data) => {
        if (err) {
            response.write(err.message);
        }
        else {
            var books = JSON.parse(data);
            response.send(books);
        }
    })
});

app.post('/books', (request, response) => {
    fs.readFile("books.json", (err, data) => {
        if (err) {
            response.write(err.message);
        }
        else {
            var categoryID = request.body.categoryID;
            if (request.body.categoryID == -1) {
                categoryID = addNewCategory(request.body.category);
            }
            var books = JSON.parse(data);
            books.sort((a, b) => {
                return a.id - b.id;
            });
            var book = {
                id: getNextID(books),
                title: request.body.title,
                categoryID: categoryID,
                author: request.body.author,
                availability: request.body.availability
            };
            books.push(book);
            var finalData = JSON.stringify(books, null, "\t");
            fs.writeFile("books.json", finalData, (err) => {
                if (err) {
                    response.write(err.message);
                }
                else {
                    response.send({ message: "Done!" });
                }
            })
        }
    });
});

app.post('/user', (request, response) => {
    fs.readFile("users.json", (err, data) => {
        if (err) {
            response.write(err.message);
        }
        else {
            var users = JSON.parse(data);
            var bodyString = JSON.stringify(request.body);
            users.push(JSON.parse(bodyString));
            var finalData = JSON.stringify(users, null, "\t");

            fs.writeFile("users.json", finalData, (err) => {
                if (err) {
                    response.write(err.message);
                }
                else {
                    response.send({ message: "Done!" });
                }
            });
        }
    })
});

app.listen(port, () => {
    console.log("Server is running on " + port);
});

app.get('/bookCategories', (request, response) => {
    fs.readFile("bookCategories.json", (err, data) => {
        if (err) {
            response.write(err.message);
        }
        else {
            var books = JSON.parse(data);
            response.send(books);
        }
    })
});

app.get('/user', (request, response) => {
    fs.readFile("users.json", (err, data) => {
        if (err) {
            response.write(err.message);
        }
        else {
            var books = JSON.parse(data);
            response.send(books);
        }
    })
});

app.get('/bookIssued/:id?', (request, response) => {
    fs.readFile("booksIssued.json", (err, data) => {
        if (err) {
            response.write(err.message);
        }
        else {
            var responseBody = {
                booksIssued: '',
                books: '',
                users: ''
            };
            var booksIssued = JSON.parse(data);
            if (request.params.id) {
                booksIssued = booksIssued.filter(b => {
                    if (b.userId == request.params.id) {
                        return b;
                    }
                })
            }
            responseBody.booksIssued = booksIssued;
            fs.readFile("books.json", (err, booksData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    var books = JSON.parse(booksData);
                    responseBody.books = books;

                    fs.readFile("users.json", (err, userData) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            var users = JSON.parse(userData);
                            responseBody.users = users;
                        }

                        response.send(responseBody);
                    });
                }
            });

        }
    })
});

app.post('/bookIssued', (request, response) => {

    //update availability
    fs.readFile("books.json", (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            var books = JSON.parse(data);
            var bodyString = JSON.stringify(request.body);

            books.forEach(element => {
                if (element.id == request.body.bookId) {
                    element.availability--;
                }
            });

            fs.writeFile("books.json", JSON.stringify(books, null, "\t"), (err) => {
                if (err) {
                    console.log(err);
                    response.write(err.message);
                }
            });
        }
    })

    // add book issue
    fs.readFile("booksIssued.json", (err, data) => {
        if (err) {
            response.write(err.message);
        }
        else {
            var finalBookingBody = {
                userId: request.body.userId,
                bookId: request.body.bookId,
                issueDate: request.body.issueDate,
                returnDate: ''
            };
            var users = JSON.parse(data);

            fs.readFile("configs.json", (err, configData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    var configs = JSON.parse(configData);
                    var renewalConfig = configs.find(c => c.key == "renewalDays");
                    var returnDate = new Date(finalBookingBody.issueDate);
                    returnDate.setDate(returnDate.getDate() + renewalConfig.value);
                    finalBookingBody.returnDate = returnDate.toISOString();

                    users.push(finalBookingBody);

                    var finalData = JSON.stringify(users, null, "\t");

                    fs.writeFile("booksIssued.json", finalData, (err) => {
                        if (err) {
                            response.write(err.message);
                        }
                        else {
                            response.send({ message: "Done!" });
                        }
                    });
                }
            });
        }
    })
});

app.post('/bookReview', (request, response) => {
    fs.readFile("bookReviews.json", (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            var reviews = JSON.parse(data);
            request.body.id = getNextID(reviews);
            reviews.push(request.body);

            fs.writeFile("bookReviews.json", JSON.stringify(reviews, null, "\t"), (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    response.send({ message: "Done!" });
                }
            });
        }
    });
});

app.delete('/books/:id', (request, response) => {
    fs.readFile("books.json", (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            var books = JSON.parse(data);
            const bookIndex = books.indexOf(books.find(b => b.id == request.params.id));
            if (bookIndex != -1) {
                books.splice(bookIndex, 1);
            }

            fs.writeFile("books.json", JSON.stringify(books, null, "\t"), (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    response.send({ message: "Done!" });
                }
            });
        }
    });
});

app.post('/auth', (request, response) => {
    fs.readFile("credentials.json", (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var jObject = JSON.parse(data);
            if(request.body.username == jObject.username && request.body.password == jObject.password) {
                response.send({message: "Welcome"});
            }
            else{
                response.send({message: "Username/Password Invalid"});
            }
        }
    });
});

app.put('/books/:id', (request, response) => {
    fs.readFile("books.json", (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            var books = JSON.parse(data);
            var checkBook = books.indexOf(books.find(b => b.id == request.params.id));
            if (checkBook != -1) {
                books[checkBook] = request.body;

                fs.writeFile("books.json", JSON.stringify(books, null, "\t"), (err) =>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        response.send({message: "Done!"});
                    }
                });
            }
        }
    });
});

function getNextID(array) {
    if (array.length == 0) {
        return 1;
    }
    var lastItem = array[array.length - 1];
    return lastItem.id + 1;
}

function addNewCategory(categoryName) {
    fs.readFile("bookCategories.json", (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            var categories = JSON.parse(data);
            var category = {
                id: getNextID(categories),
                name: categoryName
            };
            categories.push(category);
            var finalData = JSON.stringify(categories, null, "\t");

            fs.writeFile("users.json", finalData, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    return category.id;
                }
            });
        }
    });
}
