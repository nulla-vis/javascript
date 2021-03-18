//Book Class : Represets a Book
class Book {
    constructor(title,author,isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

//UI Class : Handle UI Task
class UI {
    static displayBooks() { //static mean no need to instantiate object
        const books = Storage.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href"#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }

    static showAlert(message,className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        //vanish in 1.5 seconds
        setTimeout(()=> document.querySelector('.alert').remove() , 1500);
    }
}

//Store Class : Handles Storage
class Storage { //local storage basically key-value pairs
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            // books = localStorage.getItem('books'); //this will be stored as string
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Storage.getBooks();

        books.push(book);
        
        //re-set the book in local storage
        // localStorage.setItem('books',books); //beacuse local storage is a string and books is array of objects
        localStorage.setItem('books',JSON.stringify(books)); //key-value pair
    }

    static removeBook(isbn) {
        const books = Storage.getBooks();

        books.forEach((book,index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        //reset local sorage after the book removed
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//Event : Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : Add a Book
document.querySelector('#book-form').addEventListener('submit', (e)=>{
    // Prevent actual submit
    e.preventDefault();

    // get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    
    // Validate
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields','danger')
    } else {
    
    // Instantiate Book
    const book = new Book(title,author,isbn);

    // Add book to UI
    UI.addBookToList(book);

    //Add book to Store
    Storage.addBook(book);

    //Show Success Message;
    UI.showAlert('Book Added', 'success');

    //Creal fields
    UI.clearFields();

    }
});

// Event : Remove a Book
document.querySelector('#book-list').addEventListener('click',(e)=> {
    //Remove book from UI
    // console.log(e.target.parentElement.previousElementSibling.textContent)
    UI.deleteBook(e.target);

    //Remove book from strore
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Book remove message
    UI.showAlert('Book Removed', 'danger');
})