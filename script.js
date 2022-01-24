let myLibrary = [new Book("The Lord of Ring","Tolkien",500,"Not Read"),
                 new Book("Nineteen Eighty-Four","George Orwell",328,"Read"),
                 new Book("Animal Farm","George Orwell",112,"Read")];
let table = document.querySelector("#table-body");
let bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit",formSubmit);

function Book(title, author, pages, read){
    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){

    let newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
}

function displayBooks(){
    

    table.innerHTML = "";

    myLibrary.forEach((book) => {
        
        let row = document.createElement("tr");

        let cell = document.createElement("td");
        cell.appendChild(document.createTextNode(book.title));
        row.appendChild(cell);
        cell = document.createElement("td");
        cell.appendChild(document.createTextNode(book.author));
        row.appendChild(cell);
        cell = document.createElement("td");
        cell.appendChild(document.createTextNode(book.pages));
        row.appendChild(cell);
        

        cell = document.createElement("td");
        let statusButton = document.createElement("button");
        statusButton.dataset.index = myLibrary.indexOf(book);
        statusButton.className = "statusbutton";
        statusButton.innerText = book.read;
        statusButton.addEventListener("click",toggleStatus);
        cell.appendChild(statusButton);
        row.appendChild(cell);

        cell = document.createElement("td");
        let delButton = document.createElement("button");
        delButton.dataset.index = myLibrary.indexOf(book);
        delButton.className = "delbutton";
        delButton.innerText = "Delete";
        delButton.addEventListener("click",deleteBook);
        cell.appendChild(delButton);
        row.appendChild(cell);

        
        table.appendChild(row);
    });

}

function addBook(){

    document.getElementById("input-popup").style.display = "block";
}

function closeForm(){

    document.getElementById("input-popup").style.display = "none";
    document.getElementById("book-form").reset();
}

function formSubmit(event){

    event.preventDefault();
    let title = bookForm.elements["title"];
    let author = bookForm.elements["author"];
    let pages = bookForm.elements["pages"];
    let status = bookForm.elements["status"];

    addBookToLibrary(title.value, author.value, pages.value, status.value); // TODO - READ 
    displayBooks();
    bookForm.reset();

}

function deleteBook(event){

    myLibrary.splice(event.target.dataset.index,1);
    displayBooks();
}

function toggleStatus(event){
    
    const cStatus = myLibrary[event.target.dataset.index].read;

    if(cStatus === "Read"){
        myLibrary[event.target.dataset.index].read = "Not Read";
    } else {
        myLibrary[event.target.dataset.index].read = "Read";
    }

    displayBooks();
}

displayBooks();