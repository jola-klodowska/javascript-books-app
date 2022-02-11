function renderBooksList() {

  const tplBooksSource = document.querySelector('#template-book').innerHTML;
  const tplBooks = Handlebars.compile(tplBooksSource);
  const bookContainer = document.querySelector('.books-list');

  for (const book of dataSource.books) {
    book.width = book.rating * 10;
    if(book.rating < 6){
      book.background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (book.rating > 6 && book.rating <= 8){
      book.background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (book.rating > 8 && book.rating <= 9){
      book.background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (book.rating > 9){
      book.background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)'; 
    } 

    const generatedHTML = tplBooks(book);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    bookContainer.appendChild(generatedDOM);
  }
}

const favoriteBooks = [];
const filters = [];
const filterForm = document.querySelector('.filters');

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

  filterForm.addEventListener('click', function(event) {
    if(event.target && event.target.tagName == 'INPUT' && event.target.type  == 'checkbox' && event.target.name == 'filter') {
      if(event.target.checked){
        filters.push(event.target.value);
        console.log(filters);
      } else if (!event.target.checked) {
        const indexOfValue = filters.indexOf(event.target.value);
        filters.splice(indexOfValue, 1);
        console.log(filters);
      }
    }
    filterBooks();
  });
}

function filterBooks() {
  for (const book of dataSource.books){
    let shouldBeHidden = false;
    for (const filter of filters){
      if(!book.details[filter]){
        shouldBeHidden = true;
        break;
      }
    }
    const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
    if (shouldBeHidden == true){
      bookImage.classList.add('hidden');
    } else if (shouldBeHidden == false) {
      bookImage.classList.remove('hidden');
    }
  }
}

renderBooksList();
initActions();






