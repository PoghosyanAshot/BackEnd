class Member {
    static id = 0;

    constructor(name = "") {
        this.name = name;
        this.id = ++Member.id;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        if (!book.isBorrowed) {
            book.borrow();
            this.borrowedBooks.push(book);
        }
    }

    returnBook(book) {
        const books = this.borrowedBooks;
        const size = books.length;

        for (let i = 0; i < size; ++i) {
            if (books[i].title == book.title) {
                [books[i], books[size - 1]] = [books[size - 1], books[i]];
                books.pop();
                book.returnBook();
                break;
            }
        }
    }
}

module.exports = Member;
