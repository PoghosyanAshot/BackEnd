'use strict';

//Regex patterns

const REGEX = Object.freeze({
  NAME: /^[A-Za-zԱ-Ֆա-ֆ ]{2,40}$/,

  // james@mail.com
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // At least 6 chars, at least 1 letter and 1 number
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,

  // Book title (letters, numbers, spaces, punctuation)
  BOOK_TITLE: /^[A-Za-zԱ-Ֆա-ֆ0-9 .,'"-]{2,100}$/,

  // Author name
  AUTHOR: /^[A-Za-zԱ-Ֆա-ֆ .'-]{2,60}$/,

  // Year like 1999, 2026
  YEAR: /^(18|19|20)\d{2}$/,

  // UUID v4
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
});

// Validation functions
const validateName = (v) => REGEX.NAME.test(v);
const validateEmail = (v) => REGEX.EMAIL.test(v);
const validatePassword = (v) => REGEX.PASSWORD.test(v);
const validateBookTitle = (v) => REGEX.BOOK_TITLE.test(v);
const validateAuthor = (v) => REGEX.AUTHOR.test(v);
const validateYear = (v) => REGEX.YEAR.test(String(v));
const validateUUID = (v) => REGEX.UUID.test(v);

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateBookTitle,
  validateAuthor,
  validateYear,
  validateUUID
};