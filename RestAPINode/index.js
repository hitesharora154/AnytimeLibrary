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
                    response.send({message: "Done!"});
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

app.get('/bookIssued/:id', (request, response) => {
    fs.readFile("booksIssued.json", (err, data) => {
        if (err) {
            response.write(err.message);
        }
        else {
            var books = JSON.parse(data);
            books = books.filter(b => {
                if (b.bookId == request.params.id) {
                    return b;
                }
            })
            response.send(books);
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
            var users = JSON.parse(data);
            var bodyString = JSON.stringify(request.body);
            users.push(JSON.parse(bodyString));
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
    })
});

function getNextID(array) {
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
