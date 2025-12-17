const Book = require("./models/Book");
const Member = require("./models/Member");
const Library = require("./services/libraryService");

const library = new Library();

const cleanCode = new Book("Clean Code", "Robert C. Martin", 2008);
const youDontKnowJS = new Book("You Don't Know JS", "Kyle Simpson", 2015);
const pragProg = new Book("The Pragmatic Programmer", "Andrew Hunt", 1999);

library.addBook(cleanCode);
library.addBook(youDontKnowJS);
library.addBook(pragProg);

const james = new Member("James");
const bob = new Member("Bob");

library.addMember(james);
library.addMember(bob);

library.borrow("Clean Code", james.id);
library.borrow("Clean Code", bob.id);

library.returnBook("Clean Code", james.id);
library.borrow("Clean Code", bob.id);
