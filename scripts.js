const library = [];

class Book {
  constructor(title, author, numberOfPages, hasRead) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.hasRead = hasRead;
  }
  // Adding a method to the Book prototype
  toggleReadStatus() {
    this.hasRead = !this.hasRead;
  }
}

function isDuplicateBook(title, author) {
  return library.some(
    (book) =>
      book.title.toLowerCase() === title.toLowerCase() &&
      book.author.toLowerCase() === author.toLowerCase()
  );
}

function addBookToLibrary(title, author, numberOfPages, hasRead) {
  const newBook = new Book(title, author, numberOfPages, hasRead);
  library.push(newBook);
  displayCards();
  updateStats();
}

const dialog = document.querySelector("#dialog");
const inputForm = document.querySelector("#input-form");
const addBookButton = document.querySelector("#add-book-button");
const submitButton = document.querySelector("#submit-button");
const cancelButton = document.querySelector("#cancel-button");
const errorMessage = document.querySelector("#error-message");

// "Show the dialog" button opens the dialog modally
addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

cancelButton.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("close", () => {
  errorMessage.textContent = "";
  inputForm.reset();
});

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (inputForm.checkValidity()) {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const numberOfPages = document.getElementById("no-of-pages").value;
    const hasRead = document.getElementById("read-status").checked;

    if (isDuplicateBook(title, author)) {
      errorMessage.textContent = "This book is already in your library!";
      return;
    }
    // Output the form values
    addBookToLibrary(title, author, numberOfPages, hasRead);
    dialog.close();
    inputForm.reset();
  } else {
    inputForm.reportValidity();
  }
});

const cardsContainer = document.querySelector("#cards-container");

function displayCards() {
  cardsContainer.innerHTML = "";

  library.forEach((book, index) => {
    let cardsDiv = document.createElement("div");
    cardsDiv.className = "cards";

    let titleDiv = document.createElement("div");
    titleDiv.className = "title";
    titleDiv.textContent = book.title;
    cardsDiv.appendChild(titleDiv);

    let authorAndPagesDiv = document.createElement("div");
    authorAndPagesDiv.className = "author-and-pages";

    let authorDiv = document.createElement("div");
    authorDiv.className = "author";
    authorDiv.textContent = book.author;
    authorAndPagesDiv.appendChild(authorDiv);

    let pagesDiv = document.createElement("div");
    pagesDiv.className = "no-of-pages";
    pagesDiv.textContent = `${book.numberOfPages} pages`;
    authorAndPagesDiv.appendChild(pagesDiv);

    cardsDiv.appendChild(authorAndPagesDiv);

    let hasReadAndRemoveDiv = document.createElement("div");
    hasReadAndRemoveDiv.className = "read-status-remove-button-container";

    let hasReadDiv = document.createElement("div");
    hasReadDiv.className = "read-status";

    let readToggleButton = document.createElement("button");
    readToggleButton.className = book.hasRead
      ? "read-state-toggle-button"
      : "unread-state-toggle-button";
    readToggleButton.textContent = book.hasRead
      ? "Read Already"
      : "Yet to Read";
    readToggleButton.addEventListener("click", () => {
      toggleHasRead(index);
    });
    
    hasReadDiv.appendChild(readToggleButton);
    hasReadAndRemoveDiv.appendChild(hasReadDiv);

    let removeDiv = document.createElement("div");
    let removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      removeBook(index);
    });
    removeDiv.appendChild(removeButton);
    hasReadAndRemoveDiv.appendChild(removeDiv);

    cardsDiv.appendChild(hasReadAndRemoveDiv);
    cardsContainer.appendChild(cardsDiv);
  });
}

function removeBook(index) {
  library.splice(index, 1);
  displayCards();
  updateStats();
}

function toggleHasRead(index) {
  library[index].toggleReadStatus();
  displayCards();
  updateStats();
}

const booksReadElem = document.querySelector("#books-read");
const booksUnreadElem = document.querySelector("#books-unread");
const totalBooksElem = document.querySelector("#total-books");
const deleteAllButton = document.querySelector("#delete-all-button");

function updateStats() {
  const totalBooks = library.length;
  const booksRead = library.filter((book) => book.hasRead).length;
  const booksUnread = totalBooks - booksRead;

  totalBooksElem.textContent = `Total Books: ${totalBooks}`;
  booksReadElem.textContent = `Books Read: ${booksRead}`;
  booksUnreadElem.textContent = `Books Yet to Read: ${booksUnread}`;
}

deleteAllButton.addEventListener("click", () => {
  library.length = 0;
  displayCards();
  updateStats();
});

displayCards();
updateStats();
