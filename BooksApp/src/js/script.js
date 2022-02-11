class BookList {
  constructor() {
    const thisBook = this;
    
    thisBook.getElements();
    thisBook.renderBooksList();
    thisBook.initActions();
  }

  getElements() {
    const thisBook = this;

    thisBook.array = {};
    thisBook.array.favoriteBooks = [];
    thisBook.array.filters = [];

    thisBook.dom = {};
    thisBook.dom.filterForm = document.querySelector('.filters');
    thisBook.dom.bookContainer = document.querySelector('.books-list');
    thisBook.dom.tplBooksSource = document.querySelector('#template-book').innerHTML;
  }
  
  renderBooksList() {
    const thisBook = this;

    const tplBooks = Handlebars.compile(thisBook.dom.tplBooksSource);
  
    for (const book of dataSource.books) {
      book.width = book.rating * 10;
      thisBook.determineRatingBgc(book);
  
      const generatedHTML = tplBooks(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      thisBook.dom.bookContainer.appendChild(generatedDOM);
    }
  }

  determineRatingBgc(book) {
    if(book.rating < 6){
      book.background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (book.rating > 6 && book.rating <= 8){
      book.background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (book.rating > 8 && book.rating <= 9){
      book.background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (book.rating > 9){
      book.background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)'; 
    } 
  }

  initActions() {
    const thisBook = this;
  
    thisBook.dom.bookContainer.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const imageParent = event.target.parentNode;
      if(event.target && imageParent.classList.contains('book__image')){
        const bookId = imageParent.getAttribute('data-id');
        if (!thisBook.array.favoriteBooks.includes(bookId)){
          imageParent.classList.add('favorite');
          thisBook.array.favoriteBooks.push(bookId);
        } else if (thisBook.array.favoriteBooks.includes(bookId)){
          imageParent.classList.remove('favorite');
          const indexOfBookId = thisBook.array.favoriteBooks.indexOf(bookId);
          thisBook.array.favoriteBooks.splice(indexOfBookId, 1); 
        }
      }
    });
  
    thisBook.dom.filterForm.addEventListener('click', function(event) {
      if(event.target && event.target.tagName == 'INPUT' && event.target.type  == 'checkbox' && event.target.name == 'filter') {
        if(event.target.checked){
          thisBook.array.filters.push(event.target.value);
        } else if (!event.target.checked) {
          const indexOfValue = thisBook.array.filters.indexOf(event.target.value);
          thisBook.array.filters.splice(indexOfValue, 1);
        }
      }
      thisBook.filterBooks();
    });
  }

  filterBooks() {
    const thisBook = this;
    for (const book of dataSource.books){
      let shouldBeHidden = false;
      for (const filter of thisBook.array.filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      const image = document.querySelector('.book__image[data-id="' + book.id + '"]');
      if (shouldBeHidden == true){
        image.classList.add('hidden');
      } else if (shouldBeHidden == false) {
        image.classList.remove('hidden');
      }
    }
  }
}

const app = new BookList();










