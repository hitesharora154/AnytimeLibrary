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
            response.send(err.message);
        }
        else {
            var books = JSON.parse(data);
            response.status(200).json(books);
        }
    })
});

app.post('/books', (request, response) => {
    fs.readFile("books.json", (err, data) => {
        if (err) {
            response.send(err.message);
        }
        else {
            var books = JSON.parse(data);
            var bodyString = JSON.stringify(request.body);
            books.push(JSON.parse(bodyString));
            var finalData = JSON.stringify(books, null, "\t");

            fs.writeFile("books.json", finalData, (err) => {
                if (err) {
                    response.send(err.message);
                }
                else {
                    response.status(200).json({message:"Done!"});
                }
            })
        }
    });
});

app.post('/user', (request, response) => {
    fs.readFile("users.json", (err, data) => {
        if (err) {
            response.send(err.message);
        }
        else {
            var users = JSON.parse(data);
            var bodyString = JSON.stringify(request.body);
            users.push(JSON.parse(bodyString));
            var finalData = JSON.stringify(users, null, "\t");

            fs.writeFile("users.json", finalData, (err) => {
                if (err) {
                    response.send(err.message);
                }
                else {
                    response.status(200).json({message:"Done!"});
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
            response.send(err.message);
        }
        else {
            var books = JSON.parse(data);
            response.status(200).json(books);
        }
    })
});

app.get('/user', (request, response) => {
    fs.readFile("users.json", (err, data) => {
        if (err) {
            response.send(err.message);
        }
        else {
            var books = JSON.parse(data);
            response.status(200).json(books);
        }
    })
});

app.get('/bookIssued/:id', (request, response) => {
    fs.readFile("booksIssued.json", (err, data) => {
        if(err) {
            response.send(err.message);
        }
        else {
            var books = JSON.parse(data);
            books = books.filter(b => {
                if(b.bookId == request.params.id) {
                    return b;
                }
            })
            response.status(200).json(books);
        }
    })
});

app.post('/bookIssued', (request, response) => {

    //update availability
    fs.readFile("books.json", (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            var books = JSON.parse(data);
            var bodyString = JSON.stringify(request.body);

            books.forEach(element => {
                if(element.id == request.body.bookId) {
                    element.availability--;
                }
            });
            
            fs.writeFile("books.json", JSON.stringify(books, null, "\t"), (err) => {
                if(err) {
                    console.log(err);
                    response.send(err.message);
                }
                else{
                    response.status(200).json({message: "Done!"});
                }
            });
        }
    })

    // add book issue
    fs.readFile("booksIssued.json", (err, data) => {
        if (err) {
            response.send(err.message);
        }
        else {
            var users = JSON.parse(data);
            var bodyString = JSON.stringify(request.body);
            users.push(JSON.parse(bodyString));
            var finalData = JSON.stringify(users, null, "\t");

            fs.writeFile("booksIssued.json", finalData, (err) => {
                if (err) {
                    response.send(err.message);
                }
                else {
                    response.status(200).json({message:"Done!"});
                }
            });
        }
    })
});