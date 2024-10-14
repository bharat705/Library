const library = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    numberOfPages: 295,
    hasRead: true,
  },
  {
    title: "1984",
    author: "George Orwell",
    numberOfPages: 328,
    hasRead: false,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    numberOfPages: 281,
    hasRead: true,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    numberOfPages: 180,
    hasRead: false,
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    numberOfPages: 635,
    hasRead: false,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    numberOfPages: 432,
    hasRead: true,
  },
];

function Book(
  title = "xyz",
  author = "abc",
  numberOfPages = "32",
  hasRead = true
) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.hasRead = hasRead;
}

function addBookToLibrary() {
  let newBook = new Book();
  library.push(newBook);
}

addBookToLibrary();
console.log(library);

const dialog = document.querySelector("dialog");
const submitButton = document.querySelector("#submit-button");
const addBookButton = document.querySelector("#add-book-button");

// "Show the dialog" button opens the dialog modally
addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Show the dialog" button opens the dialog modally
submitButton.addEventListener("click", () => {
  dialog.close();
});
