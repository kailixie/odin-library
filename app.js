
const container = document.querySelector('#container');
const libraryContents = document.querySelector('#libraryContents');
const formModal = document.querySelector('#formModal');
const addBookBtn = document.querySelector('#addBookBtn');
const closeModal = document.querySelector('#closeModal');
const clearFormBtn = document.querySelector('#clearBtn')
const submitFormBtn = document.querySelector('#submitBtn');

const form = document.querySelector('form');
const titleInput = document.querySelector('#bookTitle');
const authorInput = document.querySelector('#bookAuthor');
const pagesInput = document.querySelector('#bookPages');
const dateInput = document.querySelector('input[type="date"]');
const readInput = document.querySelector('input[type="checkbox"]');


let myLibrary = [];

class Book {
    constructor(title, author, pages, date, isRead) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.date = date,
        this.isRead = isRead
    }
}

function clearDisplay() {
    libraryContents.innerHTML = ''
}

function displayBooks() {
    clearDisplay()
    for (let i = 0; i < myLibrary.length; i++) {
        let bookId = i

        const card = document.createElement('div')
        const title = document.createElement('div')
        const author = document.createElement('div')
        const pages = document.createElement('div')

        const readContainer = document.createElement('div')
        const readLabel = document.createElement('label')
        readLabel.setAttribute('for', 'read')
        readLabel.innerText = 'Read?'
        readContainer.appendChild(readLabel)
        const read = document.createElement('input')
        read.setAttribute('type', 'checkbox')
        read.setAttribute('data-id', bookId)
        read.classList.add('readStatus')
        read.classList.add('readBtn')
        read.checked = myLibrary[bookId].isRead
        readContainer.appendChild(read)

        const bookBtns = document.createElement('div')
        const editBook = document.createElement('button')
        editBook.classList.add('editBook')
        editBook.setAttribute('data-id', bookId)
        const spanEdit = document.createElement('span')
        spanEdit.classList.add('material-symbols-outlined')
        spanEdit.innerHTML = 'edit'
        editBook.appendChild(spanEdit)
        bookBtns.appendChild(editBook)

        const deleteBook = document.createElement('button')
        deleteBook.classList.add('deleteBook')
        deleteBook.setAttribute('data-id', bookId)
        const spanDelete = document.createElement('span')
        spanDelete.classList.add('material-symbols-outlined')
        spanDelete.innerHTML = 'delete'
        deleteBook.appendChild(spanDelete)
        bookBtns.appendChild(deleteBook)

        card.appendChild(title).classList.add('bookTitle')
        card.appendChild(author).classList.add('bookAuthor')
        card.appendChild(pages).classList.add('pages')
        card.appendChild(readContainer).classList.add('readStatus')
        card.appendChild(bookBtns).classList.add('bookBtns')

        title.innerHTML = myLibrary[i].title
        author.innerHTML = myLibrary[i].author
        pages.innerHTML = myLibrary[i].pages

        // console.log(myLibrary[i].isRead)

        if (myLibrary[i].isRead === 'true') {
            read.classList.add('read')
            readContainer.classList.add('read')
        }
        else {
            read.classList.add('not-read')
            readContainer.classList.add('not-read')
        }

        card.classList.add('bookCard')
        libraryContents.appendChild(card)
    }
    addCardListeners()
}

function addBookToLibrary(e) {
    e.preventDefault();
    let book = new Book(`${titleInput.value}`,`${authorInput.value}`, `${pagesInput.value}`, `${dateInput.value}`, `${readInput.checked}`)
    myLibrary.push(book);
    console.log(myLibrary)
    formModal.classList.remove("active")
    clearForm();
    displayBooks();
}

function clearForm() {
    titleInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''
    dateInput.value = ''
    readInput.checked = false
}

function addCardListeners() {
    const deleteBtns = document.querySelectorAll('.deleteBook');
    const editBtns = document.querySelectorAll('.editBook');
    const readBtns = document.querySelectorAll('.readBtn');

    readBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (myLibrary[btn.getAttribute('data-id')].isRead == 'true') {
                myLibrary[btn.getAttribute('data-id')].isRead = 'false'
            } else {
                myLibrary[btn.getAttribute('data-id')].isRead = 'true'
            }
            console.log(myLibrary[btn.getAttribute('data-id')])
            displayBooks();
        })
    })

    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            myLibrary.splice(btn.getAttribute('data-id'), 1);
            displayBooks();
        })
    })

    editBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(btn.getAttribute('data-id'))
            editBook(btn.getAttribute('data-id'))
        })
    })

}

function editBook(id) {
    clearForm();
    formModal.classList.add("active");

    const selectedBook = id
    console.log(myLibrary[id])
    document.querySelector("#bookTitle").value = myLibrary[selectedBook].title;
    document.querySelector("#bookAuthor").value = myLibrary[selectedBook].author;
    document.querySelector("#bookPages").value = myLibrary[selectedBook].pages;
    document.querySelector("#bookDate").value = myLibrary[selectedBook].date;
    document.querySelector("#bookStatus").value = myLibrary[selectedBook].isRead;
    myLibrary.splice(selectedBook, 1);
}


addBookBtn.addEventListener('click', () => {
    formModal.classList.add("active");
})

closeModal.addEventListener('click', (e) => {
    formModal.classList.remove("active");
})

clearFormBtn.addEventListener('click', clearForm)

submitFormBtn.addEventListener('click', addBookToLibrary)