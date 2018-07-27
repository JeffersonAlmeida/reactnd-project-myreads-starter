import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from '../components/Shelf'

export default class Library extends Component {

  shelfs = [
    { key: "currentlyReading", title: "Currently Reading" },
    { key: "wantToRead", title: "Want to Read" },
    { key: "read", title: "Read" }
  ]

  static propTypes = {
    books: PropTypes.array.isRequired,
    onLibraryUpdate: PropTypes.func.isRequired
  }

  render() {
    const { books } = this.props
    return (
      <div className="list-books">
        <div className="list-books">
          <div className="list-books-title">
            <h1>My Personal Library</h1>
          </div>
          {
            this.shelfs.map((shelf, index) => (
              <Shelf
                key={shelf.key}
                title={shelf.title}
                books={books.filter(b => b.shelf === shelf.key)}
                onShelfUpdate={(book, shelf) => {
                  this.props.onLibraryUpdate(book, shelf)
                }} />
            ))
          }
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}