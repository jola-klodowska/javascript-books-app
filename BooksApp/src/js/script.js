function renderBooksList() {

  const tplBooksSource = document.querySelector('#template-book').innerHTML;
  const tplBooks = Handlebars.compile(tplBooksSource);
  const bookContainer = document.querySelector('.books-list');

  for (const book of dataSource.books) {
    const generatedHTML = tplBooks(book);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    bookContainer.appendChild(generatedDOM);
  }
}

const favoriteBooks = [];

function initActions() {
  const bookImages = document.querySelector('.books-list');

  bookImages.addEventListener('dblclick', function(event) {
    event.preventDefault();
    if(event.target && event.target.parentNode.classList.contains('.book__image')){
        console.log('yeaa');
    } else {
        console.log('dupa');
    }

  });
  
}

renderBooksList();
initActions();


function initActionsZapasowa() {
    const bookImages = document.querySelectorAll('.books-list .book__image');
  
    for(const bookImage of bookImages){
      bookImage.addEventListener('dblclick', function(event) {
        event.preventDefault();
        const bookId = bookImage.getAttribute('data-id');
        if (!favoriteBooks.includes(bookId)){
          bookImage.classList.add('favorite');
          favoriteBooks.push(bookId);
        } else if (favoriteBooks.includes(bookId)){
          bookImage.classList.remove('favorite');
          const indexOfBookId = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(indexOfBookId, 1);
        }
      });
    }
  }