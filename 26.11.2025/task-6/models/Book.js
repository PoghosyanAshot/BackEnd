class Book {
    constructor(title = "", author = "", year = 0) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.isBorrowed = false;
    }

    borrow() {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
        }
    }

    returnBook() {
        if (this.isBorrowed) {
            this.isBorrowed = false;
        }
    }
}

module.exports = Book;
