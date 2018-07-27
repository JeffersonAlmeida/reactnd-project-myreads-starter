import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import Book from '../components/Book'

export default class SearchBooks extends Component {

 state = {
  query: "android",
  books: []
 }

 static propTypes = {
  onLibraryUpdate: PropTypes.func.isRequired
 }

 search = (query) => {
  BooksAPI.search(query)
   .then(response => {
    this.setState({ books: ((response.error || null) === null) ? response : [] })
   }).catch(this.showError)
 }

 showError = (error) => {
  window.alert("I'm sorry! Try it again.");
 }

 changeQuery = (event) => {
  this.setState({ query: event.target.value },
   () => { this.search(this.state.query) })
 }

 render() {
  const { books } = this.state
  return (
   <div className="search-books">
    <div className="search-books-bar">
     <Link to='/' className="close-search" >Close</Link>
     <div className="search-books-input-wrapper">
      <input
       type="text"
       placeholder="Search by title or author"
       onChange={this.changeQuery} />
     </div>
    </div>
    <div className="search-books-results">
     <ol className="books-grid">
      {
       books.map((book) =>
        <li key={book.id}>
         <Book book={book} onBookUpdate={
          (shelf) => { this.props.onLibraryUpdate(book, shelf) }
         } />
        </li>
       )}
     </ol>
    </div>
   </div>
  )
 }
}

