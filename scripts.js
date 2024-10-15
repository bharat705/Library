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

function Book(title, author, numberOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.hasRead = hasRead;
}

function addBookToLibrary(title, author, numberOfPages, hasRead) {
  let newBook = new Book(title, author, numberOfPages, hasRead);
  library.push(newBook);
}

const dialog = document.querySelector("dialog");
const inputForm = document.querySelector("#input-form");
const addBookButton = document.querySelector("#add-book-button");
const submitButton = document.querySelector("#submit-button");
const cancelButton = document.querySelector("#cancel-button");

// "Show the dialog" button opens the dialog modally
addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

cancelButton.addEventListener("click", (event) => {
  dialog.close();
});

dialog.addEventListener("close", (e) => {
  console.log(dialog.returnValue);
  inputForm.reset();
});

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (inputForm.checkValidity()) {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const numberOfPages = document.getElementById("no-of-pages").value;
    const hasRead = document.getElementById("read-status").checked
      ? true
      : false;

    // Output the form values
    addBookToLibrary(title, author, numberOfPages, hasRead);
    displayCards();

    dialog.close();
    inputForm.reset();
  } else {
    inputForm.reportValidity();
  }
});

const cardsContainer = document.querySelector("#cards-container");

function displayCards() {
  cardsContainer.innerHTML = "";
  library.forEach((book) => {
    let cardsDiv = document.createElement("div");
    cardsDiv.className = "cards";
    cardsContainer.appendChild(cardsDiv);

    let titleDiv = document.createElement("div");
    titleDiv.className = "title";
    titleDiv.textContent = book.title;
    cardsDiv.appendChild(titleDiv);

    let authorDiv = document.createElement("div");
    authorDiv.className = "author";
    authorDiv.textContent = book.author;
    cardsDiv.appendChild(authorDiv);

    let pagesDiv = document.createElement("div");
    pagesDiv.className = "no-of-pages";
    pagesDiv.textContent = book.numberOfPages;
    cardsDiv.appendChild(pagesDiv);

    let hasReadDiv = document.createElement("div");
    hasReadDiv.className = "read-status";
    hasReadDiv.textContent = book.hasRead
      ? "Read Already"
      : "Yet to read";
    cardsDiv.appendChild(hasReadDiv);
  });
}