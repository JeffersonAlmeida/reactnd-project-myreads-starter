import React from 'react'
import PropTypes from 'prop-types'

export default class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: "" }
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  }

  handleChange = (event) => {
    const shelfValue = event.target.value
    this.setState({ value: shelfValue })
    this.props.onBookUpdate(shelfValue)
  }

  render() {
    const { book } = this.props
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks.thumbnail}")`
            }}>
          </div>
          <div className="book-shelf-changer">
            <select
              value={((book.shelf || null) === null) ? "none" : book.shelf}
              onChange={this.handleChange} >
              <option value="move" disabled="true">Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.join(' - ')}</div>
      </div>
    )
  }
}