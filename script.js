const btn = document.getElementsByClassName("newButton");
const body = document.getElementsByTagName('body');
const booksContainer = document.getElementById("booksContainer");

let myLibrary = [];
displayBook();

//book constructor
function book(name,author,pages,completed){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.completed = completed;
}

//adding new books to library
function addBookToLibrary(name,author,pages,completed){
    newBook = new book(name,author,pages,completed);
    myLibrary.push(newBook);
    displayBook();
}

//loading books
function displayBook(){
    booksContainer.innerHTML = "";
    myLibrary.forEach(book => {
        if(book.completed){
            booksContainer.innerHTML += `
                            <div class="book">
                                <h2>${book.name}</h2>
                                <h3>By ${book.author}</h3>
                                <h3>${book.pages} pages</h3>
                                <h3 id="b${book.name}" class="completed">Completed</h3>
                                <div id="btn${book.name}">
                                    <span class="material-symbols-outlined bookdel">close</span>
                                </div>
                            </div>`;
        }
        else{
            booksContainer.innerHTML += `
                            <div class="book">
                                <h2>${book.name}</h2>
                                <h3>By ${book.author}</h3>
                                <h3>${book.pages}</h3>
                                <h3 id="b${book.name}" class="nCompleted">Not Complete</h3>
                                <div id="btn${book.name}">
                                    <span class="material-symbols-outlined bookdel">close</span>
                                </div>
                            </div>`;
        }
    });

    myLibrary.forEach(book => {
        let nB = document.getElementById(`b${book.name}`);
        let btn = document.getElementById(`btn${book.name}`);
        nB.addEventListener("click",function(e){
            if(book.completed == true){
                e.target.innerHTML = "Not Complete";
                e.target.className = "nCompleted";
                book.completed = false;
            }
            else{
                e.target.innerHTML = "Completed";
                e.target.className = "completed"
                book.completed = true;
            }
        });
        btn.addEventListener("click",function(e){
            myLibrary.splice(myLibrary.indexOf(book),1);
            delete book;
            displayBook()
        })
    });
}


function popwindow(){
    var container = document.createElement("div");
    container.className = "transparent"
    container.innerHTML =`
                    <div class="menu">
                        <div class="close">
                            <span class="material-symbols-outlined">close</span>
                        </div>
                        <form id="bookForm">
                            <div class="input">
                                <input type="text" id="bName" name="bName" placeholder="Book Name" required></input>
                            </div>
                            <div class="input">
                                <input type="text" id="aName" name="aName" placeholder="Author Name" required></input>
                            </div>
                            <div class="input">
                                <input type="number" id="page" name="page" placeholder="Pages" required></input>
                            </div>
                            <div class="input">
                                <div class="checkboxLabel">
                                    <label>Completed</label>
                                </div>
                                <div class="checkbox">
                                    <input type="checkbox" id="completed" name="completed" value="1"></input>
                                </div>
                            </div>
                            <button class="addBtn" type="submit">Add</button>
                        </form>
                    </div>
                    `;
    
    body[0].appendChild(container);
    btn[0].disabled = true;
    
    document.getElementsByClassName("close")[0].addEventListener("click",function(e){
        body[0].removeChild(container);
        btn[0].disabled = false;
    });

    document.getElementById("bookForm").addEventListener('submit',function(e){
        e.preventDefault();
        let bName = document.getElementById("bName").value;
        let aName = document.getElementById("aName").value;
        let page = document.getElementById("page").value;
        let completed = document.getElementById("completed").checked;
        body[0].removeChild(container);
        btn[0].disabled = false;
        addBookToLibrary(bName,aName,page,completed)
    });

}