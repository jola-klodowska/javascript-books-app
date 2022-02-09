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
    const imageParent = event.target.parentNode;
    if(event.target && imageParent.classList.contains('book__image')){
      const bookId = imageParent.getAttribute('data-id');
      if (!favoriteBooks.includes(bookId)){
        imageParent.classList.add('favorite');
        favoriteBooks.push(bookId);
      } else if (favoriteBooks.includes(bookId)){
        imageParent.classList.remove('favorite');
        const indexOfBookId = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(indexOfBookId, 1); 
      }
    }

  });
}

renderBooksList();
initActions();