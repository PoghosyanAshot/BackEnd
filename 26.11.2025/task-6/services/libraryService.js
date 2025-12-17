class Library {
    #books = [];
    #members = [];

    addBook(book) {
        const books = this.#books;

        for (const b of books) {
            if (b.title === book.title) {
                return false;
            }
        }

        books.push(book);
        return true;
    }

    addMember(member) {
        const members = this.#members;

        for (const m of members) {
            if (m.id === member.id) {
                return false;
            }
        }

        members.push(member);
        return true;
    }

    findBook(title) {
        const books = this.#books;

        for (const book of books) {
            if (book.title === title) {
                return book;
            }
        }

        return null;
    }

    findMember(id) {
        const members = this.#members;

        for (const member of members) {
            if (member.id === id) {
                return member;
            }
        }

        return null;
    }

    borrow(title, memberId) {
        const member = this.findMember(memberId);
        const book = this.findBook(title);

        if (member && book) {
            member.borrowBook(book);
            return true;
        }

        return false;
    }

    returnBook(title, memberId) {
        const member = this.findMember(memberId);
        const book = this.findBook(title);

        if (member && book) {
            member.returnBook(book);
            return true;
        }

        return false;
    }
}

module.exports = Library;
