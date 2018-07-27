import React from 'react'
import { Route } from 'react-router-dom'

import SearchBooks from './components/SearchBooks'
import Library from './components/Library'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateShelf = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(this.fetchAll)
      .catch(this.showError)
  }

  showError = (error) => {
    window.alert("I'm sorry! Try it again.");
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Library books={this.state.books} onLibraryUpdate={(book, shelf) => {
            this.updateShelf(book, shelf)
          }
          } />
        )} />
        <Route exact path='/search' render={() => (
          <SearchBooks onLibraryUpdate={(book, shelf) => {
            this.updateShelf(book, shelf)
          }} />
        )} />
      </div>
    )
  }
}

export default BooksApp
