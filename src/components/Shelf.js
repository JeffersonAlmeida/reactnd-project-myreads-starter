import React from 'react'
import PropTypes from 'prop-types'
import Book from '../components/Book'
import * as BooksAPI from '../BooksAPI'

export default class Shelf extends React.Component {
 static propTypes = {  
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onShelfUpdate: PropTypes.func.isRequired
 }

 updateShelf(book, shelf) {
  BooksAPI
   .update(book, shelf)
   .then(response => response)
 }

 render() {
  const { title, books } = this.props
  return (
   <div>
    <div className="list-books-content">
     <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
       <ol className="books-grid">
        {books.map((book) =>
         <li key={book.id}>
          <Book book={book} onBookUpdate={
           (shelf) => {
            this.props.onShelfUpdate(book, shelf)
           }
          } />
         </li>
        )}
       </ol>
      </div>
     </div>
    </div>
   </div>
  )
 }
}
